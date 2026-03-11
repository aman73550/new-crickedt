'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

interface ManhattanChartProps {
  data: {
    over: number;
    runs: number;
    wickets: number;
    isPowerplay?: boolean;
    isDeathOvers?: boolean;
  }[];
}

export default function ManhattanChart({ data }: ManhattanChartProps) {
  const avgRunsPerOver = data.length > 0 
    ? data.reduce((sum, d) => sum + d.runs, 0) / data.length 
    : 0;

  const getBarColor = (entry: typeof data[0]) => {
    if (entry.wickets > 0) return '#EF4444'; // Red for wickets
    if (entry.runs >= 15) return '#10B981'; // Green for high-scoring
    if (entry.runs >= 10) return '#00D9FF'; // Teal for good
    if (entry.runs <= 4) return '#6B7280'; // Gray for low
    return '#F59E0B'; // Yellow for moderate
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entry = data.find(d => d.over === label);
      return (
        <div className="bg-white dark:bg-primary-50 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Over {label}
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Runs: <span className="font-semibold text-secondary">{payload[0].value}</span>
            </p>
            {entry?.wickets !== undefined && entry.wickets > 0 && (
              <p className="text-danger font-semibold">
                {entry.wickets} wicket{entry.wickets > 1 ? 's' : ''}
              </p>
            )}
            {entry?.isPowerplay && (
              <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                Powerplay
              </span>
            )}
            {entry?.isDeathOvers && (
              <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full">
                Death Overs
              </span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate phase-wise runs
  const powerplayRuns = data.filter(d => d.over <= 6).reduce((sum, d) => sum + d.runs, 0);
  const middleRuns = data.filter(d => d.over > 6 && d.over <= 15).reduce((sum, d) => sum + d.runs, 0);
  const deathRuns = data.filter(d => d.over > 15).reduce((sum, d) => sum + d.runs, 0);

  return (
    <div>
      {/* Phase-wise Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-purple-500/10 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Powerplay (1-6)</p>
          <p className="text-xl font-bold text-purple-400">{powerplayRuns}</p>
        </div>
        <div className="bg-secondary/10 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Middle (7-15)</p>
          <p className="text-xl font-bold text-secondary">{middleRuns}</p>
        </div>
        <div className="bg-accent/10 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Death (16-20)</p>
          <p className="text-xl font-bold text-accent">{deathRuns}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
            <XAxis
              dataKey="over"
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              tickLine={{ stroke: '#374151' }}
            />
            <YAxis
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={avgRunsPerOver} 
              stroke="#FF6B35" 
              strokeDasharray="5 5" 
              label={{ value: 'Avg', fill: '#FF6B35', fontSize: 10 }}
            />
            <Bar dataKey="runs" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-gray-500 dark:text-gray-400">15+ runs</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-secondary" />
          <span className="text-gray-500 dark:text-gray-400">10-14 runs</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-gray-500 dark:text-gray-400">5-9 runs</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gray-500" />
          <span className="text-gray-500 dark:text-gray-400">0-4 runs</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-danger" />
          <span className="text-gray-500 dark:text-gray-400">Wicket</span>
        </div>
      </div>
    </div>
  );
}
