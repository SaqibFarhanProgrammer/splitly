import { Expense } from '@/models/expense.model';
import { Group } from '@/models/group.model';

export async function GetAllGroups(userid: string | Promise<string | null>) {
  const userId = await Promise.resolve(userid);
  try {
    const groups = await Group.find({
      $or: [{ createdBy: userId },  { 'members.userId': userid }],
    });

    return JSON.parse(JSON.stringify(groups));
  } catch (error: any) {
    console.error(
      'Error fetching groups:',
      error.response?.data || error.message
    );
    return [];
  }
}
