import { NextResponse } from 'next/server';
import { 
  mockWinProbabilityTimeline, 
  mockPressureIndexData, 
  mockMomentumShifts, 
  mockTurningPoints,
  mockImpactPlayers,
} from '@/lib/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get('matchId');
  const type = searchParams.get('type');

  if (!matchId) {
    return NextResponse.json(
      {
        success: false,
        error: 'matchId is required',
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }

  let data: any;

  switch (type) {
    case 'win-probability':
      data = mockWinProbabilityTimeline;
      break;
    case 'pressure-index':
      data = mockPressureIndexData;
      break;
    case 'momentum':
      data = mockMomentumShifts;
      break;
    case 'turning-points':
      data = mockTurningPoints;
      break;
    case 'impact-players':
      data = mockImpactPlayers;
      break;
    default:
      data = {
        winProbability: mockWinProbabilityTimeline,
        pressureIndex: mockPressureIndexData,
        momentumShifts: mockMomentumShifts,
        turningPoints: mockTurningPoints,
        impactPlayers: mockImpactPlayers,
      };
  }

  return NextResponse.json({
    success: true,
    data,
    matchId,
    timestamp: new Date().toISOString(),
  });
}
