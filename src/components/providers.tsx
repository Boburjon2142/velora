'use client';

import { useState, type ReactNode } from 'react';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export function Providers({
  children,
  session
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [client] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        {children}
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}
