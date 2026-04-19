import { seedState } from '@/features/data/seed';
import type {
  AppState,
  Neighborhood,
  RecommendationResult,
  SearchPreference,
  TravelerLabel
} from '@/types/domain';
import { clamp } from '@/lib/utils';

const metricLabels: Record<keyof RecommendationResult['metricBreakdown'], string> = {
  safety: 'Safety',
  transport: 'Transport',
  walkability: 'Walkability',
  foodAccess: 'Food access',
  tourismProximity: 'Tourism proximity',
  budgetFit: 'Budget fit',
  familyFriendliness: 'Family comfort',
  quietness: 'Quietness',
  workInternet: 'Work and internet',
  nightlife: 'Nightlife',
  emergencyAccess: 'Emergency access',
  greenAreas: 'Green areas',
  airportAccess: 'Airport access',
  halalFood: 'Halal food',
  coworkingAccess: 'Coworking',
  shopping: 'Shopping',
  culturalAccess: 'Cultural access'
};

function labelForTraveler(state: AppState, travelerLabelId: string): TravelerLabel | undefined {
  return state.travelerLabels.find((label) => label.id === travelerLabelId);
}

function weightedAverage(values: Array<{ value: number; weight: number }>) {
  const totalWeight = values.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight === 0) return 0;
  return values.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight;
}

function composeWeights(prefs: SearchPreference, travelerLabel?: TravelerLabel) {
  const weights: Record<string, number> = { ...seedState.scoreSettings };
  for (const [key, value] of Object.entries(travelerLabel?.priorities ?? {})) {
    weights[key] = (weights[key] ?? 1) + value;
  }
  for (const [key, value] of Object.entries(prefs.priorities ?? {})) {
    weights[key] = (weights[key] ?? 1) + value * 1.6;
  }
  if (prefs.budget === 'budget') {
    weights.budgetFit = (weights.budgetFit ?? 1) + 1.4;
    weights.transport = (weights.transport ?? 1) + 0.2;
  }
  if (prefs.budget === 'premium') {
    weights.workInternet = (weights.workInternet ?? 1) + 0.2;
    weights.shopping = (weights.shopping ?? 1) + 0.2;
  }
  if (prefs.pace === 'relaxed') {
    weights.quietness = (weights.quietness ?? 1) + 0.5;
  }
  if (prefs.pace === 'fast') {
    weights.transport = (weights.transport ?? 1) + 0.4;
    weights.tourismProximity = (weights.tourismProximity ?? 1) + 0.3;
  }
  return weights;
}

function explanationForNeighborhood(
  neighborhood: Neighborhood,
  preference: SearchPreference,
  travelerLabel?: TravelerLabel
) {
  const strengths = Object.entries(neighborhood.scores)
    .filter(([, value]) => value >= 80)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => metricLabels[key as keyof RecommendationResult['metricBreakdown']]);

  const tradeoffs = Object.entries(neighborhood.scores)
    .filter(([, value]) => value <= 65)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => metricLabels[key as keyof RecommendationResult['metricBreakdown']]);

  const labelText = travelerLabel ? travelerLabel.name.toLowerCase() : 'your profile';
  const budgetText =
    preference.budget === 'budget'
      ? 'value-friendly'
      : preference.budget === 'premium'
        ? 'premium'
        : 'balanced';

  return {
    strengths,
    tradeoffs,
    rationale: `${neighborhood.name} fits ${labelText} well because it combines ${strengths[0] ?? 'solid comfort'} with a ${budgetText} cost profile. ${neighborhood.transitNotes} ${neighborhood.foodNotes}`
  };
}

export function scoreNeighborhood(
  neighborhood: Neighborhood,
  preference: SearchPreference,
  state: AppState = seedState
): RecommendationResult {
  const travelerLabel = labelForTraveler(state, preference.travelerLabelId);
  const weights = composeWeights(preference, travelerLabel);
  const scoreEntries = Object.entries(neighborhood.scores) as Array<
    [keyof RecommendationResult['metricBreakdown'], number]
  >;

  const comfortScore = clamp(
    weightedAverage(
      scoreEntries.map(([key, value]) => ({
        value,
        weight: weights[key] ?? 1
      }))
    )
  );

  const weightedScores = scoreEntries.map(([key, value]) => ({
    key,
    value,
    weighted: value * (weights[key] ?? 1)
  }));
  const explanation = explanationForNeighborhood(neighborhood, preference, travelerLabel);
  const priceEstimate =
    neighborhood.dailyBudget[preference.budget] * preference.tripDuration * preference.travelerCount;

  return {
    neighborhoodSlug: neighborhood.slug,
    comfortScore: Math.round(comfortScore),
    metricBreakdown: neighborhood.scores,
    strengths: explanation.strengths,
    tradeoffs: explanation.tradeoffs,
    rationale: explanation.rationale,
    priceEstimate: Math.round(priceEstimate),
    weightedScoreTrace: weightedScores
      .sort((a, b) => b.weighted - a.weighted)
      .slice(0, 4)
      .map((item) => `${metricLabels[item.key]} contributes strongly`)
  } as RecommendationResult & { weightedScoreTrace: string[] };
}

export function getRecommendations(
  preference: SearchPreference,
  state: AppState = seedState
): Array<RecommendationResult & { weightedScoreTrace: string[] }> {
  return state.neighborhoods
    .filter((neighborhood) => neighborhood.citySlug === preference.citySlug)
    .map((neighborhood) => scoreNeighborhood(neighborhood, preference, state))
    .sort((a, b) => b.comfortScore - a.comfortScore)
    .slice(0, 3);
}

export function recommendationSummary(
  preferences: SearchPreference,
  results: Array<RecommendationResult & { weightedScoreTrace: string[] }>
) {
  const strongest = results[0];
  const cityAverage = results.reduce((sum, item) => sum + item.comfortScore, 0) / results.length;
  return {
    headline: strongest
      ? `Top match: ${strongest.neighborhoodSlug.replace(/-/g, ' ')}`
      : 'No recommendation available',
    averageScore: Math.round(cityAverage),
    bestScore: strongest?.comfortScore ?? 0,
    citySlug: preferences.citySlug
  };
}
