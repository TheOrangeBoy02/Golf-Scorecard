export interface User {
  id: string;
  username: string;
}

export interface Game {
  id: string;
  pin: string;
  courseName: string;
  courseType: '9-Hole' | '18-Hole';
  createdBy: string;
  createdAt: string;
  players: Player[];
}

export interface Player {
  id: string;
  username: string;
  scores: number[];
}

export interface GameHistory {
  id: string;
  courseName: string;
  date: string;
  totalScore: number;
  playerCount: number;
}