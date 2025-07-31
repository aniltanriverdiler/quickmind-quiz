import { create } from "zustand";
import { questions } from "../data/questions";

type AnswerStatus = "correct" | "wrong" | "skipped";

type UserAnswer = {
  questionId: number;
  question: string;
  selectedAnswer?: string;
  correctAnswer: string;
  status: AnswerStatus;
};

type QuizStore = {
  currentQuestion: number;
  score: number;
  wrongCount: number;
  skippedCount: number;
  shuffledQuestions: typeof questions;
  userAnswers: UserAnswer[];
  answerQuestion: (isCorrect: boolean, selectedAnswer: string) => void;
  nextQuestion: () => void;
  skipQuestion: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuestion: 0,
  score: 0,
  wrongCount: 0,
  skippedCount: 0,
  shuffledQuestions: [...questions].sort(() => Math.random() - 0.5),
  userAnswers: [],

  // User answers a question (correct or wrong)
  answerQuestion: (isCorrect, selectedAnswer) => {
    const { currentQuestion, shuffledQuestions, userAnswers } = get();
    const currentQ = shuffledQuestions[currentQuestion];

    set((state) => ({
      score: isCorrect ? state.score + 1 : state.score,
      wrongCount: isCorrect ? state.wrongCount : state.wrongCount + 1,
      userAnswers: [
        ...userAnswers,
        {
          questionId: currentQ.id,
          question: currentQ.question,
          selectedAnswer,
          correctAnswer: currentQ.correctAnswer,
          status: isCorrect ? "correct" : "wrong",
        },
      ],
    }));
  },

  // Go to the next question
  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),

  // User skips the question
  skipQuestion: () => {
    const { currentQuestion, shuffledQuestions, userAnswers } = get();
    const currentQ = shuffledQuestions[currentQuestion];

    set((state) => ({
      skippedCount: state.skippedCount + 1,
      currentQuestion: state.currentQuestion + 1,
      userAnswers: [
        ...userAnswers,
        {
          questionId: currentQ.id,
          question: currentQ.question,
          correctAnswer: currentQ.correctAnswer,
          status: "skipped",
        },
      ],
    }));
  },

  // Reset quiz (start fresh)
  resetQuiz: () =>
    set(() => ({
      currentQuestion: 0,
      score: 0,
      wrongCount: 0,
      skippedCount: 0,
      shuffledQuestions: [...questions].sort(() => Math.random() - 0.5),
      userAnswers: [],
    })),
}));
