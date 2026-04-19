import { z } from 'zod';

export const scoreProfileSchema = z.object({
  safety: z.number().min(0).max(100),
  transport: z.number().min(0).max(100),
  walkability: z.number().min(0).max(100),
  foodAccess: z.number().min(0).max(100),
  tourismProximity: z.number().min(0).max(100),
  budgetFit: z.number().min(0).max(100),
  familyFriendliness: z.number().min(0).max(100),
  quietness: z.number().min(0).max(100),
  workInternet: z.number().min(0).max(100),
  nightlife: z.number().min(0).max(100),
  emergencyAccess: z.number().min(0).max(100),
  greenAreas: z.number().min(0).max(100),
  airportAccess: z.number().min(0).max(100),
  halalFood: z.number().min(0).max(100),
  coworkingAccess: z.number().min(0).max(100),
  shopping: z.number().min(0).max(100),
  culturalAccess: z.number().min(0).max(100)
});

export const searchPreferenceSchema = z.object({
  citySlug: z.string().min(1),
  travelDates: z.string().min(1),
  tripDuration: z.number().min(1).max(30),
  travelerCount: z.number().min(1).max(12),
  travelerLabelId: z.string().min(1),
  budget: z.enum(['budget', 'balanced', 'premium']),
  accommodationPreference: z.string().min(1),
  priorities: z.record(z.string(), z.number().min(0).max(2)).default({}),
  languagePreference: z.string().min(1),
  pace: z.enum(['relaxed', 'balanced', 'fast'])
});

export const itineraryRequestSchema = z.object({
  citySlug: z.string().min(1),
  neighborhoodSlug: z.string().min(1),
  travelerLabelId: z.string().min(1),
  durationDays: z.union([z.literal(1), z.literal(3), z.literal(5)]),
  pace: z.enum(['relaxed', 'balanced', 'fast'])
});

export const budgetRequestSchema = z.object({
  citySlug: z.string().min(1),
  neighborhoodSlug: z.string().min(1),
  durationDays: z.number().min(1).max(30),
  travelerCount: z.number().min(1).max(12),
  budgetStyle: z.enum(['budget', 'balanced', 'premium'])
});
