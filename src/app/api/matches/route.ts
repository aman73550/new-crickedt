import { NextResponse } from 'next/server';
import { mockLiveMatches, mockUpcomingMatches } from '@/lib/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let matches = [...mockLiveMatches, ...mockUpcomingMatches];

  if (status === 'live') {
    matches = mockLiveMatches;
  } else if (status === 'upcoming') {
    matches = mockUpcomingMatches;
  }

  return NextResponse.json({
    success: true,
    data: matches,
    timestamp: new Date().toISOString(),
  });
}
