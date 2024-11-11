import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, Calendar } from 'lucide-react';

const mockHistory = [
  {
    id: '1',
    courseName: 'Example Course',
    date: '2024-02-20',
    totalScore: 41,
    playerCount: 1
  },
  {
    id: '2',
    courseName: 'Example Course',
    date: '2024-02-19',
    totalScore: 27,
    playerCount: 5
  },
  {
    id: '3',
    courseName: 'Example Course',
    date: '2024-02-18',
    totalScore: 31,
    playerCount: 2
  }
];

export default function GameHistory() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 mb-8 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Game History</h2>
          <p className="text-gray-600">View your previous games and scores</p>
        </div>

        <div className="divide-y divide-gray-200">
          {mockHistory.map((game) => (
            <div key={game.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{game.courseName}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(game.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{game.totalScore}</div>
                  <div className="text-sm text-gray-500">
                    {game.playerCount} {game.playerCount === 1 ? 'Player' : 'Players'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}