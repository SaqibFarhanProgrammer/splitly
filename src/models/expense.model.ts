import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpenseSplit {
  userId: mongoose.Types.ObjectId | string;
  amount: number;
  percentage?: number;
}

export interface IExpense {
  _id: string;
  type: string;
  groupId: mongoose.Types.ObjectId | string;
  title: string;
  totalAmount: number;
  paidBy: mongoose.Types.ObjectId | string;
  paidmemberUsername?: string;
  paidmemberAvatar?: string;
  category: string;
  splitType: 'EQUAL' | 'EXACT' | 'PERCENTAGE';
  splits: IExpenseSplit[];
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExpenseDocument extends Omit<IExpense, '_id'>, Document {}

const ExpenseSplitSchema = new Schema<IExpenseSplit>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    percentage: { type: Number },
  },
  { _id: false }
);

const ExpenseSchema = new Schema<IExpenseDocument>(
  {
    type: { type: String, default: 'expense' },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    totalAmount: { type: Number, required: true, min: 0.01 },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    paidmemberUsername: { type: String },
    paidmemberAvatar: { type: String },
    category: {
      type: String,
      default: 'General',
      enum: [
        'Food',
        'Transport',
        'Accommodation',
        'Utilities',
        'Shopping',
        'Entertainment',
        'General',
      ],
    },
    splitType: {
      type: String,
      default: 'EQUAL',
      enum: ['EQUAL', 'EXACT', 'PERCENTAGE'],
    },
    splits: [ExpenseSplitSchema],
    date: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

ExpenseSchema.index({ groupId: 1, date: -1 });

export const Expense: Model<IExpenseDocument> =
  mongoose.models.Expense ||
  mongoose.model<IExpenseDocument>('Expense', ExpenseSchema);
