import { Expense } from '@/models/expense.model'
import { ConnectDB } from './ConnectDB'
import { Group } from '@/models/group.model'
import { ObjectId } from 'mongoose'

export async function GetDashboardAllStateData(userid: string) {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  await ConnectDB()
  const expensesLast30Days = await Expense.find({
    paidBy: userid,
    createdAt: { $gte: thirtyDaysAgo },
  }).select('totalAmount -_id')

  const allgroups = await Group.find({
    createdBy: userid,
  })

  const totalcountofexpense = expensesLast30Days.reduce((total, exp) => {
    return total + exp.totalAmount
  }, 0)
  // const groups = await Group.find({
  //   createdBy: userid,
  //   'members.userId': userid,
  // })






  return totalcountofexpense
}
