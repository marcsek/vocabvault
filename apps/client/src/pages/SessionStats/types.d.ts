export interface TPostSessionStatsProps {
  totalTime: number;
  startTime: Date;
  endTime: Date;
  correct: number;
  incorrect: number;
  maxStreak: number;
  minTries: number;
  accuracy: number;
  answers: TAnswerType[];
  totalTries: number;
  type: 'Practice' | 'Test';
}

export type TAnswerType = {
  word: string;
  answer: string;
  solution: string;
  correct: 'CORRECT' | 'INCORRECT' | 'SEMICORRECT';
  tries: number;
};
