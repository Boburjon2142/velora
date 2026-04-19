import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock3, HeartPulse, Landmark, TrainFront } from 'lucide-react';
import type { ComponentType } from 'react';

import { seedState } from '@/features/data/seed';
import {
  getCityBySlug,
  getNeighborhoodBySlug,
  getPriceProfile,
  getTestimonials
} from '@/features/runtime-store/store';
import { PageShell } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SaveNeighborhoodButton } from '@/components/save-neighborhood-button';
import { NeighborhoodMap } from '@/components/neighborhood-map';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = seedState.neighborhoods.find((item) => item.slug === slug);
  return {
    title: neighborhood ? `${neighborhood.name} | Tourist Comfort Finder` : 'Neighborhood | Tourist Comfort Finder'
  };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const city = await getCityBySlug(neighborhood.citySlug);
  const priceProfile = (await getPriceProfile(neighborhood.citySlug)) ?? seedState.priceProfiles[0];
  const testimonials = await getTestimonials(neighborhood.citySlug);
  const nearbyAmenities = seedState.amenities.filter((item) => item.neighborhoodSlug === neighborhood.slug);
  const nearbyAttractions = seedState.attractions.filter((item) => item.neighborhoodSlug === neighborhood.slug);

  return (
    <PageShell className="py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{city?.name}</Badge>
              <Badge className="bg-white/5 text-slate-200">{neighborhood.priceTier}</Badge>
            </div>
            <CardTitle className="mt-4 text-4xl">{neighborhood.name}</CardTitle>
            <CardDescription className="max-w-3xl text-base">{neighborhood.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm leading-7 text-slate-300">{neighborhood.transitNotes}</p>
            <div className="flex flex-wrap gap-3">
              <SaveNeighborhoodButton slug={neighborhood.slug} />
              <ButtonLink href={`/compare?ids=${neighborhood.slug}`} variant="secondary">
                Compare this area
              </ButtonLink>
              <ButtonLink href="/itinerary" variant="ghost">
                Build itinerary
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
        <Card className="border-cyan-400/15 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Score breakdown</CardTitle>
            <CardDescription>
              Strong {neighborhood.bestFor[0]?.toLowerCase()} fit, with tradeoffs clearly shown for the selected stay zone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ['Safety', neighborhood.scores.safety],
              ['Transport', neighborhood.scores.transport],
              ['Walkability', neighborhood.scores.walkability],
              ['Food access', neighborhood.scores.foodAccess],
              ['Tourism proximity', neighborhood.scores.tourismProximity],
              ['Budget fit', neighborhood.scores.budgetFit],
              ['Internet', neighborhood.scores.workInternet],
              ['Emergency access', neighborhood.scores.emergencyAccess]
            ].map(([label, value]) => (
              <ScoreRow key={label} label={label as string} value={Number(value)} />
            ))}
          </CardContent>
        </Card>
      </div>

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Best for</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {neighborhood.bestFor.map((item) => (
              <Badge key={item} className="bg-white/5 text-slate-200">
                {item}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Advantages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
            <p>{neighborhood.foodNotes}</p>
            <p>{neighborhood.safetyNotes}</p>
            <p>{neighborhood.internetNotes}</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Tradeoffs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-slate-300">
            {neighborhood.tradeoffs.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Nearby services</CardTitle>
            <CardDescription>Pharmacies, hospitals, ATMs, supermarkets, and coworking points that support real travel planning.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {nearbyAmenities.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{item.description}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{item.category}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Nearby attractions</CardTitle>
            <CardDescription>Useful for route planning, day selection, and traveler fit.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {nearbyAttractions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{item.description}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{item.ticketHint}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-14">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Map and nearby radius</CardTitle>
            <CardDescription>Filter the places that matter most and inspect proximity around the selected stay zone.</CardDescription>
          </CardHeader>
          <CardContent>
            <NeighborhoodMap neighborhood={neighborhood} amenities={nearbyAmenities} attractions={nearbyAttractions} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Sample daily budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BudgetRow label="Stay" value={priceProfile.nightlyStay.balanced} />
            <BudgetRow label="Food" value={priceProfile.foodPerDay.balanced} />
            <BudgetRow label="Transport" value={priceProfile.transportPerDay.balanced} />
            <BudgetRow label="Activities" value={priceProfile.activityPerDay.balanced} />
            <div className="rounded-2xl border border-white/10 bg-cyan-400/10 p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Balanced daily total</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {formatCurrency(
                  priceProfile.nightlyStay.balanced +
                    priceProfile.foodPerDay.balanced +
                    priceProfile.transportPerDay.balanced +
                    priceProfile.activityPerDay.balanced
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Travel notes and itinerary cues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Note icon={Clock3} label="Pace" value={neighborhood.vibe} />
              <Note icon={TrainFront} label="Transit" value={neighborhood.transitNotes} />
              <Note icon={HeartPulse} label="Emergency" value={neighborhood.safetyNotes} />
              <Note icon={Landmark} label="Culture" value={neighborhood.nearbyLandmarks.join(' · ')} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm leading-7 text-slate-300">
              Suggested approach: stay here if you want a clear balance of {neighborhood.bestFor[0]?.toLowerCase()} and {city?.name.toLowerCase()} access.
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/itinerary?city=${neighborhood.citySlug}&neighborhood=${neighborhood.slug}`} className="gap-2">
                Build a plan <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Traveler sentiment</CardTitle>
            <CardDescription>Seeded testimonials that reinforce how the neighborhood feels in real use.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-cyan-200">{'★'.repeat(testimonial.rating)}</div>
                </div>
                <div className="mt-3 text-sm leading-6 text-slate-300">“{testimonial.quote}”</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function BudgetRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-sm font-medium text-white">{formatCurrency(value)}</span>
    </div>
  );
}

function Note({
  icon: Icon,
  label,
  value
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 text-cyan-300" />
        {label}
      </div>
      <div className="mt-2 text-sm leading-6 text-slate-400">{value}</div>
    </div>
  );
}
