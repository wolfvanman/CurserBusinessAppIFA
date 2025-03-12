import mongoose, { Schema, Document } from 'mongoose';

export interface IEmail extends Document {
  subject: string;
  content: string;
  sender: string;
  recipients: {
    type: 'individual' | 'company' | 'all';
    users?: mongoose.Types.ObjectId[];
    companies?: mongoose.Types.ObjectId[];
  };
  scheduledFor: Date;
  isSent: boolean;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IRecipients {
  type: 'individual' | 'company' | 'all';
  users?: mongoose.Types.ObjectId[];
  companies?: mongoose.Types.ObjectId[];
}

const EmailSchema: Schema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Email subject is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Email content is required'],
    },
    sender: {
      type: String,
      default: 'Phil Handley <phil@arthurbrowns.co.uk>',
      trim: true,
    },
    recipients: {
      type: {
        type: String,
        enum: ['individual', 'company', 'all'],
        required: [true, 'Recipient type is required'],
      },
      users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
      companies: [{
        type: Schema.Types.ObjectId,
        ref: 'Company',
      }],
    },
    scheduledFor: {
      type: Date,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    sentAt: {
      type: Date,
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

// Validate recipients based on type
EmailSchema.pre('save', function(next) {
  const recipients = this.recipients as unknown as IRecipients;
  const { type, users, companies } = recipients;
  
  if (type === 'individual' && (!users || users.length === 0)) {
    return next(new Error('Users are required for individual email type'));
  }
  
  if (type === 'company' && (!companies || companies.length === 0)) {
    return next(new Error('Companies are required for company email type'));
  }
  
  next();
});

export default mongoose.models.Email || mongoose.model<IEmail>('Email', EmailSchema); 