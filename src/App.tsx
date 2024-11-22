// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GameCreate from './pages/GameCreate';
import GamePlay from './pages/GamePlay';
import GameHistory from './pages/GameHistory';
import {  LandPlot } from 'lucide-react';

function App() {
  const user = useStore((state) => state.user);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-red-700 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LandPlot className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Golf Scorecard</h1>
            </div>
            {user && <span className="text-sm">Welcome, {user.username}!</span>}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/create" element={user ? <GameCreate /> : <Navigate to="/" />} />
            <Route path="/game/:id" element={user ? <GamePlay /> : <Navigate to="/" />} />
            <Route path="/history" element={user ? <GameHistory /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;