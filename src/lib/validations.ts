import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters').max(30),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createGroupSchema = z.object({
  name: z.string().min(2, 'Group name must be at least 2 characters').max(50),
  members: z.array(z.string()).optional(),
});

export const expenseSplitSchema = z.object({
  userId: z.string().min(1, 'Participant ID is required'),
  amount: z.number().min(0, 'Amount cannot be negative'),
  percentage: z.number().optional(),
});

export const addExpenseSchema = z.object({
  groupId: z.string().min(1, 'Group ID is required'),
  title: z.string().min(1, 'Title is required').max(100),
  totalAmount: z.number().positive('Amount must be positive'),
  category: z
    .enum([
      'Food',
      'Transport',
      'Accommodation',
      'Utilities',
      'Shopping',
      'Entertainment',
      'General',
    ])
    .default('General'),
  splitType: z.enum(['EQUAL', 'EXACT', 'PERCENTAGE']).default('EQUAL'),
  splits: z.array(expenseSplitSchema).optional(),
});

export const addSettlementSchema = z.object({
  groupId: z.string().min(1, 'Group ID is required'),
  paidTo: z.string().min(1, 'Recipient user ID is required'),
  amount: z.number().positive('Amount must be positive'),
  note: z.string().optional(),
});

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .optional(),
  avatar: z.string().optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});
