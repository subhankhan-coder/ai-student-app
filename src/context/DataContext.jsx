import { createContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { COURSES, freshCourses } from "../data/courses";
import { QUIZZES, freshQuizzes } from "../data/quizzes";
import { JOBS, COMPANIES, INITIAL_APPLICATIONS } from "../data/jobs";
import { STUDENTS, CERT_TEMPLATES } from "../data/admin";
import { INITIAL_NOTIFICATIONS } from "../data/notifications";
import { blankResume, uid } from "../utils/helpers";

export const DataContext = createContext(null);

const DEFAULT_RESUME = {
  name: "Aditi Sharma", title: "Aspiring Software Engineer", email: "aditi.sharma@mail.com", phone: "+91 98765 43210",
  summary: "Final-year Computer Science student with hands-on project experience in full-stack development and a strong foundation in data structures & algorithms.",
  skills: "JavaScript, React, Node.js, SQL, Python", education: "B.Tech, Computer Science — XYZ Institute of Technology (2023–2027)",
  experience: "Web Development Intern — NimbusTech (Summer 2026)\nBuilt and shipped 3 internal dashboard features using React and REST APIs.",
  projects: "Campus Event Finder — React + Firebase app used by 500+ students to discover campus events.",
};

const DEFAULT_CHAT = [{ role: "assistant", text: "Hi! I'm your offline AI tutor. Ask me to explain a concept, walk through a problem, or quiz you on something you're studying." }];

export function DataProvider({ children }) {
  const [courses, setCourses] = useLocalStorage("ascent_courses", COURSES);
  const [quizzes, setQuizzes] = useLocalStorage("ascent_quizzes", QUIZZES);
  const [jobs, setJobs] = useLocalStorage("ascent_jobs", JOBS);
  const [companies, setCompanies] = useLocalStorage("ascent_companies", COMPANIES);
  const [students, setStudents] = useLocalStorage("ascent_students", STUDENTS);
  const [applications, setApplications] = useLocalStorage("ascent_applications", INITIAL_APPLICATIONS);
  const [savedJobIds, setSavedJobIds] = useLocalStorage("ascent_saved_jobs", ["j3"]);
  const [notifications, setNotifications] = useLocalStorage("ascent_notifications", INITIAL_NOTIFICATIONS);
  const [certs, setCerts] = useLocalStorage("ascent_certs", CERT_TEMPLATES);
  const [resume, setResume] = useLocalStorage("ascent_resume", DEFAULT_RESUME);
  const [chatHistory, setChatHistory] = useLocalStorage("ascent_chat_history", DEFAULT_CHAT);
  const [codingProgress, setCodingProgress] = useLocalStorage("ascent_coding_progress", []);
  const [interviewProgress, setInterviewProgress] = useLocalStorage("ascent_interview_progress", []);
  const [quizHistory, setQuizHistory] = useLocalStorage("ascent_quiz_history", []);
  const [studyPlan, setStudyPlan] = useLocalStorage("ascent_study_plan", null);

  const toggleLesson = useCallback((courseId, lessonId) => {
    setCourses((cs) => cs.map((c) => c.id !== courseId ? c : { ...c, lessons: c.lessons.map((l) => l.id === lessonId ? { ...l, completed: !l.completed } : l) }));
  }, [setCourses]);

  const submitAssignment = useCallback((courseId, assignmentId) => {
    setCourses((cs) => cs.map((c) => c.id !== courseId ? c : { ...c, assignments: c.assignments.map((a) => a.id === assignmentId ? { ...a, status: "Submitted" } : a) }));
  }, [setCourses]);

  const markNotifRead = useCallback((id) => setNotifications((ns) => ns.map((n) => n.id === id ? { ...n, read: true } : n)), [setNotifications]);
  const markAllNotifRead = useCallback(() => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))), [setNotifications]);

  const toggleSaveJob = useCallback((id) => setSavedJobIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]), [setSavedJobIds]);
  const applyToJob = useCallback((jobId) => {
    setApplications((prev) => [...prev, { id: uid("app"), jobId, status: "Applied", appliedOn: "Jul 25, 2026" }]);
  }, [setApplications]);

  const markProblemSolved = useCallback((courseKey, questionId) => {
    setCodingProgress((prev) => prev.some((p) => p.courseKey === courseKey && p.questionId === questionId)
      ? prev
      : [...prev, { courseKey, questionId, solvedAt: new Date().toISOString() }]);
  }, [setCodingProgress]);

  const addInterviewAttempt = useCallback((attempt) => {
    setInterviewProgress((prev) => [...prev, { id: uid("iv"), date: new Date().toISOString(), ...attempt }]);
  }, [setInterviewProgress]);

  const addQuizHistoryEntry = useCallback((entry) => {
    setQuizHistory((prev) => [...prev, { id: uid("qh"), date: new Date().toISOString(), ...entry }]);
  }, [setQuizHistory]);

  const appendChatMessage = useCallback((message) => setChatHistory((prev) => [...prev, message]), [setChatHistory]);
  const clearChatHistory = useCallback(() => setChatHistory(DEFAULT_CHAT), [setChatHistory]);

  /* A brand-new registration starts from zero instead of the seeded demo history. */
  const resetForNewStudent = useCallback((name, email) => {
    setCourses(freshCourses());
    setQuizzes(freshQuizzes());
    setApplications([]);
    setSavedJobIds([]);
    setCerts([]);
    setResume(blankResume(name, email));
    setChatHistory(DEFAULT_CHAT);
    setCodingProgress([]);
    setInterviewProgress([]);
    setQuizHistory([]);
    setStudyPlan(null);
  }, [setCourses, setQuizzes, setApplications, setSavedJobIds, setCerts, setResume, setChatHistory, setCodingProgress, setInterviewProgress, setQuizHistory, setStudyPlan]);

  const value = {
    courses, setCourses, quizzes, setQuizzes, jobs, setJobs, companies, setCompanies,
    students, setStudents, applications, setApplications, savedJobIds, setSavedJobIds,
    notifications, setNotifications, certs, setCerts, resume, setResume,
    chatHistory, appendChatMessage, clearChatHistory,
    codingProgress, markProblemSolved,
    interviewProgress, addInterviewAttempt,
    quizHistory, addQuizHistoryEntry,
    studyPlan, setStudyPlan,
    toggleLesson, submitAssignment, markNotifRead, markAllNotifRead,
    toggleSaveJob, applyToJob, resetForNewStudent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
