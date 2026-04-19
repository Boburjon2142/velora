import { PageShell } from '@/components/page-shell';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageShell className="py-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-44 w-full" />
        </div>
      </div>
    </PageShell>
  );
}
