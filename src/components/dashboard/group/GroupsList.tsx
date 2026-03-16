import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { Group } from '@/context/GroupContext'
import { Expense } from '@/context/Expenses.Context'

interface GroupsListProps {
  loading: boolean
  groupData: Group[]
  expenses: Expense[]
}
function GroupsList({ loading, groupData, expenses }: GroupsListProps) {
  function getgrouptotalexpense(groupid: string) {
    const total = expenses.filter((ex) => ex.groupId === groupid)
    const finalamount = total.reduce((total, ex) => {
      return total + Number(ex.totalAmount)
    }, 0)

    return finalamount
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-zinc-950 border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full bg-zinc-800" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32 bg-zinc-800 font-['inter-bold']" />
                      <Skeleton className="h-3 w-20 bg-zinc-800 font-['inter-beta']" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16 bg-zinc-800 rounded-full font-['inter-beta']" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20 bg-zinc-800 font-['inter-beta']" />
                    <Skeleton className="h-6 w-24 bg-zinc-800 font-['inter-bold']" />
                  </div>
                  <Skeleton className="h-3 w-12 bg-zinc-800 font-['inter-beta']" />
                </div>
              </CardContent>
            </Card>
          ))
        : groupData.map((group, index) => (
            <Card
              key={group._id}
              className="bg-zinc-950 border-white/10 hover:border-white/20 transition-all hover:shadow-lg hover:shadow-zinc/5"
            >
              <Link href={`/group/${group._id}`} className="block">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-white font-['inter-bold'] truncate pr-2">
                      {group.name}
                    </h3>
                    <Badge
                      variant={group.isActive ? 'default' : 'secondary'}
                      className={`font-['inter-beta'] shrink-0 ${
                        group.isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 text-xs'
                      }`}
                    >
                      {group.isActive ? 'Active' : 'Settled'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold font-['inter-bold']">
                        {group.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-['inter-beta']">
                      <Users className="w-3 h-3" />
                      <span>{group.members.length} members</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-zinc-500 text-xs mb-0.5 font-['inter-beta']">
                        Total Expenses
                      </p>
                      <p className="text-lg font-bold text-white font-['inter-bold']">
                        Rs{getgrouptotalexpense(group._id)}
                      </p>
                    </div>

                    <p className="text-zinc-500 text-xs font-['inter-beta'] text-right">
                      {group.members[index]?.isAdmin === true
                        ? 'You created this group'
                        : 'You were added'}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
    </div>
  )
}

export default GroupsList
