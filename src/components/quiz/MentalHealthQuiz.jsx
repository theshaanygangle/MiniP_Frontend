import React, { useState } from 'react';
import { mentalHealthQuestions, scoreQuiz } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const MentalHealthQuiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { toast } = useToast();

  const currentQuestion = mentalHealthQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mentalHealthQuestions.length) * 100;

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex((a) => a.questionId === currentQuestion.id);

    if (existingAnswerIndex !== -1) {
      newAnswers[existingAnswerIndex].answer = answer;
    } else {
      newAnswers.push({ questionId: currentQuestion.id, answer });
    }

    setAnswers(newAnswers);

    if (currentQuestionIndex < mentalHealthQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const result = scoreQuiz(newAnswers);

      toast({
        title: 'Quiz completed',
        description: 'Thank you for completing the assessment.',
      });

      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentAnswer =
    answers.find((a) => a.questionId === currentQuestion.id)?.answer || '';

  return (
    <Card className="quiz-card w-full max-w-3xl mx-auto bg-white">
      <CardHeader className="bg-teal-50 rounded-t-xl">
        <CardTitle className="text-2xl font-semibold text-teal-700">Mental Health Assessment</CardTitle>
        <CardDescription className="text-teal-600">
          Question {currentQuestionIndex + 1} of {mentalHealthQuestions.length}
        </CardDescription>
        <Progress value={progress} className="h-2 bg-teal-100" indicatorClassName="bg-teal-500" />
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

        <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="cursor-pointer flex-grow">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>

      <CardFooter className="flex justify-between p-6 pt-0">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="border-teal-300 text-teal-700"
        >
          Previous
        </Button>

        <Button
          onClick={() => handleAnswer(currentAnswer)}
          disabled={!currentAnswer}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          {currentQuestionIndex < mentalHealthQuestions.length - 1 ? 'Next' : 'Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentalHealthQuiz;
