'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';

interface RunRateChartProps {
  currentRunRate: number;
  requiredRunRate?: number;
  overByOver: { over: number; runRate: number; requiredRate?: number }[];
}

export default function RunRateChart({ currentRunRate, requiredRunRate, overByOver }: RunRateChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-primary-50 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            Over {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Current vs Required Display */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/10 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Run Rate</p>
          <p className="text-3xl font-bold text-secondary">{currentRunRate.toFixed(2)}</p>
        </div>
        {requiredRunRate && (
          <div className={`rounded-lg p-4 text-center ${
            currentRunRate >= requiredRunRate ? 'bg-success/10' : 'bg-danger/10'
          }`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Required Run Rate</p>
            <p className={`text-3xl font-bold ${
              currentRunRate >= requiredRunRate ? 'text-success' : 'text-danger'
            }`}>
              {requiredRunRate.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={overByOver} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="over"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              label={{ value: 'Overs', position: 'bottom', fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="runRate"
              name="Run Rate"
              stroke="#00D9FF"
              strokeWidth={2}
              dot={{ fill: '#00D9FF', r: 3 }}
            />
            {requiredRunRate && (
              <Line
                type="monotone"
                dataKey="requiredRate"
                name="Required Rate"
                stroke="#FF6B35"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
