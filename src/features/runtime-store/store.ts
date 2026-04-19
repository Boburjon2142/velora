import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { seedState } from '@/features/data/seed';
import type {
  AdminActivityLog,
  AppState,
  City,
  Neighborhood,
  PriceProfile,
  SavedNeighborhood,
  SavedPlan,
  SearchHistoryItem,
  Testimonial,
  TravelerLabel
} from '@/types/domain';

const dataDir = path.join(process.cwd(), '.data');
const stateFile = path.join(dataDir, 'runtime-state.json');

const emptyState: AppState = {
  ...seedState,
  savedNeighborhoods: [],
  savedPlans: [],
  searchHistory: [],
  itineraries: [],
  adminActivityLog: []
};

let writeLock: Promise<void> = Promise.resolve();

async function ensureStoreFile() {
  try {
    await readFile(stateFile, 'utf8');
  } catch {
    await mkdir(dataDir, { recursive: true });
    await writeFile(stateFile, JSON.stringify(seedState, null, 2), 'utf8');
  }
}

export async function readAppState(): Promise<AppState> {
  await ensureStoreFile();
  const content = await readFile(stateFile, 'utf8');
  const parsed = JSON.parse(content) as Partial<AppState>;

  return {
    ...seedState,
    ...parsed,
    users: parsed.users ?? seedState.users,
    cities: parsed.cities ?? seedState.cities,
    neighborhoods: parsed.neighborhoods ?? seedState.neighborhoods,
    amenities: parsed.amenities ?? seedState.amenities,
    attractions: parsed.attractions ?? seedState.attractions,
    priceProfiles: parsed.priceProfiles ?? seedState.priceProfiles,
    scoreSettings: parsed.scoreSettings ?? seedState.scoreSettings,
    travelerLabels: parsed.travelerLabels ?? seedState.travelerLabels,
    testimonials: parsed.testimonials ?? seedState.testimonials,
    savedNeighborhoods: parsed.savedNeighborhoods ?? emptyState.savedNeighborhoods,
    savedPlans: parsed.savedPlans ?? emptyState.savedPlans,
    searchHistory: parsed.searchHistory ?? emptyState.searchHistory,
    itineraries: parsed.itineraries ?? emptyState.itineraries,
    adminActivityLog: parsed.adminActivityLog ?? emptyState.adminActivityLog
  };
}

export async function writeAppState(state: AppState) {
  await ensureStoreFile();
  await writeFile(stateFile, JSON.stringify(state, null, 2), 'utf8');
}

export async function mutateAppState(
  updater: (state: AppState) => AppState | Promise<AppState>
): Promise<AppState> {
  let nextState: AppState = emptyState;

  writeLock = writeLock.then(async () => {
    const current = await readAppState();
    nextState = await updater(current);
    await writeAppState(nextState);
  });

  await writeLock;
  return nextState;
}

export async function seedRuntimeState() {
  await writeAppState(seedState);
  return seedState;
}

export async function getCities() {
  const state = await readAppState();
  return state.cities;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const state = await readAppState();
  return state.cities.find((city) => city.slug === slug);
}

export async function getNeighborhoodBySlug(slug: string): Promise<Neighborhood | undefined> {
  const state = await readAppState();
  return state.neighborhoods.find((neighborhood) => neighborhood.slug === slug);
}

export async function getNeighborhoodsByCitySlug(citySlug: string): Promise<Neighborhood[]> {
  const state = await readAppState();
  return state.neighborhoods.filter((neighborhood) => neighborhood.citySlug === citySlug);
}

export async function getPriceProfile(citySlug: string): Promise<PriceProfile | undefined> {
  const state = await readAppState();
  return state.priceProfiles.find((profile) => profile.citySlug === citySlug);
}

export async function getTestimonials(citySlug?: string): Promise<Testimonial[]> {
  const state = await readAppState();
  return citySlug
    ? state.testimonials.filter((testimonial) => testimonial.citySlug === citySlug)
    : state.testimonials;
}

export async function getTravelerLabels(): Promise<TravelerLabel[]> {
  const state = await readAppState();
  return state.travelerLabels;
}

export async function getSavedNeighborhoods(userEmail: string): Promise<SavedNeighborhood[]> {
  const state = await readAppState();
  return state.savedNeighborhoods.filter((item) => item.userEmail === userEmail);
}

export async function getSavedPlans(userEmail: string): Promise<SavedPlan[]> {
  const state = await readAppState();
  return state.savedPlans.filter((item) => item.userEmail === userEmail);
}

export async function getSearchHistory(userEmail: string): Promise<SearchHistoryItem[]> {
  const state = await readAppState();
  return state.searchHistory.filter((item) => item.userEmail === userEmail);
}

export async function getAdminLogs(): Promise<AdminActivityLog[]> {
  const state = await readAppState();
  return state.adminActivityLog;
}
