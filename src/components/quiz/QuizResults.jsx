import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, AlertTriangle, ThumbsUp, ArrowRight } from 'lucide-react';

const QuizResults = ({ score, riskLevel, onContinue }) => {
  const renderIcon = () => {
    switch (riskLevel) {
      case 'low':
        return <ThumbsUp className="h-12 w-12 text-green-500" />;
      case 'moderate':
        return <HeartPulse className="h-12 w-12 text-amber-500" />;
      case 'high':
        return <AlertTriangle className="h-12 w-12 text-red-500" />;
      default:
        return null;
    }
  };

  const renderTitle = () => {
    switch (riskLevel) {
      case 'low':
        return "You're doing well!";
      case 'moderate':
        return "Moderate risk detected";
      case 'high':
        return "High risk detected";
      default:
        return "";
    }
  };

  const renderDescription = () => {
    switch (riskLevel) {
      case 'low':
        return "Based on your responses, you appear to be managing well. It's still beneficial to connect with a professional for support and preventive guidance.";
      case 'moderate':
        return "Your responses indicate moderate distress. We recommend connecting with a mental health professional who can provide you with appropriate support and guidance.";
      case 'high':
        return "Your responses indicate significant distress. We strongly recommend connecting with a mental health professional as soon as possible for proper evaluation and support.";
      default:
        return "";
    }
  };

  const getBgColor = () => {
    switch (riskLevel) {
      case 'low':
        return "bg-green-50";
      case 'moderate':
        return "bg-amber-50";
      case 'high':
        return "bg-red-50";
      default:
        return "";
    }
  };

  const getTitleColor = () => {
    switch (riskLevel) {
      case 'low':
        return "text-green-700";
      case 'moderate':
        return "text-amber-700";
      case 'high':
        return "text-red-700";
      default:
        return "";
    }
  };

  return (
    <Card className="quiz-card w-full max-w-3xl mx-auto">
      <CardHeader className={`${getBgColor()} rounded-t-xl text-center`}>
        <div className="mx-auto mb-2">
          {renderIcon()}
        </div>
        <CardTitle className={`text-2xl font-semibold ${getTitleColor()}`}>
          {renderTitle()}
        </CardTitle>
        <CardDescription className="text-gray-700">
          Assessment Results
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-700">
            {renderDescription()}
          </p>

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>You'll be connected to our platform where you can browse available mental health professionals.</li>
              <li>You can initiate conversations with doctors based on your needs and preferences.</li>
              <li>Your assessment results will be available to the professionals you choose to connect with.</li>
              <li>All conversations are secure and confidential.</li>
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={onContinue}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white"
        >
          Continue to Doctor Selection <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
