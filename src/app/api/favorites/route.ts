import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/features/auth/auth-options';
import { id } from '@/lib/utils';
import { mutateAppState, readAppState } from '@/features/runtime-store/store';
import { z } from 'zod';

const saveSchema = z.object({
  neighborhoodSlug: z.string().min(1)
});

const planSchema = z.object({
  citySlug: z.string().min(1),
  neighborhoodSlug: z.string().min(1),
  itineraryId: z.string().min(1),
  title: z.string().min(1)
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ savedNeighborhoods: [], savedPlans: [], history: [] });
  }

  const state = await readAppState();
  return NextResponse.json({
    savedNeighborhoods: state.savedNeighborhoods.filter((item) => item.userEmail === email),
    savedPlans: state.savedPlans.filter((item) => item.userEmail === email),
    history: state.searchHistory.filter((item) => item.userEmail === email)
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: 'Sign in required' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = saveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid neighborhood' }, { status: 400 });
  }

  const state = await mutateAppState(async (current) => {
    const existing = current.savedNeighborhoods.find(
      (item) => item.userEmail === email && item.neighborhoodSlug === parsed.data.neighborhoodSlug
    );
    return {
      ...current,
      savedNeighborhoods: existing
        ? current.savedNeighborhoods
        : [
            {
              id: id('saved-neighborhood'),
              userEmail: email,
              neighborhoodSlug: parsed.data.neighborhoodSlug,
              createdAt: new Date().toISOString()
            },
            ...current.savedNeighborhoods
          ]
    };
  });

  return NextResponse.json({
    savedNeighborhoods: state.savedNeighborhoods.filter((item) => item.userEmail === email)
  });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: 'Sign in required' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = planSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid saved plan' }, { status: 400 });
  }

  const state = await mutateAppState(async (current) => ({
    ...current,
    savedPlans: [
      {
        id: id('saved-plan'),
        userEmail: email,
        citySlug: parsed.data.citySlug,
        neighborhoodSlug: parsed.data.neighborhoodSlug,
        itineraryId: parsed.data.itineraryId,
        title: parsed.data.title,
        createdAt: new Date().toISOString()
      },
      ...current.savedPlans.filter((item) => item.userEmail !== email || item.itineraryId !== parsed.data.itineraryId)
    ]
  }));

  return NextResponse.json({
    savedPlans: state.savedPlans.filter((item) => item.userEmail === email)
  });
}
