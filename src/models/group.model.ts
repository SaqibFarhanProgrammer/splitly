import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IGroupMemberEmbedded {
  userId: mongoose.Types.ObjectId | string;
  isAdmin?: boolean;
  username?: string;
  avatar?: string;
}

export interface IGroup {
  _id: string;
  name: string;
  isActive: boolean;
  members: IGroupMemberEmbedded[];
  createdBy: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGroupDocument extends Omit<IGroup, '_id'>, Document {}

const GroupSchema = new Schema<IGroupDocument>(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isAdmin: { type: Boolean, default: false },
        username: { type: String },
        avatar: { type: String, default: '' },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

GroupSchema.index({ 'members.userId': 1 });

export const Group: Model<IGroupDocument> =
  mongoose.models.Group || mongoose.model<IGroupDocument>('Group', GroupSchema);
