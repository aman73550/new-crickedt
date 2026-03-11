'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  mockLiveMatches, 
  mockWinProbabilityTimeline, 
  mockPressureIndexData,
  mockMomentumShifts,
  mockTurningPoints,
  mockImpactPlayers,
  mockPredictionPolls,
} from '@/lib/data/mockData';
import LiveMatchCard from '@/components/match/LiveMatchCard';
import WinProbabilityChart from '@/components/charts/WinProbabilityChart';
import PressureIndexMeter from '@/components/charts/PressureIndexMeter';
import ManhattanChart from '@/components/charts/ManhattanChart';
import WormChart from '@/components/charts/WormChart';
import MomentumShiftCard from '@/components/insights/MomentumShiftCard';
import TurningPointAlert from '@/components/insights/TurningPointAlert';
import ImpactPlayerCard from '@/components/insights/ImpactPlayerCard';
import AIMatchSummary from '@/components/insights/AIMatchSummary';
import PredictionPoll from '@/components/engagement/PredictionPoll';
import ScenarioSimulator from '@/components/simulator/ScenarioSimulator';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Users, 
  Target, 
  Activity,
  FileText,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'scorecard', label: 'Scorecard', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'insights', label: 'AI Insights', icon: Zap },
  { id: 'commentary', label: 'Commentary', icon: MessageSquare },
];

export default function MatchDetailPage() {
  const params = useParams();
  const matchId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');

  // Find the match
  const match = mockLiveMatches.find(m => m.id === matchId) || mockLiveMatches[0];

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Match not found
        </h1>
        <Link href="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    );
  }

  // Generate mock manhattan data
  const manhattanData = Array.from({ length: 20 }, (_, i) => ({
    over: i + 1,
    runs: Math.floor(Math.random() * 15) + 3,
    wickets: Math.random() > 0.85 ? 1 : 0,
    isPowerplay: i < 6,
    isDeathOvers: i >= 15,
  }));

  // Generate mock worm data
  const team1WormData = Array.from({ length: 20 }, (_, i) => ({
    over: i + 1,
    runs: Math.floor((i + 1) * 9 + Math.random() * 10),
  }));

  const team2WormData = Array.from({ length: 17 }, (_, i) => ({
    over: i + 1,
    runs: Math.floor((i + 1) * 8.5 + Math.random() * 12),
  }));

  const currentInnings = match.innings[match.currentInnings ? match.currentInnings - 1 : 0];

  const initialScenario = {
    currentOver: currentInnings?.overs || 0,
    currentBall: currentInnings?.balls || 0,
    runs: currentInnings?.runs || 0,
    wickets: currentInnings?.wickets || 0,
    target: currentInnings?.target || 188,
    requiredRunRate: currentInnings?.requiredRunRate || 10,
    oversRemaining: currentInnings ? 20 - currentInnings.overs - currentInnings.balls / 6 : 20,
  };

  return (
    <div className="space-y-6">
      {/* Back Button and Match Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {match.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {match.venue.name}, {match.venue.city}
          </p>
        </div>
      </div>

      {/* Match Card */}
      <LiveMatchCard match={match} />

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <nav className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Win Probability */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Win Probability
                  </h3>
                </div>
                <WinProbabilityChart
                  data={mockWinProbabilityTimeline}
                  team1={match.teams.home}
                  team2={match.teams.away}
                />
              </div>

              {/* AI Summary */}
              <AIMatchSummary match={match} />

              {/* Scenario Simulator */}
              <ScenarioSimulator
                initialScenario={initialScenario}
                team1Name={match.teams.home.name}
                team2Name={match.teams.away.name}
              />
            </div>

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

              {/* Prediction Poll */}
              <PredictionPoll poll={mockPredictionPolls[0]} />
            </div>
          </div>
        )}

        {/* Scorecard Tab */}
        {activeTab === 'scorecard' && (
          <div className="space-y-6">
            {match.innings.map((innings, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {innings.battingTeamId === match.teams.home.id 
                    ? match.teams.home.name 
                    : match.teams.away.name} Innings
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {innings.runs}/{innings.wickets}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({innings.overs}.{innings.balls} overs)
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    RR: {innings.runRate.toFixed(2)}
                  </span>
                </div>

                {/* Current Batsmen */}
                {innings.batsmen.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Batting
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <th className="pb-2">Batsman</th>
                            <th className="pb-2 text-right">R</th>
                            <th className="pb-2 text-right">B</th>
                            <th className="pb-2 text-right">4s</th>
                            <th className="pb-2 text-right">6s</th>
                            <th className="pb-2 text-right">SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {innings.batsmen.map((batsman, bIdx) => (
                            <tr key={bIdx} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {batsman.name}
                                  </span>
                                  {batsman.isOnStrike && (
                                    <span className="w-2 h-2 bg-success rounded-full" />
                                  )}
                                </div>
                              </td>
                              <td className="py-2 text-right font-semibold text-gray-900 dark:text-white">
                                {batsman.runs}
                              </td>
                              <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                                {batsman.balls}
                              </td>
                              <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                                {batsman.fours}
                              </td>
                              <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                                {batsman.sixes}
                              </td>
                              <td className="py-2 text-right text-secondary">
                                {batsman.strikeRate.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Current Bowler */}
                {innings.bowlers.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Bowling
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <th className="pb-2">Bowler</th>
                            <th className="pb-2 text-right">O</th>
                            <th className="pb-2 text-right">M</th>
                            <th className="pb-2 text-right">R</th>
                            <th className="pb-2 text-right">W</th>
                            <th className="pb-2 text-right">Econ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {innings.bowlers.map((bowler, bIdx) => (
                            <tr key={bIdx} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-2 font-medium text-gray-900 dark:text-white">
                                {bowler.name}
                              </td>
                              <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                                {bowler.overs}
                              </td>
                              <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                                {bowler.maidens}
                              </td>
                              <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                                {bowler.runs}
                              </td>
                              <td className="py-2 text-right font-semibold text-accent">
                                {bowler.wickets}
                              </td>
                              <td className="py-2 text-right text-secondary">
                                {bowler.economy.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manhattan Chart */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Manhattan Chart
                </h3>
              </div>
              <ManhattanChart data={manhattanData} />
            </div>

            {/* Worm Chart */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Worm Comparison
                </h3>
              </div>
              <WormChart
                team1={match.teams.home}
                team2={match.teams.away}
                team1Data={team1WormData}
                team2Data={team2WormData}
              />
            </div>

            {/* Win Probability Full */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Win Probability Timeline
                </h3>
              </div>
              <WinProbabilityChart
                data={mockWinProbabilityTimeline}
                team1={match.teams.home}
                team2={match.teams.away}
              />
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* AI Summary */}
              <AIMatchSummary match={match} />

              {/* Momentum Shifts */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Momentum Shifts
                  </h3>
                </div>
                <div className="space-y-4">
                  {mockMomentumShifts.map((shift, index) => (
                    <MomentumShiftCard key={index} shift={shift} />
                  ))}
                </div>
              </div>

              {/* Turning Points */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Key Turning Points
                  </h3>
                </div>
                <div className="space-y-4">
                  {mockTurningPoints.map((point, index) => (
                    <TurningPointAlert key={index} turningPoint={point} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Impact Players */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Impact Players
                  </h3>
                </div>
                <div className="space-y-3">
                  {mockImpactPlayers.map((player, index) => (
                    <ImpactPlayerCard key={index} player={player} rank={index + 1} />
                  ))}
                </div>
              </div>

              {/* Pressure Index */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pressure Analysis
                  </h3>
                </div>
                <PressureIndexMeter
                  data={mockPressureIndexData}
                  currentValue={mockPressureIndexData[mockPressureIndexData.length - 1]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Commentary Tab */}
        {activeTab === 'commentary' && (
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ball by Ball Commentary
              </h3>
            </div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-primary-100 rounded-lg">
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                      {16 - i}.{6 - (i % 6)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        i % 5 === 0 ? 'bg-danger/20 text-danger' :
                        i % 4 === 0 ? 'bg-success/20 text-success' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {i % 5 === 0 ? 'W' : i % 4 === 0 ? '6' : i % 3 === 0 ? '4' : '1'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {i % 5 === 0 
                        ? 'OUT! Caught at deep mid-wicket. The batsman tried to go big but found the fielder.'
                        : i % 4 === 0
                        ? 'SIX! Massive hit over long-on. The ball sailed into the stands.'
                        : i % 3 === 0
                        ? 'FOUR! Driven beautifully through the covers.'
                        : 'Pushed to mid-off for a single. Good running between the wickets.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
