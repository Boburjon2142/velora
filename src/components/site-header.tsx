import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/features/auth/auth-options';
import { ButtonLink } from '@/components/ui/button';

export async function SiteHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-sm font-semibold text-white shadow-glow">
            TCF
          </span>
          <div>
            <div className="text-sm font-semibold tracking-[0.18em] text-cyan-200 uppercase">
              Tourist Comfort Finder
            </div>
            <div className="text-xs text-slate-400">Official travel comfort planning</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/discover">Find stay areas</Link>
          <Link href="/cities/tashkent">Cities</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/budget">Budget</Link>
          <Link href="/itinerary">Itinerary</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <div className="text-sm font-medium text-white">{session.user?.name}</div>
                <div className="text-xs text-slate-400 capitalize">{session.user?.role}</div>
              </div>
              <ButtonLink href="/api/auth/signout" variant="ghost" className="border border-white/10 bg-white/5">
                Sign out
              </ButtonLink>
            </div>
          ) : (
            <ButtonLink href="/signin" className="bg-white text-slate-950 hover:bg-cyan-100">
              Institutional access
            </ButtonLink>
          )}
        </div>
      </div>
    </header>
  );
}
