import mongoose from "mongoose";

export interface IMember {
  userId?: mongoose.Types.ObjectId | string;
  username: string;
  avatar?: string;
  isAdmin?: boolean;
}
