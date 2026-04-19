import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="text-lg font-semibold text-white">Tourist Comfort Finder</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            A polished, trustworthy platform for choosing the most convenient area to stay in a city.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm text-slate-300">
          <div className="space-y-2">
            <div className="font-medium text-white">Explore</div>
            <Link className="block" href="/discover">
              Search
            </Link>
            <Link className="block" href="/compare">
              Compare
            </Link>
            <Link className="block" href="/budget">
              Budget
            </Link>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-white">Reference</div>
            <Link className="block" href="/cities/samarkand">
              Samarkand
            </Link>
            <Link className="block" href="/cities/bukhara">
              Bukhara
            </Link>
            <Link className="block" href="/favorites">
              Saved plans
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          <div className="font-medium text-white">Institutional readiness</div>
          <p className="mt-2 leading-6">
            Built for live demonstrations, public-facing reviews, and practical travel planning.
          </p>
        </div>
      </div>
    </footer>
  );
}
