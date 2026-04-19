'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import { seedState } from '@/features/data/seed';
import { estimateBudget } from '@/features/budget/estimate';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const styles = ['budget', 'balanced', 'premium'] as const;

export function BudgetPlanner() {
  const [citySlug, setCitySlug] = useState(seedState.cities[0].slug);
  const cityNeighborhoods = useMemo(
    () => seedState.neighborhoods.filter((item) => item.citySlug === citySlug),
    [citySlug]
  );
  const [neighborhoodSlug, setNeighborhoodSlug] = useState(cityNeighborhoods[0].slug);
  const [durationDays, setDurationDays] = useState(3);
  const [travelerCount, setTravelerCount] = useState(2);
  const [budgetStyle, setBudgetStyle] = useState<(typeof styles)[number]>('balanced');

  const neighborhood = seedState.neighborhoods.find((item) => item.slug === neighborhoodSlug) ?? cityNeighborhoods[0];
  const estimate = estimateBudget(seedState, citySlug, neighborhood.slug, durationDays, travelerCount, budgetStyle);

  const breakdown = [
    { name: 'Stay', value: estimate.stayCost },
    { name: 'Food', value: estimate.foodCost },
    { name: 'Transport', value: estimate.transportCost },
    { name: 'Activities', value: estimate.activityCost },
    { name: 'Buffer', value: estimate.emergencyBuffer }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Trip assumptions</CardTitle>
          <CardDescription>Change the city, neighborhood, pace, and traveler count to refresh the estimate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <SelectField label="City" value={citySlug} onChange={(value) => {
            setCitySlug(value);
            const next = seedState.neighborhoods.find((item) => item.citySlug === value);
            if (next) setNeighborhoodSlug(next.slug);
          }}>
            {seedState.cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Neighborhood" value={neighborhoodSlug} onChange={setNeighborhoodSlug}>
            {cityNeighborhoods.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </SelectField>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField label="Duration (days)" value={durationDays} onChange={setDurationDays} min={1} max={30} />
            <NumberField label="Travelers" value={travelerCount} onChange={setTravelerCount} min={1} max={12} />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium text-slate-200">Budget view</div>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setBudgetStyle(style)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    budgetStyle === style
                      ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'
                      : 'border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Selected stay zone</div>
            <div className="mt-2 text-lg font-semibold text-white">{neighborhood.name}</div>
            <div className="mt-2 text-sm leading-6 text-slate-400">{neighborhood.summary}</div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Card className="border-cyan-400/15 bg-slate-950/60">
          <CardHeader>
            <CardTitle>{budgetStyle} trip estimate</CardTitle>
            <CardDescription>Includes stay, food, transport, activities, and emergency buffer.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <SummaryBox label="Total" value={estimate.total} large />
            <SummaryBox label="Daily average" value={estimate.dailyAverage} large />
            <SummaryBox label="Stay" value={estimate.stayCost} />
            <SummaryBox label="Food" value={estimate.foodCost} />
            <SummaryBox label="Transport" value={estimate.transportCost} />
            <SummaryBox label="Buffer" value={estimate.emergencyBuffer} />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown}>
                  <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(226,232,240,0.75)" />
                  <YAxis stroke="rgba(226,232,240,0.75)" />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value ?? 0))}
                    contentStyle={{
                      background: 'rgba(2, 6, 23, 0.95)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '16px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" fill="#22d3ee" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Style guidance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <Badge key={style} className="bg-white/5 text-slate-200">
                {style === 'budget' ? 'Lower-cost' : style === 'balanced' ? 'Well-rounded' : 'Premium comfort'}
              </Badge>
            ))}
          </CardContent>
        </Card>
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

function NumberField({
  label,
  value,
  onChange,
  min,
  max
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <input
        className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function SummaryBox({ label, value, large }: { label: string; value: number; large?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${large ? 'sm:col-span-2' : ''}`}>
      <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className={`mt-2 font-semibold text-white ${large ? 'text-3xl' : 'text-xl'}`}>{formatCurrency(value)}</div>
    </div>
  );
}
