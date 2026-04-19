import { describe, expect, it } from 'vitest';

import { seedState } from '@/features/data/seed';
import { estimateBudget } from '@/features/budget/estimate';

describe('budget estimator', () => {
  it('calculates a realistic total budget', () => {
    const estimate = estimateBudget(seedState, 'samarkand', 'samarkand-registan-quarter', 3, 2, 'balanced');
    expect(estimate.total).toBeGreaterThan(0);
    expect(estimate.dailyAverage).toBeGreaterThan(estimate.foodCost / 3);
  });
});
