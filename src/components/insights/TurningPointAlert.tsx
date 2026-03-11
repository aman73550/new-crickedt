'use client';

import { TurningPoint } from '@/types/cricket';
import { 
  AlertCircle, 
  Target, 
  Crosshair, 
  Star, 
  Flag, 
  Zap,
  Users,
  HandMetal
} from 'lucide-react';

interface TurningPointAlertProps {
  turningPoint: TurningPoint;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wicket: Target,
  boundary: Zap,
  'dropped catch': HandMetal,
  review: AlertCircle,
  milestone: Star,
  powerplay: Flag,
  'death overs': Crosshair,
  partnership: Users,
};

export default function TurningPointAlert({ turningPoint }: TurningPointAlertProps) {
  const Icon = typeIcons[turningPoint.type] || AlertCircle;
  const isPositive = turningPoint.impactOnWinProbability > 0;

  return (
    <div className={`card p-4 border-l-4 ${
      isPositive ? 'border-l-success' : 'border-l-danger'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          isPositive ? 'bg-success/20' : 'bg-danger/20'
        }`}>
          <Icon className={`w-4 h-4 ${isPositive ? 'text-success' : 'text-danger'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Over {turningPoint.over}.{turningPoint.ball}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
              {turningPoint.type}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {turningPoint.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Impact:</span>
              <span className={`text-sm font-bold ${
                isPositive ? 'text-success' : 'text-danger'
              }`}>
                {isPositive ? '+' : ''}{turningPoint.impactOnWinProbability}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Significance:</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= turningPoint.significance / 20
                        ? isPositive ? 'bg-success' : 'bg-danger'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
