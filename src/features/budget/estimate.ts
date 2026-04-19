import type { AppState, PriceProfile } from '@/types/domain';
import { seedState } from '@/features/data/seed';

export type BudgetStyle = 'budget' | 'balanced' | 'premium';

export type BudgetEstimate = {
  stayCost: number;
  foodCost: number;
  transportCost: number;
  activityCost: number;
  emergencyBuffer: number;
  total: number;
  dailyAverage: number;
};

function getPriceProfile(state: AppState, citySlug: string): PriceProfile {
  return state.priceProfiles.find((item) => item.citySlug === citySlug) ?? seedState.priceProfiles[0];
}

const styleMultipliers: Record<BudgetStyle, number> = {
  budget: 0.82,
  balanced: 1,
  premium: 1.45
};

export function estimateBudget(
  state: AppState,
  citySlug: string,
  neighborhoodSlug: string,
  durationDays: number,
  travelerCount: number,
  style: BudgetStyle
): BudgetEstimate {
  const priceProfile = getPriceProfile(state, citySlug);
  const neighborhood = state.neighborhoods.find((item) => item.slug === neighborhoodSlug);
  const multiplier = styleMultipliers[style];
  const nightly = Math.round((neighborhood?.dailyBudget?.[style] ?? priceProfile.nightlyStay[style]) * multiplier);
  const stayCost = nightly * durationDays * travelerCount;
  const foodCost = Math.round(priceProfile.foodPerDay[style] * durationDays * travelerCount * multiplier);
  const transportCost = Math.round(priceProfile.transportPerDay[style] * durationDays * travelerCount * multiplier);
  const activityCost = Math.round(priceProfile.activityPerDay[style] * durationDays * travelerCount * multiplier);
  const subtotal = stayCost + foodCost + transportCost + activityCost;
  const emergencyBuffer = Math.round(subtotal * (priceProfile.emergencyBufferPercent / 100));
  const total = subtotal + emergencyBuffer;

  return {
    stayCost,
    foodCost,
    transportCost,
    activityCost,
    emergencyBuffer,
    total,
    dailyAverage: Math.round(total / durationDays)
  };
}
