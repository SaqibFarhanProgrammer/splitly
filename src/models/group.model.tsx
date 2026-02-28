import { IMember } from "@/types/member";
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IGroup {
  name: string;
  totalAmount: number;
  isActive: boolean;
  members: IMember[];
  createdBy: mongoose.Types.ObjectId;
}

export interface IGroupDocument extends IGroup, Document {}

const GroupSchema = new Schema<IGroupDocument>(
  {
    name: { type: String, unique: true, required: true },
    totalAmount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        isAdmin: { type: Boolean, default: false },
        username: {
          type: String,
        },
        avatar: {
          type: String,
          default: "",
        },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Group: Model<IGroupDocument> =
  mongoose.models.Group || mongoose.model<IGroupDocument>("Group", GroupSchema);
