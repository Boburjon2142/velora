'use client';

import { useEffect, useState, useTransition, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { seedState } from '@/features/data/seed';
import type { AppState } from '@/types/domain';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type AdminState = AppState;

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const [selectedCity, setSelectedCity] = useState(seedState.cities[0].slug);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(seedState.neighborhoods[0].slug);
  const [priceCity, setPriceCity] = useState(seedState.cities[0].slug);
  const [travelerLabel, setTravelerLabel] = useState(seedState.travelerLabels[0].id);
  const [pending] = useTransition();

  const { data, isLoading, refetch } = useQuery<AdminState>({
    queryKey: ['admin-state'],
    queryFn: fetchAdminState
  });

  useEffect(() => {
    if (data) {
      setSelectedCity((current) => data.cities.find((city) => city.slug === current)?.slug ?? data.cities[0].slug);
      setSelectedNeighborhood(
        (current) => data.neighborhoods.find((item) => item.slug === current)?.slug ?? data.neighborhoods[0].slug
      );
      setPriceCity((current) => data.priceProfiles.find((item) => item.citySlug === current)?.citySlug ?? data.cities[0].slug);
      setTravelerLabel((current) => data.travelerLabels.find((item) => item.id === current)?.id ?? data.travelerLabels[0].id);
    }
  }, [data]);

  const city = data?.cities.find((item) => item.slug === selectedCity) ?? seedState.cities[0];
  const neighborhood = data?.neighborhoods.find((item) => item.slug === selectedNeighborhood) ?? seedState.neighborhoods[0];
  const priceProfile = data?.priceProfiles.find((item) => item.citySlug === priceCity) ?? seedState.priceProfiles[0];
  const traveler = data?.travelerLabels.find((item) => item.id === travelerLabel) ?? seedState.travelerLabels[0];

  async function send(action: string, payload: unknown) {
    const response = await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data: payload })
    });
    if (!response.ok) {
      throw new Error('Admin update failed');
    }
    await queryClient.invalidateQueries({ queryKey: ['admin-state'] });
    await refetch();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Cities</div>
            <div className="mt-2 text-2xl font-semibold text-white">{data?.cities.length ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Neighborhoods</div>
            <div className="mt-2 text-2xl font-semibold text-white">{data?.neighborhoods.length ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Amenities</div>
            <div className="mt-2 text-2xl font-semibold text-white">{data?.amenities.length ?? 0}</div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Attractions</div>
            <div className="mt-2 text-2xl font-semibold text-white">{data?.attractions.length ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-8 text-sm text-slate-400">Loading admin workspace...</CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="cities">
          <TabsList className="flex w-full flex-nowrap gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/5 p-2">
            {['cities', 'neighborhoods', 'scores', 'prices', 'services', 'labels', 'testimonials'].map((item) => (
              <TabsTrigger key={item} value={item} className="min-w-max rounded-2xl whitespace-nowrap">
                {item}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="cities">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Edit city profile</CardTitle>
                <CardDescription>Update the public city overview, keeping the institutional tone consistent.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <Label>City</Label>
                  <select
                    className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                  >
                    {data?.cities.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                    <div className="text-white">{city.name}</div>
                    <p className="mt-2 leading-6">{city.comfortSummary}</p>
                  </div>
                </div>
                <CityEditor
                  key={city.slug}
                  city={city}
                  onSubmit={(payload) => send('update-city', payload)}
                  pending={pending}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="neighborhoods">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Edit neighborhood profile</CardTitle>
                <CardDescription>Refresh a neighborhood summary without changing its underlying travel scores.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <Label>Neighborhood</Label>
                  <select
                    className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                    value={selectedNeighborhood}
                    onChange={(event) => setSelectedNeighborhood(event.target.value)}
                  >
                    {data?.neighborhoods.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                    <div className="text-white">{neighborhood.name}</div>
                    <p className="mt-2 leading-6">{neighborhood.vibe}</p>
                  </div>
                </div>
                <NeighborhoodEditor
                  key={neighborhood.slug}
                  neighborhood={neighborhood}
                  onSubmit={(payload) => send('update-neighborhood', payload)}
                  pending={pending}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scores">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Adjust recommendation weighting</CardTitle>
                <CardDescription>Update the underlying score settings that influence recommendation ranking.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScoreSettingsEditor
                  settings={data?.scoreSettings ?? seedState.scoreSettings}
                  onSubmit={(payload) => send('update-score-settings', payload)}
                  pending={pending}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prices">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Price assumptions</CardTitle>
                <CardDescription>Adjust stay costs for the selected city and keep budget estimates realistic.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="max-w-md">
                  <Label>City</Label>
                  <select
                    className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                    value={priceCity}
                    onChange={(event) => setPriceCity(event.target.value)}
                  >
                    {data?.cities.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <PriceEditor
                  key={priceCity}
                  priceProfile={priceProfile}
                  onSubmit={(payload) => send('upsert-price-profile', payload)}
                  pending={pending}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle>Add amenity</CardTitle>
                  <CardDescription>Attach a practical service marker to a city and neighborhood.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AmenityForm
                    cities={data?.cities ?? seedState.cities}
                    neighborhoods={data?.neighborhoods ?? seedState.neighborhoods}
                    onSubmit={(payload) => send('add-amenity', payload)}
                    pending={pending}
                  />
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle>Add attraction</CardTitle>
                  <CardDescription>Expand the itinerary and map data with another cultural point of interest.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttractionForm
                    cities={data?.cities ?? seedState.cities}
                    neighborhoods={data?.neighborhoods ?? seedState.neighborhoods}
                    onSubmit={(payload) => send('add-attraction', payload)}
                    pending={pending}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="labels">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Traveler labels</CardTitle>
                <CardDescription>Update traveler segments used by search, itinerary, and testimonial context.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <Label>Label</Label>
                  <select
                    className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                    value={travelerLabel}
                    onChange={(event) => setTravelerLabel(event.target.value)}
                  >
                    {data?.travelerLabels.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                    <div className="text-white">{traveler.name}</div>
                    <p className="mt-2 leading-6">{traveler.description}</p>
                  </div>
                </div>
                <TravelerLabelEditor
                  key={traveler.id}
                  label={traveler}
                  onSubmit={(payload) => send('upsert-traveler-label', payload)}
                  pending={pending}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Add testimonial</CardTitle>
                <CardDescription>Keep public trust content aligned with the city data you maintain.</CardDescription>
              </CardHeader>
              <CardContent>
                <TestimonialForm
                  cities={data?.cities ?? seedState.cities}
                  travelerLabels={data?.travelerLabels ?? seedState.travelerLabels}
                  onSubmit={(payload) => send('add-testimonial', payload)}
                  pending={pending}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

async function fetchAdminState(): Promise<AdminState> {
  const response = await fetch('/api/admin');
  if (!response.ok) {
    throw new Error('Unable to load admin state');
  }
  return (await response.json()) as AdminState;
}

function CityEditor({
  city,
  onSubmit,
  pending
}: {
  city: AdminState['cities'][number];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [name, setName] = useState(city.name);
  const [overview, setOverview] = useState(city.overview);
  const [bestTimeToVisit, setBestTimeToVisit] = useState(city.bestTimeToVisit);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ slug: city.slug, name, overview, bestTimeToVisit });
        toast.success('City updated');
      }}
    >
      <Field label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Overview">
        <Textarea value={overview} onChange={(event) => setOverview(event.target.value)} />
      </Field>
      <Field label="Eng yaxshi tashrif vaqti">
        <Input value={bestTimeToVisit} onChange={(event) => setBestTimeToVisit(event.target.value)} />
      </Field>
      <Button type="submit" disabled={pending}>
        Save city
      </Button>
    </form>
  );
}

function NeighborhoodEditor({
  neighborhood,
  onSubmit,
  pending
}: {
  neighborhood: AdminState['neighborhoods'][number];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [name, setName] = useState(neighborhood.name);
  const [summary, setSummary] = useState(neighborhood.summary);
  const [vibe, setVibe] = useState(neighborhood.vibe);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ slug: neighborhood.slug, name, summary, vibe });
        toast.success('Neighborhood updated');
      }}
    >
      <Field label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Summary">
        <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} />
      </Field>
      <Field label="Vibe">
        <Input value={vibe} onChange={(event) => setVibe(event.target.value)} />
      </Field>
      <Button type="submit" disabled={pending}>
        Save neighborhood
      </Button>
    </form>
  );
}

function ScoreSettingsEditor({
  settings,
  onSubmit,
  pending
}: {
  settings: AdminState['scoreSettings'];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [draft, setDraft] = useState(settings);
  return (
    <form
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit(draft);
        toast.success('Score settings updated');
      }}
    >
      {Object.entries(draft).map(([key, value]) => (
        <Field key={key} label={key}>
          <Input
            type="number"
            step="0.05"
            min={0}
            max={2}
            value={value}
            onChange={(event) => setDraft((current) => ({ ...current, [key]: Number(event.target.value) }))}
          />
        </Field>
      ))}
      <div className="sm:col-span-2 xl:col-span-3">
        <Button type="submit" disabled={pending}>
          Save settings
        </Button>
      </div>
    </form>
  );
}

function PriceEditor({
  priceProfile,
  onSubmit,
  pending
}: {
  priceProfile: AdminState['priceProfiles'][number];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [budgetNightly, setBudgetNightly] = useState(priceProfile.nightlyStay.budget);
  const [balancedNightly, setBalancedNightly] = useState(priceProfile.nightlyStay.balanced);
  const [premiumNightly, setPremiumNightly] = useState(priceProfile.nightlyStay.premium);
  return (
    <form
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ citySlug: priceProfile.citySlug, budgetNightly, balancedNightly, premiumNightly });
        toast.success('Price profile updated');
      }}
    >
      <Field label="Budget nightly">
        <Input type="number" value={budgetNightly} onChange={(e) => setBudgetNightly(Number(e.target.value))} />
      </Field>
      <Field label="Balanced nightly">
        <Input type="number" value={balancedNightly} onChange={(e) => setBalancedNightly(Number(e.target.value))} />
      </Field>
      <Field label="Premium nightly">
        <Input type="number" value={premiumNightly} onChange={(e) => setPremiumNightly(Number(e.target.value))} />
      </Field>
      <div className="sm:col-span-2 lg:col-span-3">
        <Button type="submit" disabled={pending}>
          Save price profile
        </Button>
      </div>
    </form>
  );
}

function AmenityForm({
  cities,
  neighborhoods,
  onSubmit,
  pending
}: {
  cities: AdminState['cities'];
  neighborhoods: AdminState['neighborhoods'];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [citySlug, setCitySlug] = useState(cities[0].slug);
  const [neighborhoodSlug, setNeighborhoodSlug] = useState(neighborhoods[0].slug);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('pharmacy');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const filtered = neighborhoods.filter((item) => item.citySlug === citySlug);

  useEffect(() => {
    const first = neighborhoods.find((item) => item.citySlug === citySlug);
    if (first) setNeighborhoodSlug(first.slug);
  }, [citySlug, neighborhoods]);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ citySlug, neighborhoodSlug, name, category, description, address });
        toast.success('Amenity added');
      }}
    >
      <Field label="City">
        <select value={citySlug} onChange={(event) => setCitySlug(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {cities.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
        </select>
      </Field>
      <Field label="Neighborhood">
        <select value={neighborhoodSlug} onChange={(event) => setNeighborhoodSlug(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {filtered.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
        </select>
      </Field>
      <Field label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Category">
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {['accommodation', 'cafe', 'restaurant', 'halalFood', 'pharmacy', 'hospital', 'supermarket', 'atm', 'transport', 'coworking', 'park', 'mosque', 'culturalSite'].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </Field>
      <Field label="Description">
        <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </Field>
      <Field label="Address">
        <Input value={address} onChange={(event) => setAddress(event.target.value)} />
      </Field>
      <Button type="submit" disabled={pending}>
        Add amenity
      </Button>
    </form>
  );
}

function AttractionForm({
  cities,
  neighborhoods,
  onSubmit,
  pending
}: {
  cities: AdminState['cities'];
  neighborhoods: AdminState['neighborhoods'];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [citySlug, setCitySlug] = useState(cities[0].slug);
  const [neighborhoodSlug, setNeighborhoodSlug] = useState(neighborhoods[0].slug);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('historic');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [ticketHint, setTicketHint] = useState('Free entry');
  const filtered = neighborhoods.filter((item) => item.citySlug === citySlug);

  useEffect(() => {
    const first = neighborhoods.find((item) => item.citySlug === citySlug);
    if (first) setNeighborhoodSlug(first.slug);
  }, [citySlug, neighborhoods]);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ citySlug, neighborhoodSlug, name, category, description, address, ticketHint });
        toast.success('Attraction added');
      }}
    >
      <Field label="City">
        <select value={citySlug} onChange={(event) => setCitySlug(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {cities.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
        </select>
      </Field>
      <Field label="Neighborhood">
        <select value={neighborhoodSlug} onChange={(event) => setNeighborhoodSlug(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {filtered.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
        </select>
      </Field>
      <Field label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Category">
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {['museum', 'historic', 'park', 'market', 'food', 'viewpoint', 'religious'].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </Field>
      <Field label="Description">
        <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </Field>
      <Field label="Address">
        <Input value={address} onChange={(event) => setAddress(event.target.value)} />
      </Field>
      <Field label="Ticket hint">
        <Input value={ticketHint} onChange={(event) => setTicketHint(event.target.value)} />
      </Field>
      <Button type="submit" disabled={pending}>
        Add attraction
      </Button>
    </form>
  );
}

function TravelerLabelEditor({
  label,
  onSubmit,
  pending
}: {
  label: AdminState['travelerLabels'][number];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [name, setName] = useState(label.name);
  const [description, setDescription] = useState(label.description);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ id: label.id, name, description });
        toast.success('Traveler label updated');
      }}
    >
      <Field label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Description">
        <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </Field>
      <Button type="submit" disabled={pending}>
        Save label
      </Button>
    </form>
  );
}

function TestimonialForm({
  cities,
  travelerLabels,
  onSubmit,
  pending
}: {
  cities: AdminState['cities'];
  travelerLabels: AdminState['travelerLabels'];
  onSubmit: (payload: unknown) => Promise<void>;
  pending: boolean;
}) {
  const [citySlug, setCitySlug] = useState(cities[0].slug);
  const [travelerLabelId, setTravelerLabelId] = useState(travelerLabels[0].id);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ citySlug, travelerLabelId, name, title, quote, rating });
        toast.success('Testimonial added');
      }}
    >
      <Field label="City">
        <select value={citySlug} onChange={(event) => setCitySlug(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {cities.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
        </select>
      </Field>
      <Field label="Traveler label">
        <select value={travelerLabelId} onChange={(event) => setTravelerLabelId(event.target.value)} className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white">
          {travelerLabels.map((label) => <option key={label.id} value={label.id}>{label.name}</option>)}
        </select>
      </Field>
      <Field label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Title">
        <Input value={title} onChange={(event) => setTitle(event.target.value)} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Quote">
          <Textarea value={quote} onChange={(event) => setQuote(event.target.value)} />
        </Field>
      </div>
      <Field label="Rating">
        <Input type="number" min={1} max={5} value={rating} onChange={(event) => setRating(Number(event.target.value))} />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          Add testimonial
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
