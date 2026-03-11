'use client';

import { Match } from '@/types/cricket';
import { format } from 'date-fns';
import { MapPin, Clock, Trophy } from 'lucide-react';
import Link from 'next/link';

interface LiveMatchCardProps {
  match: Match;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function LiveMatchCard({ match, isSelected, onClick }: LiveMatchCardProps) {
  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  const currentInnings = match.innings[match.currentInnings ? match.currentInnings - 1 : 0];

  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return <span className="badge-live">LIVE</span>;
      case 'upcoming':
        return <span className="badge-upcoming">Upcoming</span>;
      case 'completed':
        return <span className="badge-completed">Completed</span>;
      default:
        return null;
    }
  };

  const getFormatBadge = () => {
    const colors: Record<string, string> = {
      T20: 'bg-purple-500/20 text-purple-400',
      ODI: 'bg-blue-500/20 text-blue-400',
      Test: 'bg-red-500/20 text-red-400',
      T10: 'bg-orange-500/20 text-orange-400',
    };
    return (
      <span className={`badge ${colors[match.format] || 'bg-gray-500/20 text-gray-400'}`}>
        {match.format}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`card card-hover p-4 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-secondary border-secondary/50 shadow-glow-secondary'
          : ''
      }`}
    >
      {/* Header - Status and Format */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {getFormatBadge()}
        </div>
        {isLive && currentInnings && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Over {currentInnings.overs}.{currentInnings.balls}
          </div>
        )}
      </div>

      {/* Teams and Scores */}
      <div className="space-y-3">
        {/* Team 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-secondary">
                {match.teams.home.shortName}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {match.teams.home.name}
              </p>
              {match.innings[0] && match.innings[0].battingTeamId === match.teams.home.id && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {match.toss?.winner === match.teams.home.name && `Won toss, chose to ${match.toss?.decision}`}
                </p>
              )}
            </div>
          </div>
          {match.innings.length > 0 && (
            <div className="text-right">
              {match.innings.map((inn, idx) => 
                inn.battingTeamId === match.teams.home.id && (
                  <p key={idx} className="score-display text-gray-900 dark:text-white text-xl">
                    {inn.runs}/{inn.wickets}
                    <span className="overs-display ml-2">({inn.overs}.{inn.balls})</span>
                  </p>
                )
              )}
            </div>
          )}
        </div>

        {/* VS Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-primary-50 px-2 text-xs text-gray-500 dark:text-gray-400">
              VS
            </span>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-accent">
                {match.teams.away.shortName}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {match.teams.away.name}
              </p>
              {match.innings[0] && match.innings[0].battingTeamId === match.teams.away.id && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {match.toss?.winner === match.teams.away.name && `Won toss, chose to ${match.toss?.decision}`}
                </p>
              )}
            </div>
          </div>
          {match.innings.length > 0 && (
            <div className="text-right">
              {match.innings.map((inn, idx) => 
                inn.battingTeamId === match.teams.away.id && (
                  <p key={idx} className="score-display text-gray-900 dark:text-white text-xl">
                    {inn.runs}/{inn.wickets}
                    <span className="overs-display ml-2">({inn.overs}.{inn.balls})</span>
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Match Status / Required Rate */}
      {isLive && currentInnings?.requiredRunRate && (
        <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-secondary">
              {match.teams.away.name}
            </span>
            {' need '}
            <span className="font-bold text-secondary">
              {(currentInnings.target || 0) - currentInnings.runs}
            </span>
            {' runs from '}
            <span className="font-bold">
              {20 * 6 - (currentInnings.overs * 6 + currentInnings.balls)}
            </span>
            {' balls'}
            <span className="block mt-1 text-xs text-gray-500">
              RRR: {currentInnings.requiredRunRate.toFixed(2)}
            </span>
          </p>
        </div>
      )}

      {/* Venue and Time */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[150px]">{match.venue.name}</span>
          </div>
          {isUpcoming ? (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{format(new Date(match.startTime), 'MMM d, h:mm a')}</span>
            </div>
          ) : match.result ? (
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-accent">{match.result.description}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* View Details Link */}
      <Link
        href={`/match/${match.id}`}
        className="mt-4 block text-center text-sm font-medium text-secondary hover:text-secondary-600 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        View Full Analysis →
      </Link>
    </div>
  );
}
