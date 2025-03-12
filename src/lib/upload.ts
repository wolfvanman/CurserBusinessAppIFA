import AWS from 'aws-sdk';
import { NextApiRequest } from 'next';
import multer from 'multer';
import { promisify } from 'util';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Promisify multer middleware
export const uploadMiddleware = promisify(upload.single('file'));

// Upload file to S3
export const uploadToS3 = async (file: Express.Multer.File, folder: string = 'uploads') => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || 'financial-advisor-portal',
    Key: `${folder}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();
  return result.Location;
};

// Delete file from S3
export const deleteFromS3 = async (fileUrl: string) => {
  const key = fileUrl.split('/').slice(3).join('/');
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || 'financial-advisor-portal',
    Key: key,
  };

  return s3.deleteObject(params).promise();
};

// Upload company logo
export const uploadCompanyLogo = async (file: Express.Multer.File) => {
  return uploadToS3(file, 'company-logos');
};

// Upload video thumbnail
export const uploadVideoThumbnail = async (file: Express.Multer.File) => {
  return uploadToS3(file, 'video-thumbnails');
};

// Upload blog featured image
export const uploadBlogImage = async (file: Express.Multer.File) => {
  return uploadToS3(file, 'blog-images');
}; 