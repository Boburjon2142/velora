import Link from 'next/link';

import { getCurrentUser } from '@/features/auth/session';
import { readAppState } from '@/features/runtime-store/store';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { seedState } from '@/features/data/seed';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user?.email) {
    return (
      <PageShell className="py-14">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Saqlangan rejalar uchun kirish kerak</CardTitle>
            <CardDescription>
              Hududlarni saqlash, qidiruvlarni qayta ko'rish va oldin tanlangan variantlarni taqqoslash uchun tizimga kiring.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ButtonLink href="/signin" className="w-full sm:w-auto">
              Tizimga kirish
            </ButtonLink>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  const state = await readAppState();
  const savedNeighborhoods = state.savedNeighborhoods.filter((item) => item.userEmail === user.email);
  const savedPlans = state.savedPlans.filter((item) => item.userEmail === user.email);
  const history = state.searchHistory.filter((item) => item.userEmail === user.email);

  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Sevimlilar"
        title="Saqlangan hududlar, marshrutlar va oldingi qidiruvlar"
        description="Reja qarorlarini qayta ko'ring va taqqoslashni noldan boshlamasdan davom ettiring."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Saqlangan hududlar</CardTitle>
            <CardDescription>{savedNeighborhoods.length} saved options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedNeighborhoods.length ? (
              savedNeighborhoods.map((item) => {
                const neighborhood = seedState.neighborhoods.find((entry) => entry.slug === item.neighborhoodSlug);
                return (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="text-sm font-medium text-white">{neighborhood?.name}</div>
                    <div className="mt-2 text-sm text-slate-400">{neighborhood?.summary}</div>
                    <div className="mt-3">
                      <Link className="text-sm text-cyan-200" href={`/neighborhoods/${item.neighborhoodSlug}`}>
                        Open profile
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState text="Hozircha saqlangan hudud yo'q." />
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Saqlangan marshrutlar</CardTitle>
            <CardDescription>{savedPlans.length} saved plans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedPlans.length ? (
              savedPlans.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-sm font-medium text-white">{item.title}</div>
                  <div className="mt-2 text-sm text-slate-400">{item.citySlug}</div>
                  <div className="mt-3">
                    <Link className="text-sm text-cyan-200" href={`/itineraries/${item.itineraryId}`}>
                      Open itinerary
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState text="Hozircha saqlangan marshrut yo'q." />
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>So'nggi qidiruvlar</CardTitle>
            <CardDescription>{history.length} search records.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.length ? (
              history.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-sm font-medium text-white">
                    {seedState.cities.find((city) => city.slug === item.citySlug)?.name}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.topNeighborhoodSlugs.map((slug) => (
                      <Badge key={slug} className="bg-white/5 text-slate-200">
                        {seedState.neighborhoods.find((n) => n.slug === slug)?.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState text="Hozircha qidiruv tarixi yo'q." />
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-400">{text}</div>;
}
