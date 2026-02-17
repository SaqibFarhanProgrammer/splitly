import mongoose, { Schema, Document, Model } from "mongoose";
import { boolean } from "zod";

export interface IGroup extends Document {
  name: string;
  totalAmount: number;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Group: Model<IGroup> =
  mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema);
