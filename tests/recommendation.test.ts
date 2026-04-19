import { describe, expect, it } from 'vitest';

import { seedState } from '@/features/data/seed';
import { getRecommendations } from '@/features/recommendation/engine';

describe('recommendation engine', () => {
  it('returns top neighborhood recommendations for a city', () => {
    const results = getRecommendations(
      {
        citySlug: 'tashkent',
        travelDates: '2026-05-01',
        tripDuration: 3,
        travelerCount: 2,
        travelerLabelId: 'business',
        budget: 'balanced',
        accommodationPreference: 'business hotel',
        priorities: {
          transport: 2,
          workInternet: 2,
          safety: 1
        },
        languagePreference: 'English',
        pace: 'balanced'
      },
      seedState
    );

    expect(results).toHaveLength(3);
    expect(results[0].comfortScore).toBeGreaterThan(results[1].comfortScore);
    expect(results[0].weightedScoreTrace.length).toBeGreaterThan(0);
  });
});
