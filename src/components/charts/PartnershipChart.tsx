'use client';

import { Partnership } from '@/types/cricket';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface PartnershipChartProps {
  partnerships: Partnership[];
  totalRuns: number;
}

export default function PartnershipChart({ partnerships, totalRuns }: PartnershipChartProps) {
  const colors = [
    '#00D9FF', '#FF6B35', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
  ];

  const chartData = partnerships.map((p, index) => ({
    wicket: `${p.wicket}`,
    runs: p.runs,
    balls: p.balls,
    batsman1: p.batsman1.name,
    batsman2: p.batsman2.name,
    batsman1Runs: p.batsman1.runs,
    batsman2Runs: p.batsman2.runs,
    runRate: p.balls > 0 ? ((p.runs / p.balls) * 6).toFixed(2) : '0.00',
    percentage: totalRuns > 0 ? ((p.runs / totalRuns) * 100).toFixed(1) : '0',
    color: colors[index % colors.length],
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-primary-50 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px]">
          <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            {data.wicket === '1' ? '1st' : data.wicket === '2' ? '2nd' : data.wicket === '3' ? '3rd' : `${data.wicket}th`} Wicket Partnership
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Runs:</span>
              <span className="font-bold text-secondary">{data.runs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Balls:</span>
              <span className="font-medium text-gray-900 dark:text-white">{data.balls}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Run Rate:</span>
              <span className="font-medium text-gray-900 dark:text-white">{data.runRate}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Batsmen:</p>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">{data.batsman1}</span>
                <span className="font-medium">{data.batsman1Runs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">{data.batsman2}</span>
                <span className="font-medium">{data.batsman2Runs}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Find best partnership
  const bestPartnership = partnerships.reduce((best, p) => 
    p.runs > (best?.runs || 0) ? p : best, partnerships[0]
  );

  return (
    <div>
      {/* Best Partnership Highlight */}
      {bestPartnership && (
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Best Partnership</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {bestPartnership.batsman1.name} & {bestPartnership.batsman2.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bestPartnership.wicket === 1 ? '1st' : bestPartnership.wicket === 2 ? '2nd' : bestPartnership.wicket === 3 ? '3rd' : `${bestPartnership.wicket}th`} wicket
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-secondary">{bestPartnership.runs}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {bestPartnership.balls} balls
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="wicket"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `W${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="runs" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Partnership List */}
      <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
        {chartData.map((partnership, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-primary-100 transition-colors"
          >
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: partnership.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {partnership.batsman1} & {partnership.batsman2}
                </p>
                <span className="text-sm font-bold text-gray-900 dark:text-white ml-2">
                  {partnership.runs}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>W{partnership.wicket}</span>
                <span>•</span>
                <span>{partnership.balls} balls</span>
                <span>•</span>
                <span>RR: {partnership.runRate}</span>
                <span>•</span>
                <span>{partnership.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
