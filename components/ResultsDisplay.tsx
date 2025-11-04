
import React from 'react';
import { PredictionResult } from '../types';
import MetricCard from './MetricCard';

interface ResultsDisplayProps {
  prediction: PredictionResult;
  teamNames: { home: string; away: string };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prediction, teamNames }) => {
  const {
    pred_home, pred_away, prob, over15, over25, hda_home, hda_draw, hda_away,
    lambda_home, lambda_away, weather_factor, venue
  } = prediction;

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
        {teamNames.home} <span className="text-cyan-400">vs</span> {teamNames.away}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard
          label="Predicted Score"
          value={`${pred_home} - ${pred_away}`}
          className="text-4xl text-cyan-300"
        />
        <MetricCard
          label="Exact Score Probability"
          value={`${(prob * 100).toFixed(1)}%`}
        />
        <MetricCard
          label="Over 1.5 Goals"
          value={`${(over15 * 100).toFixed(1)}%`}
        />
        <MetricCard
          label="Over 2.5 Goals"
          value={`${(over25 * 100).toFixed(1)}%`}
        />
        <MetricCard
          label="λ (Home/Away)"
          value={`${lambda_home} / ${lambda_away}`}
        />
        <MetricCard
          label="Weather Factor"
          value={`${weather_factor.toFixed(2)}`}
        />
      </div>

      <div className="bg-gray-700/50 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Win/Draw/Win Probability</h3>
        <div className="flex justify-around items-center text-lg">
          <div className="flex flex-col items-center">
            <span className="text-2xl">🏠</span>
            <span className="font-bold text-green-400">{(hda_home * 100).toFixed(1)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">🤝</span>
            <span className="font-bold text-yellow-400">{(hda_draw * 100).toFixed(1)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-red-400">{(hda_away * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 text-sm text-gray-400">
        Analysis based on venue: {venue}
      </p>
    </div>
  );
};

export default ResultsDisplay;
