import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function PageShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn('mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8', className)}>{children}</main>;
}
