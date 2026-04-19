import { seedState } from '@/features/data/seed';
import type { AppState, Itinerary, ItineraryDay, Neighborhood } from '@/types/domain';
import { id } from '@/lib/utils';

function pick(items: string[], index: number, fallback: string) {
  return items[index % items.length] ?? fallback;
}

function foodStop(neighborhood: Neighborhood) {
  return neighborhood.foodNotes.split('.')[0] ?? `Local dining near ${neighborhood.name}`;
}

function buildDay(
  neighborhood: Neighborhood,
  dayNumber: number,
  pace: Itinerary['pace'],
  attractions: string[]
): ItineraryDay {
  const morningFocus = pick(attractions, dayNumber - 1, neighborhood.nearbyLandmarks[0] ?? neighborhood.name);
  const afternoonFocus = pick(attractions, dayNumber, neighborhood.nearbyLandmarks[1] ?? morningFocus);
  const eveningFocus =
    pace === 'relaxed'
      ? neighborhood.tradeoffs.includes('Less nightlife than the city center')
        ? 'Calm dinner and early rest'
        : 'Tea house or hotel lounge'
      : `Flexible evening walk near ${neighborhood.name}`;

  return {
    day: dayNumber,
    theme:
      dayNumber === 1
        ? `Arrival and orientation in ${neighborhood.name}`
        : dayNumber === 3
          ? `Deep-dive culture and local rhythm`
          : `Comfortable final day with practical wrap-up`,
    items: [
      {
        time: '08:30',
        title: 'Morning orientation',
        detail: `${morningFocus} with a slow start and a clear neighborhood walk.`,
        tip: `Keep the first hour light so you can understand the pacing of ${neighborhood.name}.`
      },
      {
        time: '12:30',
        title: 'Lunch and services check',
        detail: `${foodStop(neighborhood)} followed by a quick look at nearby pharmacies, ATMs, and transport points.`,
        tip: 'Confirm your return ride before the area becomes busier.'
      },
      {
        time: '16:00',
        title: 'Afternoon highlight',
        detail: `${afternoonFocus} plus a coffee or tea stop that matches the neighborhood rhythm.`,
        tip: 'Leave a buffer if you are in a walking-heavy heritage area.'
      },
      {
        time: '19:30',
        title: 'Evening comfort block',
        detail: eveningFocus,
        tip: 'Choose a well-lit route back to your stay and keep the final activity near the accommodation.'
      }
    ]
  };
}

export function generateItinerary(
  state: AppState,
  citySlug: string,
  neighborhoodSlug: string,
  travelerLabelId: string,
  durationDays: 1 | 3 | 5,
  pace: Itinerary['pace']
): Itinerary {
  const neighborhood = state.neighborhoods.find((item) => item.slug === neighborhoodSlug) ?? seedState.neighborhoods[0];
  const attractions = state.attractions
    .filter((item) => item.citySlug === citySlug && item.neighborhoodSlug === neighborhood.slug)
    .map((item) => item.name);

  const days: ItineraryDay[] = Array.from({ length: durationDays }, (_, index) =>
    buildDay(neighborhood, index + 1, pace, attractions)
  );

  return {
    id: id('itinerary'),
    citySlug,
    neighborhoodSlug: neighborhood.slug,
    travelerLabelId,
    title: `${durationDays}-day plan for ${neighborhood.name}`,
    durationDays,
    pace,
    createdAt: new Date().toISOString(),
    days
  };
}
