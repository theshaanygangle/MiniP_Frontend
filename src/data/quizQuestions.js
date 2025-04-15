export const mentalHealthQuestions = [
  {
    id: 1,
    question:
      "How often have you felt down, depressed, or hopeless over the past two weeks?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 2,
    question:
      "How often have you had little interest or pleasure in doing things over the past two weeks?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 3,
    question: "How would you rate your sleep quality over the past two weeks?",
    options: ["Very good", "Good", "Fair", "Poor", "Very poor"],
  },
  {
    id: 4,
    question:
      "How often have you experienced feelings of anxiety or worry that were difficult to control?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 5,
    question: "How would you rate your energy levels on most days?",
    options: ["Excellent", "Good", "Average", "Poor", "Very poor"],
  },
  {
    id: 6,
    question: "How often do you feel overwhelmed by your responsibilities?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 7,
    question: "How well have you been able to concentrate on tasks recently?",
    options: [
      "Extremely well",
      "Very well",
      "Moderately well",
      "Slightly well",
      "Not well at all",
    ],
  },
  {
    id: 8,
    question:
      "How often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
  {
    id: 9,
    question:
      "How would you rate your social interactions and relationships currently?",
    options: [
      "Very satisfying",
      "Satisfying",
      "Neutral",
      "Unsatisfying",
      "Very unsatisfying",
    ],
  },
  {
    id: 10,
    question:
      "How often do you feel confident in handling your personal problems?",
    options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
  },
];

export const scoreQuiz = (answers) => {
  let totalScore = 0;

  answers.forEach((answer) => {
    const question = mentalHealthQuestions.find(
      (q) => q.id === answer.questionId
    );
    if (!question) return;

    const index = question.options.indexOf(answer.answer);

    const negativeQuestions = [1, 2, 4, 6, 8];
    const positiveQuestions = [3, 5, 7, 9, 10];

    if (negativeQuestions.includes(question.id)) {
      totalScore += index;
    } else if (positiveQuestions.includes(question.id)) {
      totalScore += question.options.length - 1 - index;
    }
  });

  let riskLevel;
  const maxPossibleScore = 40;
  const scorePercentage = (totalScore / maxPossibleScore) * 100;

  if (scorePercentage < 30) {
    riskLevel = "low";
  } else if (scorePercentage < 70) {
    riskLevel = "moderate";
  } else {
    riskLevel = "high";
  }

  return { score: totalScore, riskLevel };
};
