import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { ConnectDB } from './ConnectDB';
import { Expense } from '@/models/expense.model';

export async function GetExpense(userid: string | Promise<string | null>) {
  let useridd;

  Promise.resolve(userid).then((res) => {
    useridd = res;
  });

  console.log(useridd   );
  

  await ConnectDB();

  const expenses = await Expense.find({ paidBy: useridd }).lean();

  return JSON.parse(JSON.stringify(expenses));
}
