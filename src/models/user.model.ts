import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  avatarUploadedAt?: Date;
  cloudineryimagePublicid?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    avatarUploadedAt: { type: Date },
    cloudineryimagePublicid: { type: String },
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
