// Cricket Match Types
export interface Match {
  id: string;
  name: string;
  status: MatchStatus;
  format: MatchFormat;
  venue: Venue;
  startTime: string;
  endTime?: string;
  teams: {
    home: Team;
    away: Team;
  };
  toss?: Toss;
  innings: Innings[];
  currentInnings?: number;
  result?: MatchResult;
}

export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'abandoned' | 'delayed';
export type MatchFormat = 'T20' | 'ODI' | 'Test' | 'T10';

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  color?: string;
}

export interface Toss {
  winner: string;
  decision: 'bat' | 'bowl';
}

export interface Innings {
  number: number;
  battingTeamId: string;
  bowlingTeamId: string;
  runs: number;
  wickets: number;
  overs: number;
  balls: number;
  extras: Extras;
  runRate: number;
  requiredRunRate?: number;
  target?: number;
  partnerships: Partnership[];
  batsmen: BatsmanInnings[];
  bowlers: BowlerInnings[];
  fallOfWickets: FallOfWicket[];
  overByOver: OverSummary[];
}

export interface Extras {
  total: number;
  byes: number;
  legByes: number;
  wides: number;
  noBalls: number;
  penalty: number;
}

export interface Partnership {
  wicket: number;
  runs: number;
  balls: number;
  batsman1: {
    id: string;
    name: string;
    runs: number;
    balls: number;
  };
  batsman2: {
    id: string;
    name: string;
    runs: number;
    balls: number;
  };
}

export interface BatsmanInnings {
  playerId: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  dismissal?: Dismissal;
  isOnStrike?: boolean;
}

export interface Dismissal {
  type: DismissalType;
  bowler?: string;
  fielder?: string;
  description: string;
}

export type DismissalType = 
  | 'bowled' 
  | 'caught' 
  | 'lbw' 
  | 'run out' 
  | 'stumped' 
  | 'hit wicket'
  | 'caught and bowled'
  | 'retired hurt'
  | 'timed out'
  | 'handled ball'
  | 'obstructing field';

export interface BowlerInnings {
  playerId: string;
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
  fours: number;
  sixes: number;
  wides: number;
  noBalls: number;
}

export interface FallOfWicket {
  wicketNumber: number;
  runs: number;
  overs: number;
  batsmanId: string;
  batsmanName: string;
}

export interface OverSummary {
  overNumber: number;
  runs: number;
  wickets: number;
  balls: BallEvent[];
}

export interface BallEvent {
  ballNumber: number;
  runs: number;
  isWicket: boolean;
  isExtra: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  description?: string;
}

export interface MatchResult {
  winner?: string;
  winMargin?: number;
  winType?: 'runs' | 'wickets' | 'innings' | 'tie' | 'draw' | 'no result';
  description: string;
}

// Player Types
export interface Player {
  id: string;
  name: string;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  age: number;
  role: PlayerRole;
  battingStyle: BattingStyle;
  bowlingStyle?: BowlingStyle;
  teams: string[];
  image?: string;
  stats: PlayerStats;
}

export type PlayerRole = 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
export type BattingStyle = 'right-handed' | 'left-handed';
export type BowlingStyle = 
  | 'right-arm fast' 
  | 'right-arm medium' 
  | 'right-arm off-break'
  | 'right-arm leg-break'
  | 'left-arm fast'
  | 'left-arm medium'
  | 'left-arm orthodox'
  | 'left-arm chinaman';

export interface PlayerStats {
  batting: BattingStats;
  bowling: BowlingStats;
  fielding: FieldingStats;
}

export interface BattingStats {
  matches: number;
  innings: number;
  runs: number;
  highestScore: number;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  notOuts: number;
}

export interface BowlingStats {
  matches: number;
  innings: number;
  wickets: number;
  bestFigures: string;
  average: number;
  economy: number;
  strikeRate: number;
  fiveWickets: number;
  tenWickets: number;
}

export interface FieldingStats {
  catches: number;
  stumpings: number;
  runOuts: number;
}

// AI Analytics Types
export interface WinProbability {
  matchId: string;
  timestamp: string;
  over: number;
  ball: number;
  team1: {
    id: string;
    probability: number;
  };
  team2: {
    id: string;
    probability: number;
  };
  draw?: number;
  factors: WinProbabilityFactor[];
}

export interface WinProbabilityFactor {
  name: string;
  impact: number;
  description: string;
}

export interface PressureIndex {
  matchId: string;
  timestamp: string;
  over: number;
  value: number; // 0-100
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: PressureFactor[];
}

export interface PressureFactor {
  name: string;
  contribution: number;
  description: string;
}

export interface MomentumShift {
  matchId: string;
  timestamp: string;
  over: number;
  ball: number;
  direction: 'team1' | 'team2';
  magnitude: number; // 0-100
  trigger: string;
  description: string;
}

export interface TurningPoint {
  matchId: string;
  timestamp: string;
  over: number;
  ball: number;
  type: TurningPointType;
  significance: number; // 0-100
  description: string;
  impactOnWinProbability: number;
}

export type TurningPointType = 
  | 'wicket'
  | 'boundary'
  | 'dropped catch'
  | 'review'
  | 'milestone'
  | 'powerplay'
  | 'death overs'
  | 'partnership';

export interface ImpactPlayer {
  matchId: string;
  playerId: string;
  playerName: string;
  team: string;
  impactScore: number; // 0-100
  contributions: ImpactContribution[];
}

export interface ImpactContribution {
  type: 'batting' | 'bowling' | 'fielding';
  value: number;
  description: string;
}

// Match Scenario Simulation
export interface MatchScenario {
  currentOver: number;
  currentBall: number;
  runs: number;
  wickets: number;
  target: number;
  requiredRunRate: number;
  oversRemaining: number;
}

export interface SimulationResult {
  scenario: MatchScenario;
  winProbability: {
    batting: number;
    bowling: number;
  };
  projectedScore: {
    min: number;
    max: number;
    expected: number;
  };
  keyFactors: string[];
}

// Fan Engagement Types
export interface PredictionPoll {
  id: string;
  matchId: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endTime: string;
  status: 'active' | 'closed';
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Reaction {
  matchId: string;
  eventId: string;
  type: ReactionType;
  count: number;
}

export type ReactionType = 'fire' | 'clap' | 'sad' | 'shocked' | 'heart' | 'laugh';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
