import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettlement extends Document {
  groupId: mongoose.Types.ObjectId;
  paidBy: mongoose.Types.ObjectId;
  paidTo: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const SettlementSchema = new Schema<ISettlement>({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  paidBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paidTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Settlement: Model<ISettlement> =
  mongoose.models.Settlement ||
  mongoose.model<ISettlement>("Settlement", SettlementSchema);
