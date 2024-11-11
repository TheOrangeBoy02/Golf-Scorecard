import React, { useState } from 'react';
import { useStore } from '../store';

export default function Login() {
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const setUser = useStore((state) => state.setUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setUser({ id: Date.now().toString(), username });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Login to Play!</h2>
        <div className="w-24 h-24 mx-auto mb-8">
          {/* Golf flag icon placeholder */}
          <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl">⛳</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 py-2 block w-full align-middle text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Username/Email Address"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 py-2 px-4 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-green-600 hover:text-green-500">
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
}