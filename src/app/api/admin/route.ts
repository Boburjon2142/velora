import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/features/auth/auth-options';
import { id } from '@/lib/utils';
import { mutateAppState, readAppState } from '@/features/runtime-store/store';

const updateCitySchema = z.object({
  slug: z.string(),
  name: z.string().min(1),
  overview: z.string().min(1),
  bestTimeToVisit: z.string().min(1)
});

const updateNeighborhoodSchema = z.object({
  slug: z.string(),
  name: z.string().min(1),
  summary: z.string().min(1),
  vibe: z.string().min(1)
});

const scoreSettingsSchema = z.record(z.string(), z.number().min(0).max(2));

const priceProfileSchema = z.object({
  citySlug: z.string().min(1),
  budgetNightly: z.number().min(1),
  balancedNightly: z.number().min(1),
  premiumNightly: z.number().min(1)
});

const testimonialSchema = z.object({
  citySlug: z.string().optional(),
  travelerLabelId: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  quote: z.string().min(1),
  rating: z.number().min(1).max(5)
});

const travelerLabelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1)
});

const amenitySchema = z.object({
  citySlug: z.string().min(1),
  neighborhoodSlug: z.string().min(1),
  name: z.string().min(1),
  category: z.enum([
    'accommodation',
    'cafe',
    'restaurant',
    'halalFood',
    'attraction',
    'pharmacy',
    'hospital',
    'supermarket',
    'atm',
    'transport',
    'coworking',
    'park',
    'mosque',
    'culturalSite'
  ]),
  description: z.string().min(1),
  address: z.string().min(1)
});

const attractionSchema = z.object({
  citySlug: z.string().min(1),
  neighborhoodSlug: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['museum', 'historic', 'park', 'market', 'food', 'viewpoint', 'religious']),
  description: z.string().min(1),
  address: z.string().min(1),
  ticketHint: z.string().min(1)
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const state = await readAppState();
  return NextResponse.json(state);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const payload = await request.json();
  const action = z.string().parse(payload.action);

  const state = await mutateAppState(async (current) => {
    switch (action) {
      case 'update-city': {
        const parsed = updateCitySchema.parse(payload.data);
        return {
          ...current,
          cities: current.cities.map((city) =>
            city.slug === parsed.slug
              ? { ...city, name: parsed.name, overview: parsed.overview, bestTimeToVisit: parsed.bestTimeToVisit }
              : city
          ),
          adminActivityLog: [
            {
              id: id('admin'),
              userEmail: email,
              action,
              entity: parsed.slug,
              details: `Updated city profile for ${parsed.name}`,
              createdAt: new Date().toISOString()
            },
            ...current.adminActivityLog
          ]
        };
      }
      case 'update-neighborhood': {
        const parsed = updateNeighborhoodSchema.parse(payload.data);
        return {
          ...current,
          neighborhoods: current.neighborhoods.map((item) =>
            item.slug === parsed.slug
              ? { ...item, name: parsed.name, summary: parsed.summary, vibe: parsed.vibe }
              : item
          ),
          adminActivityLog: [
            {
              id: id('admin'),
              userEmail: email,
              action,
              entity: parsed.slug,
              details: `Updated neighborhood profile for ${parsed.name}`,
              createdAt: new Date().toISOString()
            },
            ...current.adminActivityLog
          ]
        };
      }
      case 'update-score-settings': {
        const parsed = scoreSettingsSchema.parse(payload.data);
        return {
          ...current,
          scoreSettings: parsed,
          adminActivityLog: [
            {
              id: id('admin'),
              userEmail: email,
              action,
              entity: 'score-settings',
              details: 'Adjusted recommendation weighting settings',
              createdAt: new Date().toISOString()
            },
            ...current.adminActivityLog
          ]
        };
      }
      case 'upsert-price-profile': {
        const parsed = priceProfileSchema.parse(payload.data);
        return {
          ...current,
          priceProfiles: [
            {
              citySlug: parsed.citySlug,
              nightlyStay: {
                budget: parsed.budgetNightly,
                balanced: parsed.balancedNightly,
                premium: parsed.premiumNightly
              },
              foodPerDay: current.priceProfiles.find((item) => item.citySlug === parsed.citySlug)?.foodPerDay ?? {
                budget: 8,
                balanced: 18,
                premium: 36
              },
              transportPerDay: current.priceProfiles.find((item) => item.citySlug === parsed.citySlug)?.transportPerDay ?? {
                budget: 3,
                balanced: 7,
                premium: 14
              },
              activityPerDay: current.priceProfiles.find((item) => item.citySlug === parsed.citySlug)?.activityPerDay ?? {
                budget: 6,
                balanced: 15,
                premium: 30
              },
              emergencyBufferPercent:
                current.priceProfiles.find((item) => item.citySlug === parsed.citySlug)?.emergencyBufferPercent ?? 10
            },
            ...current.priceProfiles.filter((item) => item.citySlug !== parsed.citySlug)
          ]
        };
      }
      case 'add-testimonial': {
        const parsed = testimonialSchema.parse(payload.data);
        return {
          ...current,
          testimonials: [
            {
              id: id('testimonial'),
              ...parsed
            },
            ...current.testimonials
          ]
        };
      }
      case 'upsert-traveler-label': {
        const parsed = travelerLabelSchema.parse(payload.data);
        return {
          ...current,
          travelerLabels: [
            {
              ...parsed,
              priorities: current.travelerLabels.find((item) => item.id === parsed.id)?.priorities ?? {}
            },
            ...current.travelerLabels.filter((item) => item.id !== parsed.id)
          ]
        };
      }
      case 'add-amenity': {
        const parsed = amenitySchema.parse(payload.data);
        return {
          ...current,
          amenities: [
            {
              id: id('amenity'),
              ...parsed,
              latitude: current.neighborhoods.find((item) => item.slug === parsed.neighborhoodSlug)?.latitude ?? 0,
              longitude: current.neighborhoods.find((item) => item.slug === parsed.neighborhoodSlug)?.longitude ?? 0,
              radiusMeters: 400,
              openHours: '08:00-22:00'
            },
            ...current.amenities
          ]
        };
      }
      case 'add-attraction': {
        const parsed = attractionSchema.parse(payload.data);
        return {
          ...current,
          attractions: [
            {
              id: id('attraction'),
              ...parsed,
              latitude: current.neighborhoods.find((item) => item.slug === parsed.neighborhoodSlug)?.latitude ?? 0,
              longitude: current.neighborhoods.find((item) => item.slug === parsed.neighborhoodSlug)?.longitude ?? 0
            },
            ...current.attractions
          ]
        };
      }
      default:
        throw new Error(`Unsupported admin action: ${action}`);
    }
  });

  return NextResponse.json({ state });
}
