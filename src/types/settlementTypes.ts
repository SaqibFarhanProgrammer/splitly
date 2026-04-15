
import mongoose from 'mongoose';

export interface SettlementT {
  _id?: mongoose.Types.ObjectId | string;
  type?: string;
  groupId: mongoose.Types.ObjectId | string;
  paidBy: mongoose.Types.ObjectId | string;
  paidTo: mongoose.Types.ObjectId | string;
  amount: number | string;
  paidByUserAvatar?: string;
  paidByUserName?: string;
  paidToUserName?: string;
  paidToUserAvatar?: string;
  note?: string;
  createdAt?: string | Date;
}
