'use client';

import { ImpactPlayer } from '@/types/cricket';
import { Trophy, Flame, Target } from 'lucide-react';

interface ImpactPlayerCardProps {
  player: ImpactPlayer;
  rank: number;
}

export default function ImpactPlayerCard({ player, rank }: ImpactPlayerCardProps) {
  const getRankBadge = () => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
            <Trophy className="w-4 h-4 text-white" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg">
            <span className="text-sm font-bold text-white">2</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
            <span className="text-sm font-bold text-white">3</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{rank}</span>
          </div>
        );
    }
  };

  const getContributionIcon = (type: string) => {
    switch (type) {
      case 'batting':
        return <Flame className="w-3 h-3 text-accent" />;
      case 'bowling':
        return <Target className="w-3 h-3 text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-3 rounded-lg transition-all duration-300 ${
      rank === 1 
        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30' 
        : 'bg-gray-50 dark:bg-primary-100 hover:bg-gray-100 dark:hover:bg-primary-50'
    }`}>
      <div className="flex items-center gap-3">
        {getRankBadge()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {player.playerName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {player.team}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-xl font-bold ${
                rank === 1 ? 'text-accent' : 'text-secondary'
              }`}>
                {player.impactScore}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Impact Score
              </p>
            </div>
          </div>
          
          {/* Contributions */}
          <div className="mt-2 flex flex-wrap gap-2">
            {player.contributions.map((contribution, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {getContributionIcon(contribution.type)}
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {contribution.type}:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {contribution.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Impact Bar */}
          <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                rank === 1 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                  : 'bg-secondary'
              }`}
              style={{ width: `${player.impactScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
