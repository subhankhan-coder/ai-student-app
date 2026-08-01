export const QUIZZES = [
  { id: "q1", title: "Python Basics", course: "Python Programming", questions: 8, duration: 12, attempts: 2, bestScore: 82 },
  { id: "q2", title: "OOP in Java", course: "Java Fundamentals", questions: 10, duration: 15, attempts: 1, bestScore: 68 },
  { id: "q3", title: "JavaScript Fundamentals", course: "JavaScript Essentials", questions: 10, duration: 15, attempts: 1, bestScore: 74 },
  { id: "q4", title: "React Hooks", course: "React for Beginners", questions: 8, duration: 12, attempts: 0, bestScore: null },
  { id: "q5", title: "SQL Joins", course: "SQL for Everyone", questions: 8, duration: 10, attempts: 1, bestScore: 90 },
  { id: "q6", title: "Regression Models", course: "Machine Learning Foundations", questions: 8, duration: 15, attempts: 0, bestScore: null },
  { id: "q7", title: "Cloud Service Models", course: "Cloud Computing Fundamentals", questions: 6, duration: 10, attempts: 0, bestScore: null },
];

export const freshQuizzes = () => QUIZZES.map((q) => ({ ...q, attempts: 0, bestScore: null }));

export const QUIZ_BANK = {
  q1: [
    { q: "Which keyword defines a function in Python?", options: ["func", "def", "function", "lambda"], a: 1 },
    { q: "What data type is returned by input()?", options: ["int", "float", "str", "bool"], a: 2 },
    { q: "Which of these creates a list?", options: ["{}", "()", "[]", "<>"], a: 2 },
    { q: "What does len() return for a string?", options: ["Its memory size", "Its character count", "Its type", "Its index"], a: 1 },
  ],
  q2: [
    { q: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], a: 1 },
    { q: "Which collection does not allow duplicates?", options: ["List", "ArrayList", "Set", "Map"], a: 2 },
    { q: "What is the default value of a boolean field?", options: ["true", "false", "null", "0"], a: 1 },
  ],
  q3: [
    { q: "Which keyword declares a block-scoped variable?", options: ["var", "let", "global", "define"], a: 1 },
    { q: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference only"], a: 2 },
    { q: "Which method parses JSON text into an object?", options: ["JSON.stringify", "JSON.parse", "JSON.toObject", "Object.parse"], a: 1 },
  ],
  q4: [
    { q: "Which hook manages local component state?", options: ["useEffect", "useState", "useRef", "useMemo"], a: 1 },
    { q: "When does useEffect with an empty array run?", options: ["Every render", "Never", "Once, after first render", "Only on unmount"], a: 2 },
  ],
  q5: [
    { q: "Which JOIN returns unmatched rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], a: 3 },
    { q: "What does GROUP BY do?", options: ["Filters rows", "Sorts rows", "Aggregates rows by column values", "Joins two tables"], a: 2 },
  ],
  q6: [
    { q: "Linear regression minimizes which quantity?", options: ["Accuracy", "Sum of squared errors", "Entropy", "Precision"], a: 1 },
    { q: "Overfitting typically causes:", options: ["Low train, low test error", "High train, high test error", "Low train, high test error", "High train, low test error"], a: 2 },
  ],
  q7: [
    { q: "IaaS stands for:", options: ["Infrastructure as a Service", "Internet as a Service", "Instance as a Service", "Interface as a Service"], a: 0 },
    { q: "Which model gives the least management overhead?", options: ["IaaS", "PaaS", "SaaS", "On-premise"], a: 2 },
  ],
};
