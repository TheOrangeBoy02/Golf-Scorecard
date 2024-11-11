import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft } from 'lucide-react';

export default function GamePlay() {
  const { id: gamePin } = useParams();
  const navigate = useNavigate();
  const { currentGame, user } = useStore();
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    if (!currentGame || currentGame.pin !== gamePin) {
      navigate('/dashboard');
    }
  }, [currentGame, gamePin, navigate]);

  if (!currentGame) return null;

  const holes = currentGame.courseType === '18-Hole' ? 18 : 9;

  const handleScoreChange = (holeIndex: number, score: string) => {
    const newScore = parseInt(score) || 0;
    const newScores = [...scores];
    newScores[holeIndex] = newScore;
    setScores(newScores);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 mb-8 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{currentGame.courseName}</h2>
          <p className="text-gray-600">Game PIN: {currentGame.pin}</p>
          <p className="text-sm text-gray-500">{currentGame.courseType}</p>
        </div>

        <div className="space-y-4">
          {Array.from({ length: holes }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="w-24 font-medium">Hole {index + 1}</span>
              <input
                type="number"
                min="1"
                value={scores[index] || ''}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Score:</span>
            <span className="text-2xl font-bold">
              {scores.reduce((sum, score) => sum + (score || 0), 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}