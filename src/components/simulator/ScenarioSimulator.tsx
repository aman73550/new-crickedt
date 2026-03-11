'use client';

import { useState, useMemo } from 'react';
import { MatchScenario, SimulationResult } from '@/types/cricket';
import { Play, RefreshCw, TrendingUp, Target, Zap } from 'lucide-react';

interface ScenarioSimulatorProps {
  initialScenario: MatchScenario;
  team1Name: string;
  team2Name: string;
}

export default function ScenarioSimulator({ 
  initialScenario, 
  team1Name, 
  team2Name 
}: ScenarioSimulatorProps) {
  const [scenario, setScenario] = useState<MatchScenario>(initialScenario);
  const [isSimulating, setIsSimulating] = useState(false);

  // Calculate simulation result based on scenario
  const simulationResult = useMemo((): SimulationResult => {
    const { runs, wickets, target, oversRemaining } = scenario;
    const runsNeeded = target - runs;
    const ballsRemaining = oversRemaining * 6;
    const requiredRunRate = ballsRemaining > 0 ? (runsNeeded / ballsRemaining) * 6 : 0;
    const wicketsInHand = 10 - wickets;

    // Simple win probability calculation
    let battingWinProb = 50;

    // Factor: Required run rate
    if (requiredRunRate > 12) battingWinProb -= 25;
    else if (requiredRunRate > 10) battingWinProb -= 15;
    else if (requiredRunRate > 8) battingWinProb -= 5;
    else if (requiredRunRate < 6) battingWinProb += 15;
    else if (requiredRunRate < 8) battingWinProb += 5;

    // Factor: Wickets in hand
    if (wicketsInHand >= 8) battingWinProb += 15;
    else if (wicketsInHand >= 6) battingWinProb += 10;
    else if (wicketsInHand <= 3) battingWinProb -= 20;
    else if (wicketsInHand <= 5) battingWinProb -= 10;

    // Factor: Overs remaining
    if (oversRemaining <= 2 && runsNeeded > 24) battingWinProb -= 20;
    if (oversRemaining >= 8 && runsNeeded < 60) battingWinProb += 10;

    battingWinProb = Math.max(5, Math.min(95, battingWinProb));

    // Projected score calculation
    const avgRunsPerBall = wicketsInHand > 5 ? 1.3 : wicketsInHand > 3 ? 1.1 : 0.9;
    const expectedAdditional = ballsRemaining * avgRunsPerBall;
    
    return {
      scenario,
      winProbability: {
        batting: battingWinProb,
        bowling: 100 - battingWinProb,
      },
      projectedScore: {
        min: runs + Math.floor(expectedAdditional * 0.7),
        max: runs + Math.ceil(expectedAdditional * 1.3),
        expected: runs + Math.round(expectedAdditional),
      },
      keyFactors: [
        `Required rate: ${requiredRunRate.toFixed(2)}`,
        `${wicketsInHand} wickets in hand`,
        `${ballsRemaining} balls remaining`,
      ],
    };
  }, [scenario]);

  const handleReset = () => {
    setScenario(initialScenario);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 500);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-secondary" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Match Scenario Simulator
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-100 transition-colors"
          title="Reset to current match state"
        >
          <RefreshCw className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Runs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Runs
          </label>
          <input
            type="number"
            min={0}
            max={scenario.target - 1}
            value={scenario.runs}
            onChange={(e) => setScenario({ ...scenario, runs: parseInt(e.target.value) || 0 })}
            className="input py-2"
          />
        </div>

        {/* Wickets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Wickets
          </label>
          <input
            type="number"
            min={0}
            max={9}
            value={scenario.wickets}
            onChange={(e) => setScenario({ ...scenario, wickets: parseInt(e.target.value) || 0 })}
            className="input py-2"
          />
        </div>

        {/* Target */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target
          </label>
          <input
            type="number"
            min={scenario.runs + 1}
            value={scenario.target}
            onChange={(e) => setScenario({ ...scenario, target: parseInt(e.target.value) || 0 })}
            className="input py-2"
          />
        </div>

        {/* Overs Remaining */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Overs Left
          </label>
          <input
            type="number"
            min={0}
            max={20}
            step={0.1}
            value={scenario.oversRemaining}
            onChange={(e) => setScenario({ ...scenario, oversRemaining: parseFloat(e.target.value) || 0 })}
            className="input py-2"
          />
        </div>
      </div>

      {/* Quick Adjustments */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setScenario({ ...scenario, wickets: Math.min(9, scenario.wickets + 1) })}
          className="px-3 py-1 text-sm bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors"
        >
          + Wicket
        </button>
        <button
          onClick={() => setScenario({ ...scenario, runs: scenario.runs + 6 })}
          className="px-3 py-1 text-sm bg-success/10 text-success rounded-full hover:bg-success/20 transition-colors"
        >
          + Six
        </button>
        <button
          onClick={() => setScenario({ ...scenario, runs: scenario.runs + 4 })}
          className="px-3 py-1 text-sm bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
        >
          + Four
        </button>
        <button
          onClick={() => setScenario({ ...scenario, oversRemaining: Math.max(0, scenario.oversRemaining - 1) })}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          - 1 Over
        </button>
      </div>

      {/* Simulation Button */}
      <button
        onClick={handleSimulate}
        disabled={isSimulating}
        className="w-full btn-primary flex items-center justify-center gap-2 mb-6"
      >
        <Play className={`w-4 h-4 ${isSimulating ? 'animate-pulse' : ''}`} />
        {isSimulating ? 'Simulating...' : 'Simulate Scenario'}
      </button>

      {/* Results */}
      <div className={`space-y-4 transition-all duration-300 ${isSimulating ? 'opacity-50' : ''}`}>
        {/* Win Probability */}
        <div className="bg-gray-50 dark:bg-primary-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Win Probability
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{team2Name}</p>
              <p className="text-2xl font-bold text-secondary">
                {simulationResult.winProbability.batting.toFixed(1)}%
              </p>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${simulationResult.winProbability.batting}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{team1Name}</p>
              <p className="text-2xl font-bold text-accent">
                {simulationResult.winProbability.bowling.toFixed(1)}%
              </p>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${simulationResult.winProbability.bowling}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Projected Score */}
        <div className="bg-gray-50 dark:bg-primary-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Projected Score Range
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {simulationResult.projectedScore.min}
            </span>
            <div className="flex-1 mx-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative">
              <div
                className="absolute top-0 bottom-0 bg-secondary/30 rounded-full"
                style={{
                  left: '0%',
                  right: '0%',
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full border-2 border-white dark:border-primary shadow-lg"
                style={{
                  left: `${((simulationResult.projectedScore.expected - simulationResult.projectedScore.min) / 
                    (simulationResult.projectedScore.max - simulationResult.projectedScore.min)) * 100}%`,
                }}
              />
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {simulationResult.projectedScore.max}
            </span>
          </div>
          <p className="text-center mt-2 text-lg font-bold text-secondary">
            Expected: {simulationResult.projectedScore.expected}
          </p>
        </div>

        {/* Key Factors */}
        <div className="flex flex-wrap gap-2">
          {simulationResult.keyFactors.map((factor, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
