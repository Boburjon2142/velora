import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn('inline-flex h-11 items-center rounded-2xl border border-white/10 bg-white/5 p-1', className)}
    {...props}
  />
);
export const TabsTrigger = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950',
      className
    )}
    {...props}
  />
);
export const TabsContent = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn('mt-6 outline-none', className)} {...props} />
);
