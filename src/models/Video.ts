import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  isCompanySpecific: boolean;
  companies: mongoose.Types.ObjectId[];
  isRetirementRelated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Video category is required'],
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    isCompanySpecific: {
      type: Boolean,
      default: false,
    },
    companies: [{
      type: Schema.Types.ObjectId,
      ref: 'Company',
    }],
    isRetirementRelated: {
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

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema); 