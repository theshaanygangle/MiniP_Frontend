import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, ShieldCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-blue-50">
      <header className="p-6 md:p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-600 text-center">MindfulChat Connect</h1>
        <p className="text-gray-600 mt-2 text-center text-lg">Mental Health Support Platform</p>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 pb-8">
        <div className="max-w-4xl w-full">
          <Card className="mb-8 shadow-lg border-teal-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2" />
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome to MindfulChat Connect</h2>
              <p className="text-gray-600 mb-6 text-lg">
                We're dedicated to making mental health support accessible to everyone. Our platform connects patients with qualified mental health professionals in a safe, confidential environment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <FeatureCard 
                  icon={<Heart className="text-rose-500" />}
                  title="Personalized Care"
                  description="Take our mental health assessment and receive personalized support based on your needs."
                />
                <FeatureCard 
                  icon={<MessageCircle className="text-blue-500" />}
                  title="Real-time Support"
                  description="Connect with professionals through our secure messaging system whenever you need help."
                />
                <FeatureCard 
                  icon={<ShieldCheck className="text-green-500" />}
                  title="Private & Secure"
                  description="Your privacy is our priority. All conversations are encrypted and confidential."
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-6 h-auto text-lg transition-all"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">How It Works</h3>
            <ol className="space-y-4 max-w-2xl mx-auto">
              <li className="flex gap-3 items-start">
                <span className="bg-teal-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">1</span>
                <p className="text-gray-600"><span className="font-medium">Sign up</span> and create your account as a patient or a doctor.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-teal-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">2</span>
                <p className="text-gray-600"><span className="font-medium">Take our assessment</span> to help us understand your needs (for patients).</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-teal-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">3</span>
                <p className="text-gray-600"><span className="font-medium">Connect with professionals</span> and get the support you need.</p>
              </li>
            </ol>
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MindfulChat Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
