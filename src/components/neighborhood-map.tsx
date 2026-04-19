'use client';

import 'leaflet/dist/leaflet.css';

import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Amenity, Attraction, Neighborhood } from '@/types/domain';

type FilterKey = Amenity['category'] | 'attraction';

function distanceMeters(aLat: number, aLng: number, bLat: number, bLng: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3;
  const phi1 = toRad(aLat);
  const phi2 = toRad(bLat);
  const deltaPhi = toRad(bLat - aLat);
  const deltaLambda = toRad(bLng - aLng);
  const x =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

const markerIcon = L.divIcon({
  className: 'map-marker',
  html: '<div style="width:14px;height:14px;border-radius:999px;background:linear-gradient(180deg,#22d3ee,#2563eb);border:2px solid rgba(15,23,42,0.9);box-shadow:0 0 0 6px rgba(34,211,238,0.1)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

export function NeighborhoodMap({
  neighborhood,
  amenities,
  attractions
}: {
  neighborhood: Neighborhood;
  amenities: Amenity[];
  attractions: Attraction[];
}) {
  const [filters, setFilters] = useState<Set<FilterKey>>(
    new Set(['accommodation', 'restaurant', 'attraction', 'pharmacy', 'atm', 'supermarket', 'transport'])
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
    });
  }, []);

  const visibleAmenities = useMemo(() => {
    return amenities.filter((item) => filters.has(item.category) && distanceMeters(neighborhood.latitude, neighborhood.longitude, item.latitude, item.longitude) <= item.radiusMeters);
  }, [amenities, filters, neighborhood.latitude, neighborhood.longitude]);

  const visibleAttractions = useMemo(() => {
    return attractions.filter((item) => filters.has('attraction') && distanceMeters(neighborhood.latitude, neighborhood.longitude, item.latitude, item.longitude) <= 2200);
  }, [attractions, filters, neighborhood.latitude, neighborhood.longitude]);

  const points = [
    ...visibleAmenities.map((item) => ({ ...item, type: 'amenity' as const })),
    ...visibleAttractions.map((item) => ({ ...item, type: 'attraction' as const }))
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          'accommodation',
          'restaurant',
          'attraction',
          'pharmacy',
          'hospital',
          'supermarket',
          'atm',
          'transport',
          'coworking',
          'park',
          'mosque'
        ].map((key) => {
          const active = filters.has(key as FilterKey);
          return (
            <button
              key={key}
              type="button"
              onClick={() =>
                setFilters((current) => {
                  const next = new Set(current);
                  if (next.has(key as FilterKey)) next.delete(key as FilterKey);
                  else next.add(key as FilterKey);
                  return next;
                })
              }
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'
                  : 'border-white/10 bg-white/5 text-slate-300'
              }`}
            >
              {key}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <MapContainer center={[neighborhood.latitude, neighborhood.longitude]} zoom={15} className="h-[460px] w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[neighborhood.latitude, neighborhood.longitude]} icon={markerIcon}>
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold">{neighborhood.name}</div>
                  <div>{neighborhood.tagline}</div>
                </div>
              </Popup>
            </Marker>
            {points.map((point) => (
              <Marker key={point.id} position={[point.latitude, point.longitude]} icon={markerIcon}>
                <Popup>
                  <div className="space-y-1">
                    <div className="font-semibold">{point.name}</div>
                    <div className="text-sm">{point.description}</div>
                    {'ticketHint' in point ? <div className="text-xs text-slate-500">{point.ticketHint}</div> : null}
                    {'openHours' in point ? <div className="text-xs text-slate-500">{point.openHours}</div> : null}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Nearby radius logic</div>
              <div className="mt-2 text-lg font-semibold text-white">{points.length} visible points</div>
            </div>
            <Badge>{Math.round(neighborhood.scores.walkability)} walkability</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {points.map((point) => (
              <div key={point.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-white">{point.name}</div>
                  <Badge className="bg-white/5 text-slate-200">{point.type}</Badge>
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{point.description}</div>
              </div>
            ))}
            {!points.length ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-5 text-sm text-slate-400">
                No markers match the current filters. Turn one category back on to see the map populate again.
              </div>
            ) : null}
          </div>
          <div className="mt-5">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                setFilters(new Set(['accommodation', 'restaurant', 'attraction', 'pharmacy', 'atm', 'supermarket', 'transport']))
              }
            >
              Reset filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
