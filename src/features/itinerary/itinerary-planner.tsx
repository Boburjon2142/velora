'use client';

import { useMemo, useState, useTransition, type ComponentType, type ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowRight, CalendarRange, Clock3, MapPinned, UtensilsCrossed } from 'lucide-react';

import { seedState } from '@/features/data/seed';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

type ItineraryResponse = {
  itinerary: {
    id: string;
    title: string;
    citySlug: string;
    neighborhoodSlug: string;
    durationDays: 1 | 3 | 5;
    pace: 'relaxed' | 'balanced' | 'fast';
    days: Array<{
      day: number;
      theme: string;
      items: Array<{ time: string; title: string; detail: string; tip: string }>;
    }>;
  };
};

export function ItineraryPlanner() {
  const [citySlug, setCitySlug] = useState(seedState.cities[0].slug);
  const neighborhoods = useMemo(
    () => seedState.neighborhoods.filter((item) => item.citySlug === citySlug),
    [citySlug]
  );
  const [neighborhoodSlug, setNeighborhoodSlug] = useState(neighborhoods[0].slug);
  const [travelerLabelId, setTravelerLabelId] = useState(seedState.travelerLabels[0].id);
  const [durationDays, setDurationDays] = useState<1 | 3 | 5>(3);
  const [pace, setPace] = useState<'relaxed' | 'balanced' | 'fast'>('balanced');
  const [itinerary, setItinerary] = useState<ItineraryResponse['itinerary'] | null>(null);
  const [pending, startTransition] = useTransition();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citySlug,
          neighborhoodSlug,
          travelerLabelId,
          durationDays,
          pace
        })
      });
      if (!response.ok) {
        throw new Error("Marshrut yaratib bo'lmadi");
      }
      return (await response.json()) as ItineraryResponse;
    },
    onSuccess(data) {
      setItinerary(data.itinerary);
      toast.success('Marshrut yaratildi');
    },
    onError() {
      toast.error('Marshrut yaratish uchun tizimga kiring');
    }
  });

  async function savePlan() {
    if (!itinerary) return;
    const response = await fetch('/api/favorites', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        citySlug,
        neighborhoodSlug: itinerary.neighborhoodSlug,
        itineraryId: itinerary.id,
        title: itinerary.title
      })
    });
    if (!response.ok) {
      toast.error('Rejani saqlash uchun tizimga kiring');
      return;
    }
    toast.success('Reja saqlandi');
  }

  function generate() {
    startTransition(async () => {
      await mutation.mutateAsync();
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Reja sozlamalari</CardTitle>
          <CardDescription>Shahar, sur'at va sayohatchi profiliga qarab 1, 3 yoki 5 kunlik rejalar yarating.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <SelectField
            label="Shahar"
            value={citySlug}
            onChange={(value) => {
              setCitySlug(value);
              const next = seedState.neighborhoods.find((item) => item.citySlug === value);
              if (next) setNeighborhoodSlug(next.slug);
            }}
          >
            {seedState.cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Hudud" value={neighborhoodSlug} onChange={setNeighborhoodSlug}>
            {neighborhoods.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Sayohatchi turi" value={travelerLabelId} onChange={setTravelerLabelId}>
            {seedState.travelerLabels.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          <div>
            <div className="mb-2 text-sm font-medium text-slate-200">Davomiylik</div>
            <div className="flex flex-wrap gap-2">
              {[1, 3, 5].map((kun) => (
                <button
                  key={kun}
                  type="button"
                  onClick={() => setDurationDays(kun as 1 | 3 | 5)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    durationDays === kun
                      ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'
                      : 'border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {kun}-day
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-slate-200">Sur'at</div>
            <div className="flex flex-wrap gap-2">
              {(['relaxed', 'balanced', 'fast'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPace(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    pace === item
                      ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'
                      : 'border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={generate} disabled={pending || mutation.isPending} className="w-full gap-2">
            {pending || mutation.isPending ? 'Yaratilmoqda...' : 'Marshrut yaratish'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Card className="border-cyan-400/15 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Joriy safar profili</CardTitle>
            <CardDescription>
              Marshrut hudud ritmi, sayohatchi turi va amaliy safar tafsilotlarini birlashtiradi.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Stat icon={MapPinned} label="Shahar" value={seedState.cities.find((item) => item.slug === citySlug)?.name ?? citySlug} />
            <Stat icon={CalendarRange} label="Davomiylik" value={`${durationDays} kun`} />
            <Stat icon={Clock3} label="Sur'at" value={pace} />
            <Stat icon={UtensilsCrossed} label="Sayohatchi" value={seedState.travelerLabels.find((item) => item.id === travelerLabelId)?.name ?? travelerLabelId} />
          </CardContent>
        </Card>

        {itinerary ? (
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>{itinerary.title}</CardTitle>
                  <CardDescription>{itinerary.days.length} kunlik tuzilmali bloklar va amaliy eslatmalar.</CardDescription>
                </div>
                <Badge>{formatCurrency(seedState.neighborhoods.find((item) => item.slug === itinerary.neighborhoodSlug)?.dailyBudget.balanced ?? 0)} / kun</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {itinerary.days.map((day) => (
                <div key={day.day} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-cyan-300">Kun {day.day}</div>
                      <div className="mt-1 text-lg font-semibold text-white">{day.theme}</div>
                    </div>
                    <Badge className="bg-white/5 text-slate-200">{pace}</Badge>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {day.items.map((item) => (
                      <div key={item.time} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[88px_1fr]">
                        <div className="text-sm font-medium text-cyan-200">{item.time}</div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</div>
                          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{item.tip}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3">
                <Button onClick={savePlan} variant="secondary">
                  Marshrutni sevimlilarga saqlash
                </Button>
                <ButtonLink href={`/neighborhoods/${itinerary.neighborhoodSlug}`} variant="ghost">
                  Hududni ochish
                </ButtonLink>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-8 text-sm leading-6 text-slate-400">
              Kun bloklari, ovqat to'xtashlari va amaliy vaqt tavsiyalarini ko'rish uchun marshrut yarating.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <select
        className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <Icon className="h-4 w-4 text-cyan-300" />
        {label}
      </div>
      <div className="mt-2 text-sm leading-6 text-slate-400">{value}</div>
    </div>
  );
}

