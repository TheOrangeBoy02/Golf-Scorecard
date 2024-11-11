import { create } from 'zustand';
import { User, Game } from './types';

interface AppState {
  user: User | null;
  currentGame: Game | null;
  setUser: (user: User | null) => void;
  setCurrentGame: (game: Game | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  currentGame: null,
  setUser: (user) => set({ user }),
  setCurrentGame: (game) => set({ currentGame }),
}));