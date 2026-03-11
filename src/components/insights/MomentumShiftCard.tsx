'use client';

import { MomentumShift } from '@/types/cricket';
import { ArrowRight, Zap } from 'lucide-react';

interface MomentumShiftCardProps {
  shift: MomentumShift;
}

export default function MomentumShiftCard({ shift }: MomentumShiftCardProps) {
  const isTeam1 = shift.direction === 'team1';

  return (
    <div className="card p-4 border-l-4 border-l-accent">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isTeam1 ? 'bg-secondary/20' : 'bg-accent/20'}`}>
          <Zap className={`w-4 h-4 ${isTeam1 ? 'text-secondary' : 'text-accent'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Over {shift.over}.{shift.ball}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isTeam1 ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'
            }`}>
              {shift.trigger}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {shift.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Magnitude:</span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isTeam1 ? 'bg-secondary' : 'bg-accent'
                }`}
                style={{ width: `${shift.magnitude}%` }}
              />
            </div>
            <span className={`text-xs font-semibold ${isTeam1 ? 'text-secondary' : 'text-accent'}`}>
              {shift.magnitude}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
