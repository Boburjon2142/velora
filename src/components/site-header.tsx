import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Menu } from 'lucide-react';

import { authOptions } from '@/features/auth/auth-options';
import { ButtonLink } from '@/components/ui/button';

export async function SiteHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-sm font-semibold text-white shadow-glow">
              VL
            </span>
            <div>
              <div className="text-sm font-semibold tracking-[0.18em] text-cyan-200 uppercase">
                Velora
              </div>
              <div className="text-xs text-slate-400">Sayohat uchun qulaylikni rejalashtirish</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-medium text-white">{session.user?.name}</div>
                  <div className="text-xs text-slate-400 capitalize">{session.user?.role}</div>
                </div>
                <ButtonLink href="/api/auth/signout" variant="ghost" className="border border-white/10 bg-white/5">
                  Chiqish
                </ButtonLink>
              </div>
            ) : (
              <ButtonLink href="/signin" className="bg-white text-slate-950 hover:bg-cyan-100">
                Tizimga kirish
              </ButtonLink>
            )}
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/discover">Hudud tanlash</Link>
          <Link href="/cities/tashkent">Shaharlar</Link>
          <Link href="/compare">Taqqoslash</Link>
          <Link href="/budget">Byudjet</Link>
          <Link href="/itinerary">Marshrut</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <details className="group rounded-3xl border border-white/10 bg-white/5 px-4 py-3 md:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-white">
            <span className="flex items-center gap-2">
              <Menu className="h-4 w-4 text-cyan-300" />
              Menyu
            </span>
            <span className="text-xs text-slate-400 group-open:hidden">Ochish</span>
            <span className="hidden text-xs text-slate-400 group-open:inline">Yopish</span>
          </summary>
          <div className="mt-3 grid gap-2 pt-3 text-sm text-slate-200">
            <Link className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3" href="/discover">
              Hudud tanlash
            </Link>
            <Link className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3" href="/cities/tashkent">
              Shaharlar
            </Link>
            <Link className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3" href="/compare">
              Taqqoslash
            </Link>
            <Link className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3" href="/budget">
              Byudjet
            </Link>
            <Link className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3" href="/itinerary">
              Marshrut
            </Link>
            <Link className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3" href="/admin">
              Admin
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
