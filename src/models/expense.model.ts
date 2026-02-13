import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpense extends Document {
  groupId: mongoose.Types.ObjectId;
  title: string;
  totalAmount: number;
  paidBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    title: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Expense: Model<IExpense> =
  mongoose.models.Expense ||
  mongoose.model<IExpense>("Expense", ExpenseSchema);
