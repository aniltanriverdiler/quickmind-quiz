import { create } from "zustand";
import { questions } from "../data/questions";

type QuizStore = {
  currentQuestion: number;
  score: number;
  shuffledQuestions: typeof questions;
  answerQuestion: (isCorrect: boolean) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuestion: 0,
  score: 0,
  shuffledQuestions: [...questions].sort(() => Math.random() - 0.5),

  answerQuestion: (isCorrect) =>
    set((state) => ({ score: isCorrect ? state.score + 1 : state.score })),

  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),

  resetQuiz: () =>
    set(() => ({
      currentQuestion: 0,
      score: 0,
      shuffledQuestions: [...questions].sort(() => Math.random() - 0.5),
    })),
}));
