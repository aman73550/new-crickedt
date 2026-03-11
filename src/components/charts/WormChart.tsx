'use client';

import { Team } from '@/types/cricket';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface WormChartProps {
  team1: Team;
  team2: Team;
  team1Data: { over: number; runs: number }[];
  team2Data: { over: number; runs: number }[];
}

export default function WormChart({ team1, team2, team1Data, team2Data }: WormChartProps) {
  // Merge data for chart
  const maxOvers = Math.max(
    team1Data.length > 0 ? team1Data[team1Data.length - 1].over : 0,
    team2Data.length > 0 ? team2Data[team2Data.length - 1].over : 0
  );

  const chartData = [];
  for (let i = 0; i <= maxOvers; i++) {
    const t1 = team1Data.find(d => d.over === i);
    const t2 = team2Data.find(d => d.over === i);
    chartData.push({
      over: i,
      [team1.shortName]: t1?.runs || null,
      [team2.shortName]: t2?.runs || null,
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-primary-50 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            After {label} overs
          </p>
          {payload.map((entry: any, index: number) => (
            entry.value !== null && (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {entry.value} runs
                </span>
              </div>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  // Get final scores
  const team1Final = team1Data.length > 0 ? team1Data[team1Data.length - 1].runs : 0;
  const team2Final = team2Data.length > 0 ? team2Data[team2Data.length - 1].runs : 0;

  return (
    <div>
      {/* Score Comparison */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-secondary/20 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-secondary">{team1.shortName}</span>
          </div>
          <p className="text-2xl font-bold text-secondary">{team1Final}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{team1.name}</p>
        </div>
        <div className="text-2xl font-bold text-gray-400">vs</div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-accent">{team2.shortName}</span>
          </div>
          <p className="text-2xl font-bold text-accent">{team2Final}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{team2.name}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWorm1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWorm2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="over"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              label={{ value: 'Overs', position: 'bottom', fill: '#9CA3AF' }}
            />
            <YAxis
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              label={{ value: 'Runs', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={team1.shortName}
              stroke="#00D9FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWorm1)"
              connectNulls
            />
            <Area
              type="monotone"
              dataKey={team2.shortName}
              stroke="#FF6B35"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWorm2)"
              connectNulls
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
