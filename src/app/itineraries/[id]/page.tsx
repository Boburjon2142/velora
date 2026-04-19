import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { seedState } from '@/features/data/seed';
import { readAppState } from '@/features/runtime-store/store';
import { PageShell } from '@/components/page-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `${id} | Tourist Comfort Finder` };
}

export default async function ItineraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const state = await readAppState();
  const itinerary = state.itineraries.find((item) => item.id === id);
  if (!itinerary) notFound();

  const city = seedState.cities.find((item) => item.slug === itinerary.citySlug);
  const neighborhood = seedState.neighborhoods.find((item) => item.slug === itinerary.neighborhoodSlug);

  return (
    <PageShell className="py-12">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{city?.name}</Badge>
            <Badge className="bg-white/5 text-slate-200">{neighborhood?.name}</Badge>
            <Badge className="bg-white/5 text-slate-200">{itinerary.pace}</Badge>
          </div>
          <CardTitle className="mt-4 text-4xl">{itinerary.title}</CardTitle>
          <CardDescription>{itinerary.days.length} days of practical routing, food stops, and time blocks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {itinerary.days.map((day) => (
            <div key={day.day} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-cyan-300">Day {day.day}</div>
              <div className="mt-2 text-lg font-semibold text-white">{day.theme}</div>
              <div className="mt-4 grid gap-3">
                {day.items.map((item) => (
                  <div key={item.time} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium text-cyan-200">{item.time}</div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{item.tip}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <ButtonLink href={`/neighborhoods/${itinerary.neighborhoodSlug}`} variant="secondary">
            Open neighborhood profile
          </ButtonLink>
        </CardContent>
      </Card>
    </PageShell>
  );
}
