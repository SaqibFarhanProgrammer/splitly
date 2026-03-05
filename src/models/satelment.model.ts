import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettlement extends Document {
  groupId: mongoose.Types.ObjectId;
  paidBy: mongoose.Types.ObjectId;
  paidTo: mongoose.Types.ObjectId;
  amount: number;
  paidByUserAvatar: string;
  paidByUserName: string;
  paidToUserName: string;
  note: string;
  createdAt: Date;
}

const SettlementSchema = new Schema<ISettlement>({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  paidBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paidTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paidByUserAvatar: { type: String },
  paidByUserName: { type: String },
  paidToUserName: { type: String },
  amount: { type: Number, required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Settlement: Model<ISettlement> =
  mongoose.models.Settlement ||
  mongoose.model<ISettlement>("Settlement", SettlementSchema);
