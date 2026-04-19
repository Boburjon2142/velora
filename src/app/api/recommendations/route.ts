import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/features/auth/auth-options';
import { getRecommendations } from '@/features/recommendation/engine';
import { mutateAppState, readAppState } from '@/features/runtime-store/store';
import { searchPreferenceSchema } from '@/lib/validators';
import { id } from '@/lib/utils';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = searchPreferenceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid search preferences' }, { status: 400 });
  }

  const state = await readAppState();
  const recommendations = getRecommendations(parsed.data, state);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (email) {
    await mutateAppState(async (current) => ({
      ...current,
      searchHistory: [
        {
          id: id('search'),
          userEmail: email,
          citySlug: parsed.data.citySlug,
          preferences: parsed.data,
          topNeighborhoodSlugs: recommendations.map((item) => item.neighborhoodSlug),
          createdAt: new Date().toISOString()
        },
        ...current.searchHistory
      ].slice(0, 50)
    }));
  }

  return NextResponse.json({
    recommendations,
    summary: {
      citySlug: parsed.data.citySlug,
      topScore: recommendations[0]?.comfortScore ?? 0,
      averageScore: Math.round(
        recommendations.reduce((sum, item) => sum + item.comfortScore, 0) / Math.max(recommendations.length, 1)
      )
    }
  });
}
