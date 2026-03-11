'use client';

import { Match } from '@/types/cricket';
import { Bot, Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface AIMatchSummaryProps {
  match: Match;
}

export default function AIMatchSummary({ match }: AIMatchSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate AI summary based on match data
  const generateSummary = () => {
    const currentInnings = match.innings[match.currentInnings ? match.currentInnings - 1 : 0];
    const isChasing = match.currentInnings === 2;
    
    if (!currentInnings) {
      return {
        headline: 'Match is about to begin',
        summary: `${match.teams.home.name} will take on ${match.teams.away.name} in this ${match.format} encounter at ${match.venue.name}.`,
        keyPoints: [
          'Venue conditions favor balanced play',
          'Both teams are evenly matched',
          'Weather looks favorable for cricket',
        ],
        prediction: 'Match expected to be a close contest',
      };
    }

    if (isChasing && currentInnings.requiredRunRate) {
      const runsNeeded = (currentInnings.target || 0) - currentInnings.runs;
      const ballsLeft = (20 - currentInnings.overs) * 6 - currentInnings.balls;
      const wicketsInHand = 10 - currentInnings.wickets;

      return {
        headline: `${match.teams.away.name} need ${runsNeeded} runs from ${ballsLeft} balls`,
        summary: `The chase is heating up with ${wicketsInHand} wickets in hand. Required run rate of ${currentInnings.requiredRunRate.toFixed(2)} puts pressure on the batting side, but with quality batters at the crease, this match is far from over.`,
        keyPoints: [
          `Current run rate: ${currentInnings.runRate.toFixed(2)} vs Required: ${currentInnings.requiredRunRate.toFixed(2)}`,
          `${wicketsInHand} wickets in hand - crucial for the chase`,
          'Death overs will be decisive',
          'Momentum has shifted multiple times',
        ],
        prediction: wicketsInHand > 5 && currentInnings.runRate > currentInnings.requiredRunRate - 2
          ? 'Batting team holds slight advantage'
          : 'Bowling team has edge in this contest',
      };
    }

    return {
      headline: `${match.teams.home.name} set ${currentInnings.runs}/${currentInnings.wickets}`,
      summary: `A competitive total has been posted on the board. The batting side put up a strong show with consistent contributions throughout the innings.`,
      keyPoints: [
        `Total: ${currentInnings.runs}/${currentInnings.wickets} in ${currentInnings.overs}.${currentInnings.balls} overs`,
        `Run rate: ${currentInnings.runRate.toFixed(2)}`,
        'Key partnerships built the innings',
        'Death overs performance was crucial',
      ],
      prediction: currentInnings.runs > 170 
        ? 'Challenging target set for the chasing team' 
        : 'Competitive total - match in balance',
    };
  };

  const summary = generateSummary();

  return (
    <div className="card overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-secondary/20 via-primary-50 to-accent/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white dark:bg-primary rounded-lg shadow-lg">
            <Bot className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              AI Match Analysis
              <Sparkles className="w-4 h-4 text-accent" />
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Powered by Cricket AI Engine
            </p>
          </div>
        </div>

        {/* Headline */}
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {summary.headline}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {summary.summary}
        </p>
      </div>

      {/* Key Points */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Key Insights
          </span>
          <ChevronRight
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        </button>

        {isExpanded && (
          <ul className="mt-4 space-y-2">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="w-5 h-5 flex-shrink-0 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-400">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Prediction */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-primary-100 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            AI Prediction:
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {summary.prediction}
          </span>
        </div>
      </div>
    </div>
  );
}
