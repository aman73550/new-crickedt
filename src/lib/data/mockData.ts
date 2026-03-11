import { Match, Player, WinProbability, PressureIndex, MomentumShift, TurningPoint, ImpactPlayer, PredictionPoll } from '@/types/cricket';

// Mock Teams
export const mockTeams = {
  ind: {
    id: 'ind',
    name: 'India',
    shortName: 'IND',
    logo: '/teams/india.png',
    color: '#0066B3',
  },
  aus: {
    id: 'aus',
    name: 'Australia',
    shortName: 'AUS',
    logo: '/teams/australia.png',
    color: '#FFCD00',
  },
  eng: {
    id: 'eng',
    name: 'England',
    shortName: 'ENG',
    logo: '/teams/england.png',
    color: '#CF142B',
  },
  pak: {
    id: 'pak',
    name: 'Pakistan',
    shortName: 'PAK',
    logo: '/teams/pakistan.png',
    color: '#01411C',
  },
  sa: {
    id: 'sa',
    name: 'South Africa',
    shortName: 'SA',
    logo: '/teams/south-africa.png',
    color: '#007749',
  },
  nz: {
    id: 'nz',
    name: 'New Zealand',
    shortName: 'NZ',
    logo: '/teams/new-zealand.png',
    color: '#000000',
  },
};

// Mock Live Matches
export const mockLiveMatches: Match[] = [
  {
    id: 'match-1',
    name: 'India vs Australia - 3rd T20I',
    status: 'live',
    format: 'T20',
    venue: {
      id: 'venue-1',
      name: 'M. Chinnaswamy Stadium',
      city: 'Bangalore',
      country: 'India',
      capacity: 40000,
    },
    startTime: new Date().toISOString(),
    teams: {
      home: mockTeams.ind,
      away: mockTeams.aus,
    },
    toss: {
      winner: 'India',
      decision: 'bat',
    },
    innings: [
      {
        number: 1,
        battingTeamId: 'ind',
        bowlingTeamId: 'aus',
        runs: 187,
        wickets: 5,
        overs: 20,
        balls: 0,
        extras: { total: 12, byes: 2, legByes: 3, wides: 5, noBalls: 2, penalty: 0 },
        runRate: 9.35,
        partnerships: [],
        batsmen: [],
        bowlers: [],
        fallOfWickets: [],
        overByOver: [],
      },
      {
        number: 2,
        battingTeamId: 'aus',
        bowlingTeamId: 'ind',
        runs: 142,
        wickets: 4,
        overs: 16,
        balls: 3,
        extras: { total: 8, byes: 1, legByes: 2, wides: 4, noBalls: 1, penalty: 0 },
        runRate: 8.68,
        target: 188,
        requiredRunRate: 12.55,
        partnerships: [],
        batsmen: [
          {
            playerId: 'p1',
            name: 'M. Marsh',
            runs: 45,
            balls: 32,
            fours: 4,
            sixes: 2,
            strikeRate: 140.63,
            isOut: false,
            isOnStrike: true,
          },
          {
            playerId: 'p2',
            name: 'G. Maxwell',
            runs: 38,
            balls: 21,
            fours: 3,
            sixes: 3,
            strikeRate: 180.95,
            isOut: false,
            isOnStrike: false,
          },
        ],
        bowlers: [
          {
            playerId: 'b1',
            name: 'J. Bumrah',
            overs: 4,
            maidens: 0,
            runs: 28,
            wickets: 2,
            economy: 7.0,
            dots: 10,
            fours: 2,
            sixes: 1,
            wides: 1,
            noBalls: 0,
          },
        ],
        fallOfWickets: [],
        overByOver: [],
      },
    ],
    currentInnings: 2,
  },
  {
    id: 'match-2',
    name: 'England vs Pakistan - 2nd ODI',
    status: 'live',
    format: 'ODI',
    venue: {
      id: 'venue-2',
      name: "Lord's Cricket Ground",
      city: 'London',
      country: 'England',
      capacity: 30000,
    },
    startTime: new Date().toISOString(),
    teams: {
      home: mockTeams.eng,
      away: mockTeams.pak,
    },
    toss: {
      winner: 'Pakistan',
      decision: 'bowl',
    },
    innings: [
      {
        number: 1,
        battingTeamId: 'eng',
        bowlingTeamId: 'pak',
        runs: 234,
        wickets: 6,
        overs: 42,
        balls: 3,
        extras: { total: 15, byes: 4, legByes: 5, wides: 4, noBalls: 2, penalty: 0 },
        runRate: 5.53,
        partnerships: [],
        batsmen: [
          {
            playerId: 'p3',
            name: 'J. Buttler',
            runs: 87,
            balls: 76,
            fours: 8,
            sixes: 3,
            strikeRate: 114.47,
            isOut: false,
            isOnStrike: true,
          },
        ],
        bowlers: [],
        fallOfWickets: [],
        overByOver: [],
      },
    ],
    currentInnings: 1,
  },
  {
    id: 'match-3',
    name: 'South Africa vs New Zealand - 1st Test Day 3',
    status: 'live',
    format: 'Test',
    venue: {
      id: 'venue-3',
      name: 'Newlands',
      city: 'Cape Town',
      country: 'South Africa',
      capacity: 25000,
    },
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    teams: {
      home: mockTeams.sa,
      away: mockTeams.nz,
    },
    toss: {
      winner: 'South Africa',
      decision: 'bat',
    },
    innings: [
      {
        number: 1,
        battingTeamId: 'sa',
        bowlingTeamId: 'nz',
        runs: 312,
        wickets: 10,
        overs: 98,
        balls: 4,
        extras: { total: 18, byes: 5, legByes: 8, wides: 3, noBalls: 2, penalty: 0 },
        runRate: 3.18,
        partnerships: [],
        batsmen: [],
        bowlers: [],
        fallOfWickets: [],
        overByOver: [],
      },
      {
        number: 2,
        battingTeamId: 'nz',
        bowlingTeamId: 'sa',
        runs: 245,
        wickets: 7,
        overs: 78,
        balls: 2,
        extras: { total: 12, byes: 3, legByes: 4, wides: 3, noBalls: 2, penalty: 0 },
        runRate: 3.14,
        partnerships: [],
        batsmen: [],
        bowlers: [],
        fallOfWickets: [],
        overByOver: [],
      },
    ],
    currentInnings: 2,
  },
];

// Mock Upcoming Matches
export const mockUpcomingMatches: Match[] = [
  {
    id: 'match-4',
    name: 'India vs Australia - 4th T20I',
    status: 'upcoming',
    format: 'T20',
    venue: {
      id: 'venue-4',
      name: 'Wankhede Stadium',
      city: 'Mumbai',
      country: 'India',
    },
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    teams: {
      home: mockTeams.ind,
      away: mockTeams.aus,
    },
    innings: [],
  },
  {
    id: 'match-5',
    name: 'England vs Pakistan - 3rd ODI',
    status: 'upcoming',
    format: 'ODI',
    venue: {
      id: 'venue-5',
      name: 'The Oval',
      city: 'London',
      country: 'England',
    },
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    teams: {
      home: mockTeams.eng,
      away: mockTeams.pak,
    },
    innings: [],
  },
];

// Mock Win Probability Timeline
export const mockWinProbabilityTimeline: WinProbability[] = Array.from({ length: 100 }, (_, i) => {
  const over = Math.floor(i / 6);
  const ball = i % 6;
  const baseProb = 50;
  const variation = Math.sin(i * 0.1) * 15 + Math.random() * 10 - 5;
  const team1Prob = Math.max(5, Math.min(95, baseProb + variation + (i > 50 ? -10 : 10)));
  
  return {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over,
    ball,
    team1: {
      id: 'ind',
      probability: team1Prob,
    },
    team2: {
      id: 'aus',
      probability: 100 - team1Prob,
    },
    factors: [
      { name: 'Current Run Rate', impact: 15, description: 'Above required rate' },
      { name: 'Wickets in Hand', impact: 20, description: '6 wickets remaining' },
    ],
  };
});

// Mock Pressure Index Data
export const mockPressureIndexData: PressureIndex[] = Array.from({ length: 20 }, (_, i) => ({
  matchId: 'match-1',
  timestamp: new Date().toISOString(),
  over: i,
  value: 30 + Math.random() * 50 + (i > 15 ? 20 : 0),
  level: i > 17 ? 'critical' : i > 14 ? 'high' : i > 8 ? 'medium' : 'low',
  factors: [
    { name: 'Required Run Rate', contribution: 35, description: 'Rising above 10' },
    { name: 'Recent Wickets', contribution: 25, description: '2 wickets in last 3 overs' },
    { name: 'Batting Depth', contribution: 20, description: 'Limited batting to come' },
    { name: 'Bowling Quality', contribution: 20, description: 'Top bowler has overs left' },
  ],
}));

// Mock Momentum Shifts
export const mockMomentumShifts: MomentumShift[] = [
  {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over: 4,
    ball: 3,
    direction: 'team2',
    magnitude: 65,
    trigger: 'Wicket',
    description: 'Key wicket of opener shifts momentum to bowling team',
  },
  {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over: 8,
    ball: 1,
    direction: 'team1',
    magnitude: 72,
    trigger: 'Partnership',
    description: '50-run partnership brings batting team back in the game',
  },
  {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over: 14,
    ball: 5,
    direction: 'team2',
    magnitude: 80,
    trigger: 'Double Wicket',
    description: 'Two wickets in two balls creates major momentum shift',
  },
];

// Mock Turning Points
export const mockTurningPoints: TurningPoint[] = [
  {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over: 6,
    ball: 1,
    type: 'powerplay',
    significance: 75,
    description: 'End of powerplay with only 45 runs - batting team under pressure',
    impactOnWinProbability: -12,
  },
  {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over: 12,
    ball: 4,
    type: 'dropped catch',
    significance: 85,
    description: 'Dropped catch of set batsman on 67 - could prove costly',
    impactOnWinProbability: 18,
  },
  {
    matchId: 'match-1',
    timestamp: new Date().toISOString(),
    over: 16,
    ball: 2,
    type: 'milestone',
    significance: 60,
    description: 'Batsman reaches century - team in commanding position',
    impactOnWinProbability: 15,
  },
];

// Mock Impact Players
export const mockImpactPlayers: ImpactPlayer[] = [
  {
    matchId: 'match-1',
    playerId: 'p1',
    playerName: 'Virat Kohli',
    team: 'India',
    impactScore: 92,
    contributions: [
      { type: 'batting', value: 85, description: '98 runs off 62 balls' },
      { type: 'fielding', value: 7, description: '1 crucial catch' },
    ],
  },
  {
    matchId: 'match-1',
    playerId: 'p2',
    playerName: 'J. Bumrah',
    team: 'India',
    impactScore: 88,
    contributions: [
      { type: 'bowling', value: 88, description: '4-28 in 4 overs' },
    ],
  },
  {
    matchId: 'match-1',
    playerId: 'p3',
    playerName: 'G. Maxwell',
    team: 'Australia',
    impactScore: 78,
    contributions: [
      { type: 'batting', value: 70, description: '54 off 28 balls' },
      { type: 'bowling', value: 8, description: '1-22 in 2 overs' },
    ],
  },
];

// Mock Prediction Poll
export const mockPredictionPolls: PredictionPoll[] = [
  {
    id: 'poll-1',
    matchId: 'match-1',
    question: 'Who will win this match?',
    options: [
      { id: 'opt-1', text: 'India', votes: 12500, percentage: 58 },
      { id: 'opt-2', text: 'Australia', votes: 9000, percentage: 42 },
    ],
    totalVotes: 21500,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    id: 'poll-2',
    matchId: 'match-1',
    question: 'Top scorer in the 2nd innings?',
    options: [
      { id: 'opt-3', text: 'M. Marsh', votes: 4200, percentage: 35 },
      { id: 'opt-4', text: 'G. Maxwell', votes: 3800, percentage: 32 },
      { id: 'opt-5', text: 'T. Head', votes: 2400, percentage: 20 },
      { id: 'opt-6', text: 'Other', votes: 1600, percentage: 13 },
    ],
    totalVotes: 12000,
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
];

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: 'player-1',
    name: 'V. Kohli',
    fullName: 'Virat Kohli',
    nationality: 'India',
    dateOfBirth: '1988-11-05',
    age: 37,
    role: 'batsman',
    battingStyle: 'right-handed',
    teams: ['India', 'Royal Challengers Bangalore'],
    image: '/players/kohli.jpg',
    stats: {
      batting: {
        matches: 292,
        innings: 283,
        runs: 13848,
        highestScore: 183,
        average: 57.32,
        strikeRate: 93.25,
        hundreds: 50,
        fifties: 72,
        fours: 1245,
        sixes: 148,
        notOuts: 41,
      },
      bowling: {
        matches: 292,
        innings: 15,
        wickets: 4,
        bestFigures: '1-15',
        average: 122.5,
        economy: 6.25,
        strikeRate: 117.5,
        fiveWickets: 0,
        tenWickets: 0,
      },
      fielding: {
        catches: 145,
        stumpings: 0,
        runOuts: 12,
      },
    },
  },
];

// Helper function to get mock data
export function getMockLiveMatches(): Match[] {
  return mockLiveMatches;
}

export function getMockUpcomingMatches(): Match[] {
  return mockUpcomingMatches;
}

export function getMockWinProbability(matchId: string): WinProbability[] {
  return mockWinProbabilityTimeline.filter(wp => wp.matchId === matchId);
}

export function getMockPressureIndex(matchId: string): PressureIndex[] {
  return mockPressureIndexData.filter(pi => pi.matchId === matchId);
}

export function getMockMomentumShifts(matchId: string): MomentumShift[] {
  return mockMomentumShifts.filter(ms => ms.matchId === matchId);
}

export function getMockTurningPoints(matchId: string): TurningPoint[] {
  return mockTurningPoints.filter(tp => tp.matchId === matchId);
}

export function getMockImpactPlayers(matchId: string): ImpactPlayer[] {
  return mockImpactPlayers.filter(ip => ip.matchId === matchId);
}

export function getMockPredictionPolls(matchId: string): PredictionPoll[] {
  return mockPredictionPolls.filter(p => p.matchId === matchId);
}
