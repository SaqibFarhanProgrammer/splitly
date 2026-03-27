import { Expense } from '@/models/expense.model';
import { Group } from '@/models/group.model';

export async function GetAllGroups(userid: string) {
  try {
    const groups = await Group.find({
      $or: [{ createdBy: userid }, { 'members.userId': userid }],
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
