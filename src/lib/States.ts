import { Group } from '@/models/group.model';

import { Expense } from '@/models/expense.model';
import { getUserIdFromToken } from './GetToken';

const user = await getUserIdFromToken();

async function GetNetBalance() {
  const groups = await Group.find({
    createdBy: user,
    'members.userId': user,
  });

  const GroupsIDs = [];
  for (let i = 0; i < groups.length; i++) {
    GroupsIDs.push(groups[i]._id.toString());
  }

  const expenses = await Expense.find({ groupId: { $in: GroupsIDs } });

  const myexpenses = expenses.filter((exp) => exp.paidBy.toString() === user);

  const total =
    expenses
      .filter((exp) => exp.paidBy != user)
      .reduce((total, exp) => total + exp.totalAmount, 0) -
    myexpenses.reduce((total, exp) => total + exp.totalAmount, 0);

  return total;
}

export { GetNetBalance };
