
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        pred_home: { type: Type.NUMBER },
        pred_away: { type: Type.NUMBER },
        prob: { type: Type.NUMBER },
        over15: { type: Type.NUMBER },
        over25: { type: Type.NUMBER },
        hda_home: { type: Type.NUMBER },
        hda_draw: { type: Type.NUMBER },
        hda_away: { type: Type.NUMBER },
        lambda_home: { type: Type.NUMBER },
        lambda_away: { type: Type.NUMBER },
        weather_factor: { type: Type.NUMBER },
        venue: { type: Type.STRING },
    },
    required: [
        'pred_home', 'pred_away', 'prob', 'over15', 'over25', 
        'hda_home', 'hda_draw', 'hda_away', 'lambda_home', 
        'lambda_away', 'weather_factor', 'venue'
    ],
};

const buildPrompt = (homeTeam: string, awayTeam: string, city: string, htScore: string | null): string => {
  return `
You are a sophisticated football match prediction engine named "D7A0HO Phoenix v9.2".
Your analysis is based on a hybrid model that incorporates several factors:
1.  **Team Strength**: You analyze the recent performance of both teams (approximately the last 10 matches) to calculate an Exponential Moving Average (EMA with alpha=0.4) for goals scored and goals conceded. This forms the baseline offensive and defensive strength.
2.  **Weather Impact**: You assess the weather conditions in the provided city. Standard weather conditions (rain, snow, extreme heat/cold, high wind) apply a specific multiplier to the goal expectancies. For example, rain might have a 0.94x multiplier. Neutral weather has a 1.00x multiplier. If no city is provided, assume neutral weather.
3.  **Poisson Distribution**: You use the calculated team strengths, adjusted for weather, as lambda values (expected goals) in a Poisson distribution model to calculate the probability of all possible scorelines up to 6-6.
4.  **Half-Time Adjustment**: If a half-time score is provided, you slightly adjust the lambda values for the second half prediction. A goal scored in the first half slightly increases that team's lambda.

Based on this methodology, analyze the following match and provide the prediction.

- Home Team: ${homeTeam}
- Away Team: ${awayTeam}
- Venue City: ${city || 'Not specified'}
- Half-Time Score (H-A): ${htScore || 'Not provided'}

Your response MUST be a single, valid JSON object, and nothing else. Do not include any text, explanations, or markdown formatting before or after the JSON object.
`;
};

export const generatePrediction = async (
    homeTeam: string,
    awayTeam: string,
    city: string,
    htScore: string | null
): Promise<PredictionResult> => {
    
    const prompt = buildPrompt(homeTeam, awayTeam, city, htScore);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
            temperature: 0.2,
        },
    });

    try {
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result as PredictionResult;
    } catch (e) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("Received an invalid JSON response from the model.");
    }
};
