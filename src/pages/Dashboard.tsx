import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Plus, History } from 'lucide-react';

export default function Dashboard() {
  const [gamePin, setGamePin] = useState('');
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gamePin.trim()) {
      navigate(`/game/${gamePin}`);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome, {user?.username}!</h2>
        <p className="text-gray-600">What would you like to do today?</p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => navigate('/create')}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Game</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-100 text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleJoinGame} className="space-y-4">
          <div>
            <label htmlFor="gamePin" className="block text-sm align-items text-center font-medium text-gray-700">
              Join with Game PIN
            </label>
            <input
              type="text"
              id="gamePin"
              value={gamePin}
              onChange={(e) => setGamePin(e.target.value)}
              className="mt-1 py-2 block w-full rounded-md border-gray-300 items-center text-center shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter game PIN"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>Join Game</span>
          </button>
        </form>

        <button
          onClick={() => navigate('/history')}
          className="flex items-center justify-center space-x-2 bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700"
        >
          <History className="w-5 h-5" />
          <span>View Game History</span>
        </button>
      </div>
    </div>
  );
}