import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/features/auth/auth-options';
import { generateItinerary } from '@/features/itinerary/generate';
import { mutateAppState, readAppState } from '@/features/runtime-store/store';
import { itineraryRequestSchema } from '@/lib/validators';
import { id } from '@/lib/utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ itineraries: [] });
  }

  const state = await readAppState();
  return NextResponse.json({
    itineraries: state.itineraries.filter((item) => item.userEmail === email)
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: 'Sign in required' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = itineraryRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid itinerary request' }, { status: 400 });
  }

  const state = await readAppState();
  const itinerary = generateItinerary(
    state,
    parsed.data.citySlug,
    parsed.data.neighborhoodSlug,
    parsed.data.travelerLabelId,
    parsed.data.durationDays,
    parsed.data.pace
  );

  await mutateAppState(async (current) => ({
    ...current,
    itineraries: [
      {
      ...itinerary,
      id: id('itinerary'),
        userEmail: email
      },
      ...current.itineraries
    ]
  }));

  return NextResponse.json({ itinerary: { ...itinerary, userEmail: email } });
}
