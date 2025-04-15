import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut, User } from 'lucide-react';
import DoctorsList from '@/components/chat/DoctorsList';
import ChatWindow from '@/components/chat/ChatWindow';

const PatientDashboard = () => {
  const { authState, logout } = useAuth();
  const { availableDoctors } = useSocket();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
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
  
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-teal-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-teal-600">MindfulChat Connect</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-2 mr-2">
                <User className="h-5 w-5 text-teal-600" />
              </div>
              <span className="font-medium">{authState.user?.name}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-lg font-medium mb-4">Available Doctors</h2>
          <DoctorsList 
            doctors={availableDoctors} 
            onSelectDoctor={handleSelectDoctor}
            selectedDoctorId={selectedDoctor?.id}
          />
        </div>
        
        <Separator orientation="vertical" className="hidden md:block" />
        
        <div className="w-full md:w-2/3">
          {selectedDoctor ? (
            <ChatWindow partner={selectedDoctor} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <User className="mx-auto h-12 w-12 mb-2" />
                <h2 className="text-xl font-medium mb-2">Select a doctor to start chatting</h2>
                <p>Choose from the list on the left to begin a conversation.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t p-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MindfulChat Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;