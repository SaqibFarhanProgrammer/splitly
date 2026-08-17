import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettlement {
  _id: string;
  type: string;
  groupId: mongoose.Types.ObjectId | string;
  paidBy: mongoose.Types.ObjectId | string;
  paidTo: mongoose.Types.ObjectId | string;
  amount: number;
  paidByUserName?: string;
  paidByUserAvatar?: string;
  paidToUserName?: string;
  note?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISettlementDocument
  extends Omit<ISettlement, '_id'>, Document {}

const SettlementSchema = new Schema<ISettlementDocument>(
  {
    type: { type: String, default: 'settlement' },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
      index: true,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    paidTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    amount: { type: Number, required: true, min: 0.01 },
    paidByUserName: { type: String },
    paidByUserAvatar: { type: String },
    paidToUserName: { type: String },
    note: { type: String, default: 'Settlement payment' },
    date: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

SettlementSchema.index({ groupId: 1, date: -1 });

export const Settlement: Model<ISettlementDocument> =
  mongoose.models.Settlement ||
  mongoose.model<ISettlementDocument>('Settlement', SettlementSchema);
