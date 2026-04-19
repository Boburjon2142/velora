import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="text-lg font-semibold text-white">Velora</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Shahar ichida qolish uchun eng qulay hududni tanlashga yordam beradigan ishonchli platforma.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 text-sm text-slate-300">
          <div className="space-y-2">
            <div className="font-medium text-white">Ko'rib chiqish</div>
            <Link className="block" href="/discover">
              Qidirish
            </Link>
            <Link className="block" href="/compare">
              Taqqoslash
            </Link>
            <Link className="block" href="/budget">
              Byudjet
            </Link>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-white">Ma'lumot</div>
            <Link className="block" href="/cities/samarkand">
              Samarkand
            </Link>
            <Link className="block" href="/cities/bukhara">
              Bukhara
            </Link>
            <Link className="block" href="/favorites">
              Saqlangan rejalar
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          <div className="font-medium text-white">Taqdimotga tayyor</div>
          <p className="mt-2 leading-6">
            Jonli namoyish, ochiq ko'rik va amaliy sayohat rejalashtirish uchun tayyorlangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
