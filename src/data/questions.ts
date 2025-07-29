export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "React hangi şirket tarafından geliştirildi?",
    options: ["Google", "Meta", "Twitter", "Microsoft"],
    correctAnswer: "Meta",
  },
  {
    id: 2,
    question: "React’te state yönetimi için en çok kullanılan hook hangisidir?",
    options: ["useEffect", "useState", "useMemo", "useRef"],
    correctAnswer: "useState",
  },
  {
    id: 3,
    question: "React bileşenleri hangi dil ile yazılır?",
    options: ["TypeScript", "JSX", "HTML", "Sass"],
    correctAnswer: "JSX",
  },
  {
    id: 4,
    question: "React Router hangi amaçla kullanılır?",
    options: [
      "Veritabanı işlemleri",
      "Sayfa yönlendirme",
      "State yönetimi",
      "Animasyon ekleme",
    ],
    correctAnswer: "Sayfa yönlendirme",
  },
  {
    id: 5,
    question: "React projesinde stil vermek için en popüler yöntem hangisidir?",
    options: [
      "TailwindCSS",
      "Bootstrap",
      "Styled Components",
      "Hepsi kullanılabilir",
    ],
    correctAnswer: "Hepsi kullanılabilir",
  },
];
