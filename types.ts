
export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface UsageMetric {
  date: string;
  requests: number;
  accuracy: number;
}

export interface PredictionRecord {
  id: string;
  userId: string;
  timestamp: number;
  imageUrl: string;
  predictedText: string;
  confidence: number;
  language: string;
  probabilities: { label: string; value: number }[];
}

export interface RecognitionResult {
  text: string;
  confidence: number;
  language: string;
  probabilities: { label: string; value: number }[];
}
