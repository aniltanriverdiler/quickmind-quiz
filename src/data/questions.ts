export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Which company developed React?",
    options: ["Google", "Meta", "Twitter", "Microsoft"],
    correctAnswer: "Meta",
  },
  {
    id: 2,
    question: "Which hook is most commonly used for state management in React?",
    options: ["useEffect", "useState", "useMemo", "useRef"],
    correctAnswer: "useState",
  },
  {
    id: 3,
    question: "React components are written using which language?",
    options: ["TypeScript", "JSX", "HTML", "Sass"],
    correctAnswer: "JSX",
  },
  {
    id: 4,
    question: "What is React Router used for?",
    options: [
      "Database operations",
      "Page navigation",
      "State management",
      "Adding animations",
    ],
    correctAnswer: "Page navigation",
  },
  {
    id: 5,
    question: "What is the most popular method for styling in a React project?",
    options: [
      "TailwindCSS",
      "Bootstrap",
      "Styled Components",
      "All of them can be used",
    ],
    correctAnswer: "All of them can be used",
  },
];
