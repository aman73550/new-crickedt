'use client';

import { PressureIndex } from '@/types/cricket';
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PressureIndexMeterProps {
  data: PressureIndex[];
  currentValue: PressureIndex;
}

export default function PressureIndexMeter({ data, currentValue }: PressureIndexMeterProps) {
  const value = currentValue?.value || 50;
  const level = currentValue?.level || 'medium';
  const factors = currentValue?.factors || [];

  // Calculate trend
  const previousValue = data.length > 1 ? data[data.length - 2]?.value : value;
  const trend = value - previousValue;

  const getLevelColor = (lvl: string) => {
    switch (lvl) {
      case 'low':
        return { bg: 'bg-success', text: 'text-success', gradient: 'from-success to-success-dark' };
      case 'medium':
        return { bg: 'bg-warning', text: 'text-warning', gradient: 'from-warning to-warning-dark' };
      case 'high':
        return { bg: 'bg-accent', text: 'text-accent', gradient: 'from-accent to-accent-600' };
      case 'critical':
        return { bg: 'bg-danger', text: 'text-danger', gradient: 'from-danger to-danger-dark' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-500', gradient: 'from-gray-500 to-gray-600' };
    }
  };

  const colors = getLevelColor(level);

  // Calculate rotation for gauge needle (-135deg to 135deg, representing 0-100)
  const rotation = (value / 100) * 270 - 135;

  return (
    <div className="space-y-6">
      {/* Gauge Meter */}
      <div className="relative flex flex-col items-center">
        {/* Gauge Background */}
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Gauge Arc Background */}
          <div 
            className="absolute w-48 h-48 rounded-full border-[16px] border-gray-200 dark:border-gray-700"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
            }}
          />
          
          {/* Colored Sections */}
          <svg className="absolute inset-0 w-48 h-48" viewBox="0 0 200 200">
            {/* Low - Green */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeDasharray="66 264"
              strokeDashoffset="66"
              transform="rotate(-135 100 100)"
            />
            {/* Medium - Yellow */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="16"
              strokeDasharray="66 264"
              strokeDashoffset="0"
              transform="rotate(-135 100 100)"
            />
            {/* High - Orange */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="16"
              strokeDasharray="66 264"
              strokeDashoffset="-66"
              transform="rotate(-135 100 100)"
            />
            {/* Critical - Red */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#EF4444"
              strokeWidth="16"
              strokeDasharray="66 264"
              strokeDashoffset="-132"
              transform="rotate(-135 100 100)"
            />
          </svg>

          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-900 dark:bg-white origin-bottom transition-transform duration-500 ease-out rounded-full"
            style={{ 
              transform: `translateX(-50%) rotate(${rotation}deg)`,
            }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 dark:bg-white rounded-full" />
          </div>

          {/* Center Circle */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-900 dark:bg-white rounded-full" />
        </div>

        {/* Value Display */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className={`text-4xl font-bold ${colors.text}`}>
              {value.toFixed(0)}
            </span>
            {trend !== 0 && (
              <span className={`flex items-center text-sm ${trend > 0 ? 'text-danger' : 'text-success'}`}>
                {trend > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(trend).toFixed(1)}
              </span>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            {level === 'critical' && <AlertTriangle className="w-4 h-4 text-danger animate-pulse" />}
            <span className={`text-sm font-semibold uppercase ${colors.text}`}>
              {level} Pressure
            </span>
          </div>
        </div>
      </div>

      {/* Level Scale */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Critical</span>
      </div>

      {/* Contributing Factors */}
      {factors.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Contributing Factors
          </p>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{factor.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {factor.contribution}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors.bg} rounded-full transition-all duration-500`}
                    style={{ width: `${factor.contribution}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Mini Chart */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Pressure Over Time
        </p>
        <div className="flex items-end gap-1 h-12">
          {data.slice(-20).map((d, index) => (
            <div
              key={index}
              className={`flex-1 rounded-t transition-all duration-300 ${
                d.level === 'critical' ? 'bg-danger' :
                d.level === 'high' ? 'bg-accent' :
                d.level === 'medium' ? 'bg-warning' : 'bg-success'
              }`}
              style={{ height: `${d.value}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
