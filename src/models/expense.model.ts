import { IMember } from '@/types/member';
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpense extends Document {
  type: string;
  groupId: mongoose.Types.ObjectId;
  title: string;
  totalAmount: number;
  paidBy: mongoose.Types.ObjectId;
  paidmemberAvatar?: string;
  paidmemberUsername: string;

  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    type: { type: String, default: 'expense' },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    title: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paidmemberAvatar: { type: String },
    paidmemberUsername: { type: String },
  },

  { timestamps: true }
);

export const Expense: Model<IExpense> =
  mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
