import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      if (authState.user?.role === 'patient') {
        navigate('/patient-quiz');
      } else if (authState.user?.role === 'doctor') {
        navigate('/doctor-dashboard');
      }
    }
  }, [authState.isAuthenticated, authState.isLoading, authState.user?.role, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-blue-50">
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold text-teal-600">MindfulChat Connect</h1>
        <p className="text-gray-600">Mental Health Support Platform</p>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MindfulChat Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;
