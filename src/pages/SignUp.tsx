import { useState } from 'react';
import { useStore } from '../store';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Update store with user info
      setUser({
        id: result.user.uid,
        username: result.user.displayName || '',
        email: result.user.email || '',
        photoURL: result.user.photoURL || ''
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Create Account</h2>
        <div className="w-24 h-24 mx-auto mb-8">
          <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl">⛳</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="text-green-600 hover:text-green-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
} 