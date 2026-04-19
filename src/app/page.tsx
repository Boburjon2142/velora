import { ArrowRight, Building2, MapPin, ShieldCheck, TramFront, UtensilsCrossed } from 'lucide-react';

import { seedState } from '@/features/data/seed';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Separator } from '@/components/ui/separator';

const highlights = [
  { icon: ShieldCheck, title: 'Comfort scoring with clear tradeoffs', text: 'Transparent logic that explains why an area fits a traveler profile.' },
  { icon: TramFront, title: 'Transport-first neighborhood selection', text: 'Choose areas with realistic transit, airport, and walkability context.' },
  { icon: UtensilsCrossed, title: 'Food and practical services', text: 'See halal food, pharmacies, ATMs, and daily convenience in one place.' },
  { icon: MapPin, title: 'Neighborhood-level map clarity', text: 'Explore stay zones with responsive map filters and useful markers.' }
];

export default function HomePage() {
  const featuredCities = seedState.cities;
  const featuredNeighborhoods = seedState.neighborhoods.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-fade opacity-95" />
        <div className="absolute inset-0 hero-grid opacity-25" />
        <PageShell className="relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100">Official travel comfort planning</Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                Find the most comfortable area to stay in every city.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Tourist Comfort Finder helps visitors choose stay areas based on safety, transport, food,
                budget fit, cultural access, and the kind of trip they actually want to take.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/discover" className="gap-2">
                  Start a city search <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/compare" variant="secondary">
                  Compare neighborhoods
                </ButtonLink>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ['4 seeded cities', 'Credible data for Uzbekistan’s core tourism cities'],
                  ['16 neighborhoods', 'Enough density for comparisons and ranked recommendations'],
                  ['Live saving', 'Favorites, itineraries, and search history for signed-in users']
                ].map(([title, text]) => (
                  <Card key={title} className="border-white/10 bg-white/5">
                    <CardContent className="p-5">
                      <div className="text-2xl font-semibold text-white">{title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border-cyan-400/15 bg-slate-950/60 shadow-glow">
              <CardHeader>
                <CardTitle>Fastest route to a confident stay choice</CardTitle>
                <CardDescription>
                  Tell us the city, traveler profile, and priorities. The platform ranks the best areas and explains
                  the tradeoffs with transparent logic.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {highlightSummary(featuredCities[0], featuredCities[1], featuredCities[2])}
                <div className="grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 2).map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <item.icon className="h-5 w-5 text-cyan-300" />
                      <div className="mt-3 text-sm font-medium text-white">{item.title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-400">{item.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageShell>
      </section>

      <PageShell className="py-16">
        <SectionHeading
          eyebrow="How it works"
          title="A structured journey from search to stay decision"
          description="The platform turns traveler priorities into ranked neighborhood recommendations, budget insights, maps, and itineraries."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            ['1', 'Share trip details', 'Choose city, dates, budget level, pace, and traveler priorities.'],
            ['2', 'Rank neighborhoods', 'The engine scores stay areas against a transparent comfort model.'],
            ['3', 'Inspect tradeoffs', 'See why one area is better for your trip than another.'],
            ['4', 'Save and plan', 'Build favorites, itineraries, and comparisons with one account.']
          ].map(([step, title, text]) => (
            <Card key={title} className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Step {step}</div>
                <div className="mt-3 text-lg font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>

      <section className="border-y border-white/10 bg-slate-950/70">
        <PageShell className="py-16">
          <SectionHeading
            eyebrow="Featured cities"
            title="A credible starting network for live demonstrations"
            description="Each city page includes zones, budget ranges, transport notes, and traveler-specific guidance."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {featuredCities.map((city) => (
              <Card key={city.slug} className="group overflow-hidden border-white/10 bg-white/5">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950 p-5">
                    <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <Building2 className="h-5 w-5 text-cyan-300" />
                        <Badge>{city.country}</Badge>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-white">{city.name}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-300">{city.heroTagline}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm leading-6 text-slate-400">{city.overview}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Daily budget</div>
                      <div className="text-sm text-white">{city.averageDailyBudget.balanced}/day balanced</div>
                    </div>
                    <ButtonLink href={`/cities/${city.slug}`} variant="secondary" className="w-full">
                      Open city profile
                    </ButtonLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <PageShell className="py-16">
        <SectionHeading
          eyebrow="Featured neighborhoods"
          title="Practical stay areas with different comfort profiles"
          description="These neighborhoods are seeded with enough detail for ranking, comparison, maps, and itinerary planning."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredNeighborhoods.map((neighborhood) => {
            const city = seedState.cities.find((item) => item.slug === neighborhood.citySlug);
            return (
              <Card key={neighborhood.slug} className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle>{neighborhood.name}</CardTitle>
                      <CardDescription>{city?.name}</CardDescription>
                    </div>
                    <Badge>{neighborhood.priceTier}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-slate-300">{neighborhood.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.bestFor.map((item) => (
                      <Badge key={item} className="border-white/10 bg-white/5 text-slate-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Comfort score baseline</span>
                    <span className="font-medium text-cyan-200">{neighborhood.scores.safety + neighborhood.scores.transport > 170 ? 'High' : 'Strong'}</span>
                  </div>
                  <ButtonLink href={`/neighborhoods/${neighborhood.slug}`} variant="secondary" className="w-full">
                    View neighborhood
                  </ButtonLink>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageShell>

      <section className="border-y border-white/10 bg-slate-950/70">
        <PageShell className="py-16">
          <SectionHeading
            eyebrow="Comfort scoring"
            title="Transparent metrics, not black-box travel advice"
            description="The recommendation model combines traveler priorities with neighborhood-level signals and shows the tradeoffs alongside the ranking."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>What the score includes</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {[
                  'Safety',
                  'Transport',
                  'Walkability',
                  'Food access',
                  'Tourism proximity',
                  'Budget fit',
                  'Family friendliness',
                  'Quietness'
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Why institutions can trust it</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-slate-300">
                <p>It is structured, explainable, and easy to inspect in a live presentation.</p>
                <Separator />
                <p>Each recommendation explains strengths and tradeoffs instead of overselling a single neighborhood.</p>
                <Separator />
                <p>Budget, itinerary, compare, and map experiences all point to the same underlying city data.</p>
              </CardContent>
            </Card>
          </div>
        </PageShell>
      </section>

      <PageShell className="py-16">
        <SectionHeading eyebrow="Testimonials" title="Designed for confident trip planning" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {seedState.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{testimonial.title}</div>
                  </div>
                  <div className="text-sm text-cyan-200">{'★'.repeat(testimonial.rating)}</div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">“{testimonial.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>

      <PageShell className="pb-20">
        <SectionHeading eyebrow="FAQ" title="Practical answers for first-time users" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[
            ['Can I compare neighborhoods side by side?', 'Yes. The compare view shows score, budget, transport, food, and family fit together.'],
            ['Does saving require sign-in?', 'Yes. Saved neighborhoods, itineraries, and search history are tied to the user account.'],
            ['Is the map interactive?', 'Yes. The neighborhood pages include a filterable map with useful nearby points.'],
            ['Can the admin panel edit content?', 'Yes. Authorized admin users can adjust city, neighborhood, score, price, and label data.']
          ].map(([question, answer]) => (
            <Card key={question} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>{question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-400">{answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
    </>
  );
}

function highlightSummary(cityA: (typeof seedState.cities)[number], cityB: (typeof seedState.cities)[number], cityC: (typeof seedState.cities)[number]) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-medium text-white">Seeded city network</div>
      <div className="mt-3 space-y-3 text-sm text-slate-400">
        <div className="flex items-center justify-between">
          <span>{cityA.name}</span>
          <span>{cityA.comfortSummary}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{cityB.name}</span>
          <span>{cityB.comfortSummary}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{cityC.name}</span>
          <span>{cityC.comfortSummary}</span>
        </div>
      </div>
    </div>
  );
}
