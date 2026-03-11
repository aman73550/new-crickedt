import { NextResponse } from 'next/server';
import { mockLiveMatches, mockUpcomingMatches } from '@/lib/data/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const matchId = params.id;
  const allMatches = [...mockLiveMatches, ...mockUpcomingMatches];
  const match = allMatches.find(m => m.id === matchId);

  if (!match) {
    return NextResponse.json(
      {
        success: false,
        error: 'Match not found',
        timestamp: new Date().toISOString(),
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: match,
    timestamp: new Date().toISOString(),
  });
}
