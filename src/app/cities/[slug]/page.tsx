import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPinned, TrainFront, UtensilsCrossed } from 'lucide-react';
import type { ComponentType } from 'react';

import { seedState } from '@/features/data/seed';
import { getCityBySlug, getNeighborhoodsByCitySlug, getTestimonials } from '@/features/runtime-store/store';
import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = seedState.cities.find((item) => item.slug === slug);
  return {
    title: city ? `${city.name} | Tourist Comfort Finder` : 'City | Tourist Comfort Finder'
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const neighborhoods = await getNeighborhoodsByCitySlug(slug);
  const testimonials = await getTestimonials(slug);

  return (
    <PageShell className="py-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <Badge className="w-fit">{city.region}</Badge>
            <CardTitle className="mt-4 text-4xl">{city.name}</CardTitle>
            <CardDescription className="max-w-2xl text-base">{city.overview}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <MetaStat label="Best time" value={city.bestTimeToVisit} />
              <MetaStat label="Comfort profile" value={city.comfortSummary} />
              <MetaStat label="Daily budget" value={`${formatCurrency(city.averageDailyBudget.balanced)} balanced`} />
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/discover" className="gap-2">
                Search neighborhoods <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/compare" variant="secondary">
                Compare stay areas
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
        <Card className="border-cyan-400/15 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Travel context</CardTitle>
            <CardDescription>{city.transportOverview}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Context icon={MapPinned} title="Zones" text={city.zones.join(' · ')} />
              <Context icon={TrainFront} title="Emergency access" text={city.emergencyAccess} />
            </div>
            <Context icon={UtensilsCrossed} title="Categories" text={city.travelerCategories.join(' · ')} />
          </CardContent>
        </Card>
      </div>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Recommended neighborhoods"
          title="The main stay areas travelers should consider"
          description="These are the neighborhoods that drive the city page recommendation logic and comparison views."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {neighborhoods.map((neighborhood) => (
            <Card key={neighborhood.slug} className="border-white/10 bg-white/5">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle>{neighborhood.name}</CardTitle>
                  <Badge>{neighborhood.priceTier}</Badge>
                </div>
                <CardDescription>{neighborhood.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-slate-300">{neighborhood.summary}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Safety" value={neighborhood.scores.safety} />
                  <Stat label="Transport" value={neighborhood.scores.transport} />
                  <Stat label="Walkability" value={neighborhood.scores.walkability} />
                  <Stat label="Tourism" value={neighborhood.scores.tourismProximity} />
                </div>
                <ButtonLink href={`/neighborhoods/${neighborhood.slug}`} variant="secondary" className="w-full">
                  Open neighborhood
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Featured attractions</CardTitle>
            <CardDescription>The city’s main attractions shape itinerary planning and tourist proximity scores.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {seedState.attractions.filter((item) => item.citySlug === city.slug).map((attraction) => (
              <div key={attraction.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="text-sm font-medium text-white">{attraction.name}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{attraction.description}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>What travelers usually choose here</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {city.travelerCategories.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
            <div className="pt-2 text-xs uppercase tracking-[0.24em] text-slate-500">Live trust data</div>
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                  “{testimonial.quote}”
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{testimonial.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}

function Context({
  icon: Icon,
  title,
  text
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 text-cyan-300" />
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
