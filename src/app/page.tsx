'use client';

import { useState } from 'react';
import LiveMatchCard from '@/components/match/LiveMatchCard';
import WinProbabilityChart from '@/components/charts/WinProbabilityChart';
import PressureIndexMeter from '@/components/charts/PressureIndexMeter';
import MomentumShiftCard from '@/components/insights/MomentumShiftCard';
import TurningPointAlert from '@/components/insights/TurningPointAlert';
import ImpactPlayerCard from '@/components/insights/ImpactPlayerCard';
import PredictionPoll from '@/components/engagement/PredictionPoll';
import AIMatchSummary from '@/components/insights/AIMatchSummary';
import {
  mockLiveMatches,
  mockUpcomingMatches,
  mockWinProbabilityTimeline,
  mockPressureIndexData,
  mockMomentumShifts,
  mockTurningPoints,
  mockImpactPlayers,
  mockPredictionPolls,
} from '@/lib/data/mockData';
import { Activity, Calendar, TrendingUp, Zap, Users, Target } from 'lucide-react';

export default function HomePage() {
  const [selectedMatch, setSelectedMatch] = useState(mockLiveMatches[0]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Cricket AI Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time analytics and AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-danger/10 rounded-full">
            <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-danger">
              {mockLiveMatches.length} Live Matches
            </span>
          </div>
        </div>
      </div>

      {/* Live Matches Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-secondary" />
          <h2 className="section-title mb-0">Live Matches</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockLiveMatches.map((match) => (
            <LiveMatchCard
              key={match.id}
              match={match}
              isSelected={selectedMatch?.id === match.id}
              onClick={() => setSelectedMatch(match)}
            />
          ))}
        </div>
      </section>

      {/* Main Analytics Dashboard */}
      {selectedMatch && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Win Probability Chart */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Win Probability
                </h3>
              </div>
              <WinProbabilityChart
                data={mockWinProbabilityTimeline}
                team1={selectedMatch.teams.home}
                team2={selectedMatch.teams.away}
              />
            </div>

            {/* AI Match Summary */}
            <AIMatchSummary match={selectedMatch} />

            {/* Momentum & Turning Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Momentum Shifts
                  </h3>
                </div>
                {mockMomentumShifts.slice(0, 3).map((shift, index) => (
                  <MomentumShiftCard key={index} shift={shift} />
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Turning Points
                  </h3>
                </div>
                {mockTurningPoints.slice(0, 3).map((point, index) => (
                  <TurningPointAlert key={index} turningPoint={point} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="space-y-6">
            {/* Pressure Index */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pressure Index
                </h3>
              </div>
              <PressureIndexMeter
                data={mockPressureIndexData}
                currentValue={mockPressureIndexData[mockPressureIndexData.length - 1]}
              />
            </div>

            {/* Impact Players */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Impact Players
                </h3>
              </div>
              <div className="space-y-3">
                {mockImpactPlayers.slice(0, 3).map((player, index) => (
                  <ImpactPlayerCard key={index} player={player} rank={index + 1} />
                ))}
              </div>
            </div>

            {/* Prediction Poll */}
            <PredictionPoll poll={mockPredictionPolls[0]} />
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-secondary" />
          <h2 className="section-title mb-0">Upcoming Matches</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockUpcomingMatches.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </div>
  );
}
