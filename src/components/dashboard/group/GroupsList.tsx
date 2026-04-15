import { useAuthContext } from '@/context/AuthContext';
import { Group } from '@/types/globalTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronRight, Crown, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
interface GroupsListProps {
  loading:Boolean
  groupData: Group[];
}
function GroupsList({ loading, groupData }: GroupsListProps) {
  const { user } = useAuthContext();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {!loading && groupData?.length > 0 ? (
        groupData.map((group) => (
          <Card
            key={group?._id}
            className="bg-zinc-950 border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-500/5 group overflow-hidden"
          >
            <Link href={`/group/${group?._id}`} className="block">
              <CardContent className="p-0">
                <div className="p-5 pb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 shrink-0 border border-white/10">
                      <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-800 text-white text-sm font-bold">
                        {group?.name?.charAt(0)?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold text-white truncate">
                          {group?.name || "Unnamed Group"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                        <Users className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{group?.members?.length || 0} members</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 flex items-center justify-between text-sm">
                  <span className="text-zinc-500 text-xs">View details</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))
      ) : (
        <p className="text-zinc-500">No group yet</p>
      )}
    </div>
  );
}
export default GroupsList;
