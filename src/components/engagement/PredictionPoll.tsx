'use client';

import { useState } from 'react';
import { PredictionPoll as PredictionPollType } from '@/types/cricket';
import { Vote, Users, Clock, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PredictionPollProps {
  poll: PredictionPollType;
}

export default function PredictionPoll({ poll }: PredictionPollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId: string) => {
    if (hasVoted || poll.status === 'closed') return;
    setSelectedOption(optionId);
    setHasVoted(true);
    // In a real app, this would send the vote to the backend
  };

  const timeRemaining = formatDistanceToNow(new Date(poll.endTime), { addSuffix: true });

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-secondary/10 to-accent/10 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Vote className="w-5 h-5 text-secondary" />
          <span className="text-sm font-semibold text-secondary">Fan Prediction</span>
        </div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          {poll.question}
        </h4>
      </div>

      {/* Options */}
      <div className="p-4 space-y-3">
        {poll.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const percentage = hasVoted ? option.percentage : 0;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted || poll.status === 'closed'}
              className={`relative w-full p-4 rounded-lg border-2 transition-all duration-300 text-left overflow-hidden ${
                isSelected
                  ? 'border-secondary bg-secondary/5'
                  : hasVoted
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-primary-100'
                  : 'border-gray-200 dark:border-gray-700 hover:border-secondary/50 hover:bg-gray-50 dark:hover:bg-primary-100'
              }`}
            >
              {/* Progress bar background */}
              {hasVoted && (
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isSelected ? 'bg-secondary/10' : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              {/* Content */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isSelected && hasVoted ? (
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                      isSelected
                        ? 'border-secondary bg-secondary'
                        : 'border-gray-300 dark:border-gray-600'
                    }`} />
                  )}
                  <span className={`font-medium ${
                    isSelected
                      ? 'text-secondary'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {option.text}
                  </span>
                </div>
                {hasVoted && (
                  <span className={`text-lg font-bold ${
                    isSelected ? 'text-secondary' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-primary-100 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{poll.totalVotes.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {poll.status === 'closed' ? 'Poll closed' : `Ends ${timeRemaining}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
