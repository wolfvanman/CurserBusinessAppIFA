import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  featuredImage: string;
  tags: string[];
  publishedAt: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    excerpt: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      default: 'Phil Handley',
      trim: true,
    },
    featuredImage: {
      type: String,
      default: '',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    publishedAt: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Generate excerpt from content if not provided
BlogSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    const contentStr = this.content as string;
    this.excerpt = contentStr.substring(0, 150) + '...';
  }
  
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema); 