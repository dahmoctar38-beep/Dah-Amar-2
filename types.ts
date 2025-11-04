
export interface PredictionResult {
  pred_home: number;
  pred_away: number;
  prob: number;
  over15: number;
  over25: number;
  hda_home: number;
  hda_draw: number;
  hda_away: number;
  lambda_home: number;
  lambda_away: number;
  weather_factor: number;
  venue: string;
}
