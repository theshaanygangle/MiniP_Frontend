import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import MentalHealthQuiz from '@/components/quiz/MentalHealthQuiz';
import QuizResults from '@/components/quiz/QuizResults';

const PatientQuiz = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const { authState } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or if not a patient
  useEffect(() => {
    if (!authState.isLoading) {
      if (!authState.isAuthenticated) {
        navigate('/auth');
      } else if (authState.user?.role !== 'patient') {
        navigate('/doctor-dashboard');
      }
    }
  }, [authState.isAuthenticated, authState.isLoading, authState.user?.role, navigate]);

  const handleQuizComplete = (result) => {
    setQuizResults(result);
    setQuizCompleted(true);
    
    // In a real app, save the quiz result to the backend
    console.log('Quiz completed with result:', result);
  };

  const handleContinue = () => {
    navigate('/patient-dashboard');
  };

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-teal-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-blue-50">
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold text-teal-600">Mental Health Assessment</h1>
        <p className="text-gray-600 mb-8">
          Please complete this assessment to help us understand your current mental health needs.
        </p>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        {!quizCompleted ? (
          <MentalHealthQuiz onComplete={handleQuizComplete} />
        ) : (
          quizResults && (
            <QuizResults 
              score={quizResults.score} 
              riskLevel={quizResults.riskLevel} 
              onContinue={handleContinue} 
            />
          )
        )}
      </main>
      
      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MindfulChat Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatientQuiz;
