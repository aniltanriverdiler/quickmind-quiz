import { create } from "zustand";
import {
  questions,
  type Question,
  type Category,
  type Difficulty,
} from "../data/questions";

type AnswerStatus = "correct" | "wrong" | "skipped";

type UserAnswer = {
  /** Index of the question in the current quiz set */
  questionIndex: number;
  question: string;
  selectedAnswer?: string;
  correctAnswer: string;
  status: AnswerStatus;
};

type QuizStore = {
  // Selection
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty | null;
  setCategory: (category: Category) => void;
  setDifficulty: (difficulty: Difficulty) => void;

  // Runtime state
  currentQuestion: number;
  score: number; // total points; also equals correctCount
  correctCount: number; // kept explicitly per requirement
  wrongCount: number;
  skippedCount: number;
  shuffledQuestions: Question[]; // questions for the chosen category & difficulty
  userAnswers: UserAnswer[];

  // Actions
  initializeQuiz: (category: Category, difficulty: Difficulty) => void;
  answerQuestion: (isCorrect: boolean, selectedAnswer: string) => void;
  nextQuestion: () => void;
  skipQuestion: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  selectedCategory: null,
  selectedDifficulty: null,
  setCategory: (category) => set(() => ({ selectedCategory: category })),
  setDifficulty: (difficulty) => set(() => ({ selectedDifficulty: difficulty })),

  currentQuestion: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  skippedCount: 0,
  shuffledQuestions: [],
  userAnswers: [],

  // Initialize quiz with selected category and difficulty
  initializeQuiz: (category, difficulty) => {
    const base = questions[category][difficulty] ?? [];
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    set(() => ({
      selectedCategory: category,
      selectedDifficulty: difficulty,
      currentQuestion: 0,
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      skippedCount: 0,
      shuffledQuestions: shuffled,
      userAnswers: [],
    }));
  },

  // User answers a question (correct or wrong)
  answerQuestion: (isCorrect, selectedAnswer) => {
    const { currentQuestion, shuffledQuestions, userAnswers } = get();
    const currentQ = shuffledQuestions[currentQuestion];

    set((state) => ({
      score: isCorrect ? state.score + 1 : state.score,
      correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      wrongCount: isCorrect ? state.wrongCount : state.wrongCount + 1,
      userAnswers: [
        ...userAnswers,
        {
          questionIndex: currentQuestion,
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
          questionIndex: currentQuestion,
          question: currentQ.question,
          correctAnswer: currentQ.correctAnswer,
          status: "skipped",
        },
      ],
    }));
  },

  // Reset quiz (start fresh). Keeps last selection, re-shuffles the same set if available.
  resetQuiz: () => {
    const { selectedCategory, selectedDifficulty } = get();
    if (selectedCategory && selectedDifficulty) {
      const base = questions[selectedCategory][selectedDifficulty] ?? [];
      const shuffled = [...base].sort(() => Math.random() - 0.5);
      set(() => ({
        currentQuestion: 0,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        skippedCount: 0,
        shuffledQuestions: shuffled,
        userAnswers: [],
      }));
    } else {
      // No selection yet; just clear state
      set(() => ({
        currentQuestion: 0,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        skippedCount: 0,
        shuffledQuestions: [],
        userAnswers: [],
      }));
    }
  },
}));
