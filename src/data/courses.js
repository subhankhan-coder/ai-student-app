import { uid, mkLessons } from "../utils/helpers";

export const CATEGORIES = ["Programming", "Web Development", "Data & AI", "Cloud & DevOps", "BI & Analytics"];

const COURSE_DEFS = [
  ["Python Programming", "Programming", "Beginner", "R. Kapoor", ["Python Basics & Syntax", "Data Structures in Python", "Functions & Modules", "File Handling"], "Cheat Sheet: Python Built-ins", "Build a command-line to-do app"],
  ["Java Fundamentals", "Programming", "Beginner", "S. Nair", ["Java Syntax & OOP Basics", "Classes & Objects", "Collections Framework", "Exception Handling"], "OOP Concepts Reference", "Implement a simple bank account class"],
  ["JavaScript Essentials", "Web Development", "Beginner", "A. Mehta", ["JS Fundamentals", "DOM Manipulation", "Async & Promises", "ES6+ Features"], "Async/Await Cheat Sheet", "Build an interactive to-do list"],
  ["React for Beginners", "Web Development", "Beginner", "A. Mehta", ["Components & Props", "State & Hooks", "Routing Basics", "Forms in React"], "React Hooks Reference", "Build a multi-page React app"],
  ["Node.js & Express", "Web Development", "Intermediate", "K. Verma", ["Node.js Fundamentals", "Building REST APIs", "Middleware & Auth", "Connecting to Databases"], "REST API Design Notes", "Build a REST API for a blog"],
  ["SQL for Everyone", "Data & AI", "Beginner", "Dr. S. Iyer", ["SQL Basics: SELECT & WHERE", "Joins & Relationships", "Aggregation & Grouping", "Subqueries & Views"], "SQL Joins Cheat Sheet", "Write queries against a sample sales DB"],
  ["MongoDB Fundamentals", "Data & AI", "Beginner", "K. Verma", ["Documents & Collections", "CRUD Operations", "Aggregation Pipeline", "Indexing Basics"], "MongoDB Query Reference", "Model a blog schema in MongoDB"],
  ["Power BI for Analysts", "BI & Analytics", "Beginner", "P. Sharma", ["Power BI Interface", "Data Modeling Basics", "DAX Fundamentals", "Building Dashboards"], "DAX Formula Reference", "Build a sales performance dashboard"],
  ["Data Analytics Fundamentals", "BI & Analytics", "Beginner", "P. Sharma", ["Intro to Data Analytics", "Data Cleaning Techniques", "Exploratory Data Analysis", "Storytelling with Data"], "EDA Checklist", "Analyze a public retail dataset"],
  ["Machine Learning Foundations", "Data & AI", "Intermediate", "Dr. S. Iyer", ["ML Workflow Overview", "Regression Models", "Classification Models", "Model Evaluation"], "Evaluation Metrics Summary", "Train a regression model on housing data"],
  ["Artificial Intelligence Basics", "Data & AI", "Intermediate", "Dr. N. Rao", ["What is AI?", "Search & Planning", "Neural Networks Intro", "AI Ethics & Bias"], "AI Concepts Glossary", "Build a simple rule-based agent"],
  ["Data Science Bootcamp", "Data & AI", "Advanced", "Dr. S. Iyer", ["The Data Science Lifecycle", "Feature Engineering", "Model Deployment Basics", "Communicating Results"], "Feature Engineering Guide", "End-to-end project on a Kaggle dataset"],
  ["Full-Stack Web Development", "Web Development", "Intermediate", "A. Mehta", ["Frontend with React", "Backend with Node.js", "Databases & APIs", "Deployment"], "Full-Stack Architecture Notes", "Build and deploy a full-stack app"],
  ["Cloud Computing Fundamentals", "Cloud & DevOps", "Beginner", "K. Verma", ["What is Cloud Computing", "IaaS vs PaaS vs SaaS", "Core Cloud Services", "Cloud Security Basics"], "Cloud Service Models", "Deploy a static site to the cloud"],
  ["AWS Cloud Practitioner", "Cloud & DevOps", "Beginner", "K. Verma", ["AWS Global Infrastructure", "Core AWS Services (EC2, S3)", "IAM & Security", "Billing & Pricing"], "AWS Services Cheat Sheet", "Launch and configure an EC2 instance"],
  ["DevOps Essentials", "Cloud & DevOps", "Intermediate", "K. Verma", ["CI/CD Concepts", "Docker Fundamentals", "Infrastructure as Code", "Monitoring & Logging"], "CI/CD Pipeline Reference", "Containerize a sample app with Docker"],
];

const PROGRESS_SEED = [55, 30, 70, 20, 0, 65, 0, 40, 0, 15, 0, 0, 25, 100, 0, 0];

export const COURSES = COURSE_DEFS.map(([title, category, level, instructor, lessonTitles, noteTitle, assignmentTitle], i) => {
  const progress = PROGRESS_SEED[i];
  const doneCount = Math.round((progress / 100) * lessonTitles.length);
  return {
    id: `c${i + 1}`, title, category, level, instructor,
    hours: 10 + (i % 5) * 6, rating: (4.4 + (i % 6) * 0.1).toFixed(1), enrolled: 180 + i * 37,
    lessons: mkLessons(lessonTitles, doneCount),
    notes: [{ id: uid("n"), title: noteTitle, pages: 5 + (i % 6), size: `${(0.5 + (i % 5) * 0.3).toFixed(1)} MB` }],
    assignments: [{ id: uid("a"), title: assignmentTitle, dueDate: "Aug " + (2 + i) + ", 2026", status: i % 5 === 0 ? "Graded" : i % 3 === 0 ? "Submitted" : "Not submitted", grade: i % 5 === 0 ? `${78 + (i % 20)}/100` : null }],
  };
});

/* A brand-new student hasn't watched any lessons, submitted any assignments,
   or attempted any quizzes yet — used to reset all seeded demo progress on registration. */
export const freshCourses = () => COURSES.map((c) => ({
  ...c,
  lessons: c.lessons.map((l) => ({ ...l, completed: false })),
  assignments: c.assignments.map((a) => ({ ...a, status: "Not submitted", grade: null })),
}));
