import Link from 'next/link';

import { seedState } from '@/features/data/seed';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CitiesDirectoryPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Shaharlar"
        title="Tayyorlangan yo'nalishlarni ko'ring"
        description="Har bir shaharda hudud yo'nalishlari, byudjet konteksti, safar zonalari va ishonch signallari bor."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {seedState.cities.map((city) => (
          <Card key={city.slug} className="border-white/10 bg-white/5">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>{city.name}</CardTitle>
                  <CardDescription>{city.region}</CardDescription>
                </div>
                <Badge>{city.country}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-300">{city.overview}</p>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                {city.transportOverview}
              </div>
              <Link className="text-sm font-medium text-cyan-200" href={`/cities/${city.slug}`}>
                Shahar profilini ochish
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
