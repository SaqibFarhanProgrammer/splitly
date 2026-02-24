import mongoose from "mongoose";

export interface IMember {
  userId?: mongoose.Types.ObjectId;
  username: string;
  avatarUrl?: string;
  isAdmin?: boolean;
}
