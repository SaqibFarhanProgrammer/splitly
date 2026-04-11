import mongoose from 'mongoose';

export interface Member {
  userId: string;
  username: string;
  avatar?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  _id: string;
  name: string;
  totalAmount: number;
  isActive: boolean;
  members: Member[];
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export interface Expense {
  _id?: string;
  groupId: string;
  title: string;
  totalAmount: number;
  paidBy: string;
  paidmemberAvatar?: string;
  paidmemberUsername?: string;
  createdAt: Date;
  updatedAt: Date | string;
}

export interface ExpenseFormValues {
  amount: number | string;
  description: string;
  paidBy: string;
  groupid: string;
}

export interface Settlement {
  groupId: string;
  paidBy: string;
  paidTo: string;
  amount: number;
  paidByUserAvatar?: string;
  paidByUserName?: string;
  paidToUserName?: string;
  note?: string;
}

export interface SettlementFormValues {
  memberId: string;
  amount: string;
  note: string;
}
