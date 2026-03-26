'use client'

import { useGroupContext } from '@/context/GroupContext'
import { Card, CardContent } from '@/components/ui/card'
import { Users, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'

interface SelectGroupProps {
  onClick?: (groupId: string) => void
  onClose?: () => void
}



export default function GroupSelect({ onClick, onClose }: SelectGroupProps) {
  const { groups } = useGroupContext()

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)



  return (
    <div className="fixed z-120 inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl bg-zinc-950 border-white/10 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white font-['inter-bold']">
              Select Group
            </h2>
            <p className="text-zinc-400 text-sm font-['inter-beta'] mt-1">
              Choose a group to continue
            </p>
          </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groups.map((group) => (
              <Link
              href={`/group/${group._id}`}
                key={group._id}
                onClick={() => onClick?.(group._id)}
                className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/10 rounded-xl hover:bg-zinc-800 hover:border-white/20 transition-all duration-200 group text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-500/20 to-zinc-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white font-['inter-bold']">
                    {getInitials(group.name)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold font-['inter-bold'] truncate group-hover:text-zinc-400 transition-colors">
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-1 text-zinc-400 text-sm font-['inter-beta']">
                    <Users className="w-3.5 h-3.5" />
                    <span>{group.members?.length || 0} members</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>

          {groups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-semibold text-white font-['inter-bold'] mb-1">
                No groups found
              </h3>
              <p className="text-zinc-400 text-sm font-['inter-beta']">
                Create a group first to get started
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}