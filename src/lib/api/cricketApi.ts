import { Match, Player, WinProbability, PressureIndex, MomentumShift, TurningPoint, ApiResponse } from '@/types/cricket';

const API_BASE_URL = process.env.CRICKET_API_BASE_URL || 'https://api.sportmonks.com/v3/cricket';
const API_KEY = process.env.CRICKET_API_KEY || '';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}

async function fetchFromAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, cache = 'no-store', revalidate } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: revalidate ? { revalidate } : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || data,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('API fetch error:', error);
    return {
      success: false,
      data: null as unknown as T,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}

// Match APIs
export async function getLiveMatches(): Promise<ApiResponse<Match[]>> {
  return fetchFromAPI<Match[]>('/livescores');
}

export async function getUpcomingMatches(): Promise<ApiResponse<Match[]>> {
  return fetchFromAPI<Match[]>('/fixtures', { revalidate: 300 });
}

export async function getRecentMatches(): Promise<ApiResponse<Match[]>> {
  return fetchFromAPI<Match[]>('/fixtures/past', { revalidate: 60 });
}

export async function getMatchById(matchId: string): Promise<ApiResponse<Match>> {
  return fetchFromAPI<Match>(`/fixtures/${matchId}`);
}

export async function getMatchScorecard(matchId: string): Promise<ApiResponse<Match>> {
  return fetchFromAPI<Match>(`/fixtures/${matchId}?include=scorecard`);
}

// Player APIs
export async function getPlayerById(playerId: string): Promise<ApiResponse<Player>> {
  return fetchFromAPI<Player>(`/players/${playerId}`);
}

export async function getPlayersByTeam(teamId: string): Promise<ApiResponse<Player[]>> {
  return fetchFromAPI<Player[]>(`/teams/${teamId}/players`);
}

export async function searchPlayers(query: string): Promise<ApiResponse<Player[]>> {
  return fetchFromAPI<Player[]>(`/players/search/${encodeURIComponent(query)}`);
}

// Analytics APIs (these would be internal calculations)
export async function getWinProbability(matchId: string): Promise<ApiResponse<WinProbability[]>> {
  return fetchFromAPI<WinProbability[]>(`/analytics/win-probability/${matchId}`);
}

export async function getPressureIndex(matchId: string): Promise<ApiResponse<PressureIndex[]>> {
  return fetchFromAPI<PressureIndex[]>(`/analytics/pressure/${matchId}`);
}

export async function getMomentumShifts(matchId: string): Promise<ApiResponse<MomentumShift[]>> {
  return fetchFromAPI<MomentumShift[]>(`/analytics/momentum/${matchId}`);
}

export async function getTurningPoints(matchId: string): Promise<ApiResponse<TurningPoint[]>> {
  return fetchFromAPI<TurningPoint[]>(`/analytics/turning-points/${matchId}`);
}

// Export the base fetch function for custom endpoints
export { fetchFromAPI };
