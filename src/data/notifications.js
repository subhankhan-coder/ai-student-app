import { BookOpen, ClipboardList, Mic, Briefcase, Award, CheckCircle2 } from "lucide-react";

export const CATEGORY = {
  course: { label: "New Courses", icon: BookOpen, tone: "navy" },
  quiz: { label: "Upcoming Quizzes", icon: ClipboardList, tone: "amber" },
  interview: { label: "Interview Schedules", icon: Mic, tone: "red" },
  job: { label: "Job Alerts", icon: Briefcase, tone: "green" },
  certificate: { label: "Certificates", icon: Award, tone: "amber" },
  completion: { label: "Course Completion", icon: CheckCircle2, tone: "green" },
};

export const INITIAL_NOTIFICATIONS = [
  { id: "n1", category: "quiz", title: "New quiz available", body: "\"Regression Models\" quiz is now live for Machine Learning Foundations.", time: "2h ago", read: false },
  { id: "n2", category: "interview", title: "Interview reminder", body: "Mock interview practice recommended before your PixelForge interview.", time: "5h ago", read: false },
  { id: "n3", category: "certificate", title: "Certificate issued", body: "Your certificate for Cloud Computing Fundamentals is ready.", time: "1d ago", read: true },
  { id: "n4", category: "job", title: "New job match", body: "NimbusTech posted a Software Engineer Intern role matching your profile.", time: "1d ago", read: true },
  { id: "n5", category: "course", title: "New course added", body: "\"DevOps Essentials\" was just added to Cloud & DevOps.", time: "2d ago", read: true },
  { id: "n6", category: "completion", title: "Milestone reached", body: "You're 70% through JavaScript Essentials — almost there!", time: "3d ago", read: true },
];

export const RANDOM_NOTIF_POOL = [
  { category: "course", title: "New course added", body: "\"AWS Cloud Practitioner\" was just added to Cloud & DevOps." },
  { category: "quiz", title: "New quiz available", body: "\"SQL Joins\" quiz is now live." },
  { category: "job", title: "New job match", body: "Cortex AI posted an ML Research Intern role matching your profile." },
  { category: "certificate", title: "Certificate issued", body: "Your certificate is ready to download." },
];
