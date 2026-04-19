'use client';

import { useMemo, useState, useTransition, type ReactNode } from 'react';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { seedState } from '@/features/data/seed';
import { searchPreferenceSchema } from '@/lib/validators';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const priorityOptions = [
  ['safety', 'Xavfsizlik'],
  ['transport', 'Transport'],
  ['walkability', 'Piyoda qulaylik'],
  ['familyFriendliness', 'Oila'],
  ['foodAccess', 'Ovqat'],
  ['halalFood', 'Halol ovqat'],
  ['nightlife', 'Tungi hayot'],
  ['quietness', 'Sokin hudud'],
  ['workInternet', 'Internet'],
  ['coworkingAccess', 'Coworking'],
  ['shopping', 'Xarid'],
  ['culturalAccess', 'Madaniyat'],
  ['greenAreas', 'Yashil hududlar'],
  ['airportAccess', 'Aeroportga yaqinlik']
] as const;

type FormValues = z.input<typeof searchPreferenceSchema>;

export function DiscoverForm() {
  const [priorityWeights, setPriorityWeights] = useState<Record<string, number>>({});
  const [pending, startTransition] = useTransition();
  const [selectedRecommendations, setSelectedRecommendations] = useState<
    Awaited<ReturnType<typeof fetchRecommendations>>['recommendations']
  >([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(searchPreferenceSchema),
    defaultValues: {
      citySlug: seedState.cities[0].slug,
      travelDates: new Date().toISOString().slice(0, 10),
      tripDuration: 3,
      travelerCount: 2,
      travelerLabelId: seedState.travelerLabels[0].id,
      budget: 'balanced',
      accommodationPreference: 'Butik mehmonxona',
      priorities: {},
      languagePreference: "O'zbek / Ingliz",
      pace: 'balanced'
    }
  });

  const city = useMemo(
    () => seedState.cities.find((item) => item.slug === form.watch('citySlug')) ?? seedState.cities[0],
    [form]
  );

  const mutation = useMutation({
    mutationFn: fetchRecommendations
  });

  function togglePriority(key: string) {
    setPriorityWeights((current) => {
      const next = { ...current };
      next[key] = (next[key] ?? 0) === 0 ? 1 : (next[key] ?? 0) === 1 ? 2 : 0;
      return next;
    });
  }

  async function onSubmit(values: FormValues) {
    const payload = { ...values, priorities: priorityWeights };
    startTransition(async () => {
      const result = await mutation.mutateAsync(payload);
      setSelectedRecommendations(result.recommendations);
      toast.success('Tavsiyalar yaratildi');
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Sayohat afzalliklari formasi</CardTitle>
          <CardDescription>
            Safarni qanchalik aniq tasvirlasangiz, tavsiya va izoh shunchalik yaxshi bo'ladi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-2"
            noValidate
          >
            <Field label="Boriladigan shahar" error={form.formState.errors.citySlug?.message}>
              <select
                className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                {...form.register('citySlug')}
              >
                {seedState.cities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Safar sanasi" error={form.formState.errors.travelDates?.message}>
              <Input type="date" {...form.register('travelDates')} />
            </Field>

            <Field label="Safar davomiyligi" error={form.formState.errors.tripDuration?.message}>
              <Input type="number" min={1} max={30} {...form.register('tripDuration', { valueAsNumber: true })} />
            </Field>

            <Field label="Sayohatchilar soni" error={form.formState.errors.travelerCount?.message}>
              <Input type="number" min={1} max={12} {...form.register('travelerCount', { valueAsNumber: true })} />
            </Field>

            <Field label="Sayohatchi turi" error={form.formState.errors.travelerLabelId?.message}>
              <select
                className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                {...form.register('travelerLabelId')}
              >
                {seedState.travelerLabels.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Byudjet uslubi" error={form.formState.errors.budget?.message}>
              <select
                className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                {...form.register('budget')}
              >
                <option value="budget">Tejamkor</option>
                <option value="balanced">Balansli</option>
                <option value="premium">Premium</option>
              </select>
            </Field>

            <Field label="Yashash turi" error={form.formState.errors.accommodationPreference?.message}>
              <Input placeholder="Butik mehmonxona" {...form.register('accommodationPreference')} />
            </Field>

            <Field label="Til afzalligi" error={form.formState.errors.languagePreference?.message}>
              <Input placeholder="O'zbek / Ingliz" {...form.register('languagePreference')} />
            </Field>

            <Field label="Safar sur'ati" error={form.formState.errors.pace?.message}>
              <select
                className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                {...form.register('pace')}
              >
                <option value="relaxed">Sokin</option>
                <option value="balanced">Balansli</option>
                <option value="fast">Tezkor</option>
              </select>
            </Field>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <Label>Ustuvorliklar</Label>
                <span className="text-xs text-slate-500">Ustuvorlikni bosib, past, o'rta va yuqori darajani almashtiring.</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {priorityOptions.map(([key, label]) => {
                  const level = priorityWeights[key] ?? 0;
                  const active =
                    level === 0
                      ? 'border-white/10 bg-white/5 text-slate-300'
                      : level === 1
                        ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'
                        : 'border-cyan-300/30 bg-cyan-300/20 text-cyan-50';
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => togglePriority(key)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${active}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button type="submit" disabled={pending || mutation.isPending} className="w-full gap-2 sm:w-auto">
                {pending || mutation.isPending ? 'Tavsiyalar tayyorlanmoqda...' : 'Tavsiyalarni yaratish'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <ButtonLink variant="secondary" href="/compare" className="w-full sm:w-auto">
                Taqqoslash sahifasini ochish
              </ButtonLink>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Card className="border-cyan-400/15 bg-slate-950/60">
          <CardHeader>
            <CardTitle>Tanlangan shahar konteksti</CardTitle>
            <CardDescription>{city.overview}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoBlock label="Eng yaxshi tashrif vaqti" value={city.bestTimeToVisit} />
            <InfoBlock label="Balansli byudjet" value={formatCurrency(city.averageDailyBudget.balanced)} />
            <InfoBlock label="Transport" value={city.transportOverview} wide />
            <InfoBlock label="Sayohatchi turlari" value={city.travelerCategories.join(' · ')} wide />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Tavsiya natijalari</CardTitle>
            <CardDescription>
              Eng yaxshi uch hudud bu yerda qulaylik bahosi, byudjet hisoboti, kuchli tomonlar va cheklovlar bilan ko'rinadi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedRecommendations.length ? (
              selectedRecommendations.map((item, index) => {
                const neighborhood = seedState.neighborhoods.find((entry) => entry.slug === item.neighborhoodSlug);
                return (
                  <div key={item.neighborhoodSlug} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">O'rin {index + 1}</div>
                        <div className="mt-1 text-xl font-semibold text-white">{neighborhood?.name}</div>
                        <div className="mt-1 text-sm text-slate-400">{neighborhood?.summary}</div>
                      </div>
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-left sm:text-right">
                        <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Qulaylik</div>
                        <div className="text-2xl font-semibold text-white">{item.comfortScore}</div>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${item.comfortScore}%` }} />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{item.rationale}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.strengths.map((strength) => (
                        <Badge key={strength} className="bg-emerald-400/10 text-emerald-100">
                          <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                          {strength}
                        </Badge>
                      ))}
                      {item.tradeoffs.map((tradeoff) => (
                        <Badge key={tradeoff} className="border-amber-400/20 bg-amber-400/10 text-amber-100">
                          {tradeoff}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-slate-400">Taxminiy safar narxi</div>
                      <div className="text-sm font-medium text-white">{formatCurrency(item.priceEstimate)}</div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <ButtonLink href={`/neighborhoods/${item.neighborhoodSlug}`} variant="secondary" className="w-full sm:w-auto">
                        Profilni ochish
                      </ButtonLink>
                      <ButtonLink
                        href={`/compare?ids=${selectedRecommendations.map((n) => n.neighborhoodSlug).join(',')}`}
                        variant="ghost"
                        className="w-full sm:w-auto"
                      >
                        Reytinglangan variantlarni taqqoslash
                      </ButtonLink>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-slate-400">
                Eng yaxshi uch hudud, izohlar va farqlarni ko'rish uchun tavsiya yarating.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function fetchRecommendations(values: FormValues) {
  const response = await fetch('/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  if (!response.ok) {
    throw new Error("Tavsiyalarni yaratib bo'lmadi");
  }
  return (await response.json()) as {
    recommendations: Array<{
      neighborhoodSlug: string;
      comfortScore: number;
      strengths: string[];
      tradeoffs: string[];
      rationale: string;
      priceEstimate: number;
    }>;
  };
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

function InfoBlock({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? 'sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4' : 'rounded-2xl border border-white/10 bg-white/5 p-4'}>
      <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm leading-6 text-white">{value}</div>
    </div>
  );
}

