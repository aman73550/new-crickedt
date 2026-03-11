'use client';

import { WinProbability, Team } from '@/types/cricket';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
  ReferenceLine,
} from 'recharts';

interface WinProbabilityChartProps {
  data: WinProbability[];
  team1: Team;
  team2: Team;
}

export default function WinProbabilityChart({ data, team1, team2 }: WinProbabilityChartProps) {
  // Transform data for chart
  const chartData = data.map((d, index) => ({
    over: `${d.over}.${d.ball}`,
    overIndex: index,
    [team1.shortName]: d.team1.probability,
    [team2.shortName]: d.team2.probability,
  }));

  // Get current probabilities (last data point)
  const currentData = data[data.length - 1];
  const team1Prob = currentData?.team1.probability || 50;
  const team2Prob = currentData?.team2.probability || 50;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-primary-50 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Over: {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {entry.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Current Probability Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary/10 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{team1.name}</p>
          <p className="text-3xl font-bold text-secondary">{team1Prob.toFixed(1)}%</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${team1Prob}%` }}
            />
          </div>
        </div>
        <div className="bg-accent/10 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{team2.name}</p>
          <p className="text-3xl font-bold text-accent">{team2Prob.toFixed(1)}%</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${team2Prob}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTeam1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTeam2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="over"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
              interval={Math.floor(chartData.length / 10)}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={50} stroke="#6B7280" strokeDasharray="5 5" />
            <Area
              type="monotone"
              dataKey={team1.shortName}
              stroke="#00D9FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTeam1)"
            />
            <Area
              type="monotone"
              dataKey={team2.shortName}
              stroke="#FF6B35"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTeam2)"
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Factors */}
      {currentData?.factors && currentData.factors.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Factors
          </p>
          <div className="flex flex-wrap gap-2">
            {currentData.factors.map((factor, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400"
              >
                {factor.name}: {factor.impact > 0 ? '+' : ''}{factor.impact}%
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
