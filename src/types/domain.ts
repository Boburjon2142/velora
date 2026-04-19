export type TravelerRole = 'traveler' | 'admin';

export type City = {
  slug: string;
  name: string;
  country: string;
  region: string;
  overview: string;
  heroTagline: string;
  bestTimeToVisit: string;
  averageDailyBudget: {
    budget: number;
    balanced: number;
    premium: number;
  };
  transportOverview: string;
  comfortSummary: string;
  travelerCategories: string[];
  zones: string[];
  highlights: string[];
  emergencyAccess: string;
  latitude: number;
  longitude: number;
};

export type ScoreProfile = {
  safety: number;
  transport: number;
  walkability: number;
  foodAccess: number;
  tourismProximity: number;
  budgetFit: number;
  familyFriendliness: number;
  quietness: number;
  workInternet: number;
  nightlife: number;
  emergencyAccess: number;
  greenAreas: number;
  airportAccess: number;
  halalFood: number;
  coworkingAccess: number;
  shopping: number;
  culturalAccess: number;
};

export type PriceProfile = {
  citySlug: string;
  nightlyStay: {
    budget: number;
    balanced: number;
    premium: number;
  };
  foodPerDay: {
    budget: number;
    balanced: number;
    premium: number;
  };
  transportPerDay: {
    budget: number;
    balanced: number;
    premium: number;
  };
  activityPerDay: {
    budget: number;
    balanced: number;
    premium: number;
  };
  emergencyBufferPercent: number;
};

export type Neighborhood = {
  slug: string;
  citySlug: string;
  name: string;
  tagline: string;
  summary: string;
  bestFor: string[];
  tradeoffs: string[];
  vibe: string;
  priceTier: 'budget' | 'balanced' | 'premium';
  nearbyLandmarks: string[];
  latitude: number;
  longitude: number;
  transitNotes: string;
  dailyBudget: {
    budget: number;
    balanced: number;
    premium: number;
  };
  scores: ScoreProfile;
  amenities: string[];
  attractions: string[];
  foodNotes: string;
  safetyNotes: string;
  internetNotes: string;
};

export type AmenityCategory =
  | 'accommodation'
  | 'cafe'
  | 'restaurant'
  | 'halalFood'
  | 'attraction'
  | 'pharmacy'
  | 'hospital'
  | 'supermarket'
  | 'atm'
  | 'transport'
  | 'coworking'
  | 'park'
  | 'mosque'
  | 'culturalSite';

export type Amenity = {
  id: string;
  citySlug: string;
  neighborhoodSlug: string;
  name: string;
  category: AmenityCategory;
  description: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  address: string;
  openHours: string;
};

export type Attraction = {
  id: string;
  citySlug: string;
  neighborhoodSlug: string;
  name: string;
  category: 'museum' | 'historic' | 'park' | 'market' | 'food' | 'viewpoint' | 'religious';
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  ticketHint: string;
};

export type TravelerLabel = {
  id: string;
  name: string;
  description: string;
  priorities: Partial<Record<keyof ScoreProfile, number>>;
};

export type Testimonial = {
  id: string;
  citySlug?: string;
  travelerLabelId: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
};

export type SearchPreference = {
  citySlug: string;
  travelDates: string;
  tripDuration: number;
  travelerCount: number;
  travelerLabelId: string;
  budget: 'budget' | 'balanced' | 'premium';
  accommodationPreference: string;
  priorities: Partial<Record<keyof ScoreProfile, number>>;
  languagePreference: string;
  pace: 'relaxed' | 'balanced' | 'fast';
};

export type RecommendationResult = {
  neighborhoodSlug: string;
  comfortScore: number;
  metricBreakdown: ScoreProfile;
  strengths: string[];
  tradeoffs: string[];
  rationale: string;
  priceEstimate: number;
  weightedScoreTrace: string[];
};

export type SavedNeighborhood = {
  id: string;
  userEmail: string;
  neighborhoodSlug: string;
  createdAt: string;
};

export type SavedPlan = {
  id: string;
  userEmail: string;
  citySlug: string;
  neighborhoodSlug: string;
  itineraryId: string;
  title: string;
  createdAt: string;
};

export type SearchHistoryItem = {
  id: string;
  userEmail: string;
  citySlug: string;
  preferences: SearchPreference;
  topNeighborhoodSlugs: string[];
  createdAt: string;
};

export type ItineraryItem = {
  time: string;
  title: string;
  detail: string;
  tip: string;
};

export type ItineraryDay = {
  day: number;
  theme: string;
  items: ItineraryItem[];
};

export type Itinerary = {
  id: string;
  userEmail?: string;
  citySlug: string;
  neighborhoodSlug: string;
  travelerLabelId: string;
  title: string;
  durationDays: 1 | 3 | 5;
  pace: 'relaxed' | 'balanced' | 'fast';
  createdAt: string;
  days: ItineraryDay[];
};

export type AdminActivityLog = {
  id: string;
  userEmail: string;
  action: string;
  entity: string;
  details: string;
  createdAt: string;
};

export type AppUser = {
  email: string;
  name: string;
  role: TravelerRole;
  citySlug?: string;
  password: string;
};

export type AppState = {
  users: AppUser[];
  cities: City[];
  neighborhoods: Neighborhood[];
  amenities: Amenity[];
  attractions: Attraction[];
  priceProfiles: PriceProfile[];
  scoreSettings: Record<keyof ScoreProfile, number>;
  travelerLabels: TravelerLabel[];
  testimonials: Testimonial[];
  savedNeighborhoods: SavedNeighborhood[];
  savedPlans: SavedPlan[];
  searchHistory: SearchHistoryItem[];
  itineraries: Itinerary[];
  adminActivityLog: AdminActivityLog[];
};
