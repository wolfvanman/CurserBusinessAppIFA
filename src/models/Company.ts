import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  description: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      postalCode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
        default: 'United Kingdom',
      },
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

export default mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema); 