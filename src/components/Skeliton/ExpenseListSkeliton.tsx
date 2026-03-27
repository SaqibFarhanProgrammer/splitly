import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function ExpenseSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3 items-start animate-pulse">
          {/* Avatar Skeleton */}
          <Skeleton className="w-11 h-11 rounded-full flex-shrink-0 bg-zinc-800" />

          <div className="flex-1 min-w-0">
            <Card className="bg-zinc-950 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    {/* Title Skeleton */}
                    <Skeleton className="h-5 w-1/2 bg-zinc-800" />
                    {/* Subtitle/Paid by Skeleton */}
                    <Skeleton className="h-4 w-1/3 bg-zinc-900" />
                  </div>

                  <div className="text-right space-y-2">
                    {/* Amount Skeleton */}
                    <Skeleton className="h-6 w-20 ml-auto bg-zinc-800" />
                    {/* Time Skeleton */}
                    <Skeleton className="h-3 w-12 ml-auto bg-zinc-900" />
                  </div>
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <Skeleton className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-950" />
                      <Skeleton className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-950" />
                    </div>
                    <Skeleton className="h-3 w-20 bg-zinc-900" />
                  </div>
                  <Skeleton className="h-5 w-14 bg-zinc-900 rounded-md" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
