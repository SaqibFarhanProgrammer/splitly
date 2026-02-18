import mongoose, { Schema, Document, Model } from "mongoose";
import { boolean } from "zod";

interface Imemeber {
  username: string;
  isadmin: boolean;
}

export interface IGroup extends Document {
  name: string;
  totalAmount: number;
  isActive: boolean;
  members: Imemeber[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, unique:true,  required: true },
    totalAmount: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
    members: {
      type: [
        {
          username: { type: String, required: true },
          isadmin: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Group: Model<IGroup> =
  mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema);
