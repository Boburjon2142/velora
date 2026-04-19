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
    title: neighborhood ? `${neighborhood.name} | Velora` : 'Hudud | Velora'
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
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{city?.name}</Badge>
              <Badge className="bg-white/5 text-slate-200">{neighborhood.priceTier}</Badge>
            </div>
            <CardTitle className="mt-4 text-3xl sm:text-4xl">{neighborhood.name}</CardTitle>
            <CardDescription className="max-w-3xl text-base">{neighborhood.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm leading-7 text-slate-300">{neighborhood.transitNotes}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SaveNeighborhoodButton slug={neighborhood.slug} />
              <ButtonLink href={`/compare?ids=${neighborhood.slug}`} variant="secondary" className="w-full sm:w-auto">
                Ushbu hududni taqqoslash
              </ButtonLink>
              <ButtonLink href="/itinerary" variant="ghost" className="w-full sm:w-auto">
                Marshrut yaratish
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
        <Card className="border-cyan-400/15 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Baho taqsimoti</CardTitle>
            <CardDescription>
              Kuchli {neighborhood.bestFor[0]?.toLowerCase()} mosligi, tanlangan hudud uchun farqlar bilan birga ko'rsatiladi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ['Xavfsizlik', neighborhood.scores.safety],
              ['Transport', neighborhood.scores.transport],
              ['Piyoda qulaylik', neighborhood.scores.walkability],
              ['Ovqat', neighborhood.scores.foodAccess],
              ['Turizm yaqinligi', neighborhood.scores.tourismProximity],
              ['Byudjet mosligi', neighborhood.scores.budgetFit],
              ['Internet', neighborhood.scores.workInternet],
              ['Favqulodda yordam', neighborhood.scores.emergencyAccess]
            ].map(([label, value]) => (
              <ScoreRow key={label} label={label as string} value={Number(value)} />
            ))}
          </CardContent>
        </Card>
      </div>

      <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Eng mos</CardTitle>
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
            <CardTitle>Afzalliklar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
            <p>{neighborhood.foodNotes}</p>
            <p>{neighborhood.safetyNotes}</p>
            <p>{neighborhood.internetNotes}</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Cheklovlar</CardTitle>
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
            <CardTitle>Yaqin xizmatlar</CardTitle>
            <CardDescription>Dorixonalar, shifoxonalar, bankomatlar, supermarketlar va coworking nuqtalari.</CardDescription>
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
            <CardTitle>Yaqin diqqat joylari</CardTitle>
            <CardDescription>Marshrut, kun tanlovi va sayohatchi mosligini rejalashda foydali.</CardDescription>
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
            <CardTitle>Xarita va yaqin doira</CardTitle>
            <CardDescription>Eng muhim joylarni filtrlang va tanlangan hudud atrofidagi yaqinlikni ko'ring.</CardDescription>
          </CardHeader>
          <CardContent>
            <NeighborhoodMap neighborhood={neighborhood} amenities={nearbyAmenities} attractions={nearbyAttractions} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Namuna kunlik byudjet</CardTitle>
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
            <CardTitle>Safar izohlari va marshrut ko'rsatmalari</CardTitle>
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
                Reja tuzish <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Sayohatchi fikrlari</CardTitle>
            <CardDescription>Hududning amalda qanday tuyulishini ko'rsatadigan tayyor fikrlar.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
