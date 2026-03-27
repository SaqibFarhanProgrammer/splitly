import { Skeleton } from '@/components/ui/skeleton';

export function MembersListSkeleton() {
  return (
    <div className="flex items-center gap-3 overflow-hidden pb-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 bg-zinc-950/80 px-3 py-2.5 rounded-full border border-zinc-800/60 flex-shrink-0 min-w-[120px]"
        >
          <Skeleton className="w-8 h-8 rounded-full bg-zinc-800 ring-2 ring-zinc-900" />

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-16 bg-zinc-800" />
            <Skeleton className="h-2 w-10 bg-zinc-900" />
          </div>
        </div>
      ))}
    </div>
  );
}
