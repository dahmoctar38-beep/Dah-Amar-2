
import React from 'react';

interface PredictionFormProps {
  url: string;
  setUrl: (url: string) => void;
  city: string;
  setCity: (city: string) => void;
  useHT: boolean;
  setUseHT: (use: boolean) => void;
  htHome: number;
  setHtHome: (score: number) => void;
  htAway: number;
  setHtAway: (score: number) => void;
  onPredict: () => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({
  url, setUrl, city, setCity, useHT, setUseHT,
  htHome, setHtHome, htAway, setHtAway, onPredict, isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-300 mb-2">
          Match Link (BeSoccer)
        </label>
        <input
          id="url-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.besoccer.com/match/..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city-input" className="block text-sm font-medium text-gray-300 mb-2">
            City (for weather factor, optional)
          </label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. London, Madrid"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-end">
          <div className="relative flex items-start">
            <div className="flex items-center h-5 mt-1">
              <input
                id="ht-checkbox"
                type="checkbox"
                checked={useHT}
                onChange={(e) => setUseHT(e.target.checked)}
                className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-500 rounded bg-gray-700"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="ht-checkbox" className="font-medium text-gray-300">
                Adjust for Half-Time Score
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {useHT && (
        <div className="grid grid-cols-2 gap-6 p-4 bg-gray-700/50 rounded-lg">
          <div>
            <label htmlFor="ht-home" className="block text-sm font-medium text-gray-300 mb-2">HT Home Goals</label>
            <input
              id="ht-home"
              type="number"
              min="0"
              value={htHome}
              onChange={(e) => setHtHome(parseInt(e.target.value, 10))}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="ht-away" className="block text-sm font-medium text-gray-300 mb-2">HT Away Goals</label>
            <input
              id="ht-away"
              type="number"
              min="0"
              value={htAway}
              onChange={(e) => setHtAway(parseInt(e.target.value, 10))}
              className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      <button
        onClick={onPredict}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {isLoading ? 'Generating...' : 'Generate Prediction'}
      </button>
    </div>
  );
};

export default PredictionForm;
