import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Game } from '../types';
import { ArrowLeft } from 'lucide-react';

export default function GameCreate() {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState<'9-Hole' | '18-Hole'>('18-Hole');
  const navigate = useNavigate();
  const { user, setCurrentGame } = useStore();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseName.trim() && user) {
      const newGame: Game = {
        id: Date.now().toString(),
        pin: Math.floor(1000 + Math.random() * 9000).toString(),
        courseName,
        courseType,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        players: [{ id: user.id, username: user.username, scores: [] }]
      };
      setCurrentGame(newGame);
      navigate(`/game/${newGame.pin}`);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 mb-8 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Create Game</h2>
        <p className="text-gray-600 mb-6">Create a new game for others to join!</p>

        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCourseType('9-Hole')}
              className={`p-4 text-center rounded-lg border ${
                courseType === '9-Hole'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              9-Hole Course
            </button>
            <button
              type="button"
              onClick={() => setCourseType('18-Hole')}
              className={`p-4 text-center rounded-lg border ${
                courseType === '18-Hole'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              18-Hole Course
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 py-3 px-4 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
}