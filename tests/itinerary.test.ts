import { describe, expect, it } from 'vitest';

import { seedState } from '@/features/data/seed';
import { generateItinerary } from '@/features/itinerary/generate';

describe('itinerary generator', () => {
  it('builds the expected number of days and time blocks', () => {
    const itinerary = generateItinerary(seedState, 'bukhara', 'bukhara-lyabi-hauz', 'culture', 3, 'relaxed');
    expect(itinerary.days).toHaveLength(3);
    expect(itinerary.days[0].items).toHaveLength(4);
  });
});
