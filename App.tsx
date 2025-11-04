
import React, { useState, useCallback } from 'react';
import { PredictionResult } from './types';
import { parseMatchUrl } from './utils/urlParser';
import { generatePrediction } from './services/geminiService';
import PredictionForm from './components/PredictionForm';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [useHT, setUseHT] = useState<boolean>(false);
  const [htHome, setHtHome] = useState<number>(0);
  const [htAway, setHtAway] = useState<number>(0);

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [teamNames, setTeamNames] = useState<{ home: string; away: string } | null>(null);

  const handlePredict = useCallback(async () => {
    setError(null);
    setPrediction(null);
    
    if (!url.trim()) {
      setError("Please enter a valid match link.");
      return;
    }
    
    const parsedTeams = parseMatchUrl(url);
    if (!parsedTeams.home || !parsedTeams.away) {
      setError("Could not parse team names from the provided URL. Please use a valid BeSoccer match link.");
      return;
    }
    
    setTeamNames(parsedTeams as { home: string; away: string });
    setIsLoading(true);

    try {
      const htScore = useHT ? `${htHome}-${htAway}` : null;
      const result = await generatePrediction(parsedTeams.home, parsedTeams.away, city, htScore);
      setPrediction(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate prediction. The model may be unavailable or the request could not be processed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [url, city, useHT, htHome, htAway]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            ⚽ D7A0HO Football Predictor
          </h1>
          <p className="text-lg text-cyan-400">
            AI-Powered Analysis: EMA + Weather + Poisson + Half-Time Logic
          </p>
        </header>

        <main>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700">
            <PredictionForm
              url={url}
              setUrl={setUrl}
              city={city}
              setCity={setCity}
              useHT={useHT}
              setUseHT={setUseHT}
              htHome={htHome}
              setHtHome={setHtHome}
              htAway={htAway}
              setHtAway={setHtAway}
              onPredict={handlePredict}
              isLoading={isLoading}
            />
          </div>

          <div className="mt-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-2xl border border-gray-700">
                <Spinner />
                <p className="mt-4 text-lg text-cyan-400 animate-pulse">Analyzing match data...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {prediction && teamNames && (
              <ResultsDisplay prediction={prediction} teamNames={teamNames} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
