import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGroup extends Document {
  name: string;
  totalAmount: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Group : Model<IGroup> =
  mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema);
