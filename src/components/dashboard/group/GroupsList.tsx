import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Crown, UserPlus, Users } from 'lucide-react'
import Link from 'next/link'
import { Group } from '@/context/GroupContext'
import { Expense } from '@/context/Expenses.Context'
import { useAuth } from '@/context/AuthContext'

interface GroupsListProps {
  loading: boolean
  groupData: Group[]
  expenses: Expense[]
}
function GroupsList({ loading, groupData, expenses }: GroupsListProps) {
  const { user } = useAuth()

  function getgrouptotalexpense(groupid: string) {
    const total = expenses.filter((ex) => ex.groupId.includes(groupid))
    const finalamount = total.reduce((total, ex) => {
      return total + Number(ex.totalAmount)
    }, 0)

    return finalamount
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {!loading
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
              className="bg-zinc-950 border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-500/5 group"
            >
              <Link href={`/group/${group._id}`} className="block">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-800 text-white text-sm font-bold">
                          {group.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-white truncate font-['inter-bold']">
                          {group.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Users className="w-3.5 h-3.5 text-zinc-500" />
                          <span className="text-xs text-zinc-400 font-['inter-beta']">
                            {group.members.length} members
                          </span>
                        </div>
                      </div>
                    </div>

                    <Badge
                      variant={group.isActive ? 'default' : 'secondary'}
                      className={`shrink-0 font-['inter-beta'] text-xs ${
                        group.isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      {group.isActive ? 'Active' : 'Settled'}
                    </Badge>
                  </div>

                  <div className="h-px bg-white/5 mb-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-500 text-xs mb-1 font-['inter-beta'] uppercase tracking-wider">
                        Total Expenses
                      </p>
                      <p className="text-xl font-bold text-white font-['inter-bold'] tracking-tight">
                        ₹{getgrouptotalexpense(group._id).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-['inter-beta']">
                        {group.createdBy === user?._id ? (
                          <>
                            <Crown className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-amber-500/90">Admin</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5 text-zinc-500" />
                            <span>Member</span>
                          </>
                        )}
                      </div>
                      <p className="text-zinc-600 text-[10px] mt-1">
                        {group.createdBy === user?._id
                          ? 'You created this'
                          : 'Added by admin'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
    </div>
  )
}

export default GroupsList
