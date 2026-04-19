'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import { seedState } from '@/features/data/seed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const metrics = [
  ['safety', 'Safety'],
  ['transport', 'Transport'],
  ['walkability', 'Walkability'],
  ['foodAccess', 'Food'],
  ['tourismProximity', 'Tourism'],
  ['budgetFit', 'Budget fit']
] as const;

export function ComparePanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIds = searchParams.get('ids')?.split(',').filter(Boolean) ?? seedState.neighborhoods.slice(0, 2).map((item) => item.slug);
  const [selected, setSelected] = useState<string[]>(initialIds.slice(0, 4));

  const neighborhoods = useMemo(
    () => seedState.neighborhoods.filter((item) => selected.includes(item.slug)),
    [selected]
  );

  const chartData = metrics.map(([key, label]) => {
    const row: Record<string, string | number> = { metric: label };
    neighborhoods.forEach((neighborhood) => {
      row[neighborhood.name] = neighborhood.scores[key];
    });
    return row;
  });

  return (
    <div className="space-y-8">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Choose neighborhoods to compare</CardTitle>
          <CardDescription>Select 2 to 4 stay areas, then the radar chart and score cards update immediately.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <label className="mb-2 block text-sm font-medium text-slate-200">Option {index + 1}</label>
              <select
                className="h-11 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white"
                value={selected[index] ?? ''}
                onChange={(event) => {
                  const next = [...selected];
                  next[index] = event.target.value;
                  setSelected(next.filter(Boolean).slice(0, 4));
                }}
              >
                <option value="">Select neighborhood</option>
                {seedState.neighborhoods.map((neighborhood) => (
                  <option key={neighborhood.slug} value={neighborhood.slug}>
                    {seedState.cities.find((city) => city.slug === neighborhood.citySlug)?.name} · {neighborhood.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="lg:col-span-4 flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => router.push(`/compare?ids=${selected.filter(Boolean).join(',')}`)}
              disabled={selected.filter(Boolean).length < 2}
            >
              Apply comparison
            </Button>
            <Button variant="secondary" onClick={() => setSelected(seedState.neighborhoods.slice(0, 2).map((item) => item.slug))}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {neighborhoods.length >= 2 ? (
        <>
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Comfort profile overview</CardTitle>
              <CardDescription>Strong neighborhoods can still differ in quietness, budget, and transport convenience.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[420px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="rgba(255,255,255,0.12)" />
                    <PolarAngleAxis dataKey="metric" stroke="rgba(226,232,240,0.7)" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.15)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(2, 6, 23, 0.95)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '16px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                    {neighborhoods.map((neighborhood, index) => (
                      <Radar
                        key={neighborhood.slug}
                        dataKey={neighborhood.name}
                        stroke={COLORS[index % COLORS.length]}
                        fill={COLORS[index % COLORS.length]}
                        fillOpacity={0.18}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {neighborhoods.map((neighborhood) => (
              <Card key={neighborhood.slug} className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle>{neighborhood.name}</CardTitle>
                      <CardDescription>
                        {seedState.cities.find((city) => city.slug === neighborhood.citySlug)?.name}
                      </CardDescription>
                    </div>
                    <Badge>{neighborhood.priceTier}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Comfort score</div>
                    <div className="mt-2 text-3xl font-semibold text-white">
                      {Math.round(
                        (neighborhood.scores.safety +
                          neighborhood.scores.transport +
                          neighborhood.scores.walkability +
                          neighborhood.scores.foodAccess +
                          neighborhood.scores.tourismProximity +
                          neighborhood.scores.budgetFit) /
                          6
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {metrics.map(([key, label]) => (
                      <div key={key} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
                        <div className="mt-2 text-lg font-semibold text-white">{neighborhood.scores[key]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                    {neighborhood.summary}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Budget estimate</div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      {formatCurrency(neighborhood.dailyBudget.balanced)} per day
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-8 text-sm text-slate-400">
            Choose at least two neighborhoods to see a side-by-side analysis.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const COLORS = ['#22d3ee', '#3b82f6', '#10b981', '#f59e0b'];
