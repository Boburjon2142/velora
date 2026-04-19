import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import { getServerSession } from 'next-auth';
import type { ReactNode } from 'react';

import './globals.css';
import { authOptions } from '@/features/auth/auth-options';
import { Providers } from '@/components/providers';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700']
});

const serif = IBM_Plex_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Velora',
  description: 'Shahar ichida yashash uchun eng qulay hududni ishonch bilan tanlang.'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="uz" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Providers session={session}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
