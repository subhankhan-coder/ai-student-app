import {
  LayoutDashboard, BookOpen, Bot, ClipboardList, TrendingUp, FileText, ScanSearch,
  Mic, Compass, Briefcase, Award, Bell, User, Users, Building2, BarChart3,
  Calendar, Settings, FileBarChart, Target, Milestone,
} from "lucide-react";

export const STUDENT_NAV = [
  { key: "dashboard", path: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "courses", path: "/student/courses", label: "My Courses", icon: BookOpen },
  { key: "tutor", path: "/student/tutor", label: "AI Tutor Chatbot", icon: Bot },
  { key: "quizzes", path: "/student/quizzes", label: "Quiz & Practice", icon: ClipboardList },
  { key: "planner", path: "/student/planner", label: "Study Planner", icon: Calendar },
  { key: "progress", path: "/student/progress", label: "Progress & Analytics", icon: TrendingUp },
  { key: "resumeBuilder", path: "/student/resume-builder", label: "Resume Builder", icon: FileText },
  { key: "resumeAnalyzer", path: "/student/resume-analyzer", label: "Resume Analyzer", icon: ScanSearch },
  { key: "interview", path: "/student/interview", label: "Interview Preparation", icon: Mic },
  { key: "career", path: "/student/career", label: "Career Guidance", icon: Compass },
  { key: "skillGap", path: "/student/skill-gap", label: "Skill Gap Analysis", icon: Target },
  { key: "roadmap", path: "/student/roadmap", label: "Learning Roadmap", icon: Milestone },
  { key: "jobs", path: "/student/jobs", label: "Job Portal", icon: Briefcase },
  { key: "certificates", path: "/student/certificates", label: "Certificates", icon: Award },
  { key: "notifications", path: "/student/notifications", label: "Notifications", icon: Bell },
  { key: "profile", path: "/student/profile", label: "Profile Settings", icon: User },
];

export const ADMIN_NAV = [
  { key: "aDashboard", path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "aStudents", path: "/admin/students", label: "Student Management", icon: Users },
  { key: "aCourses", path: "/admin/courses", label: "Course Management", icon: BookOpen },
  { key: "aQuizzes", path: "/admin/quizzes", label: "Quiz Management", icon: ClipboardList },
  { key: "aTutor", path: "/admin/tutor", label: "AI Tutor Knowledge", icon: Bot },
  { key: "aJobs", path: "/admin/jobs", label: "Job Management", icon: Briefcase },
  { key: "aCompanies", path: "/admin/companies", label: "Company Management", icon: Building2 },
  { key: "aCerts", path: "/admin/certificates", label: "Certificate Management", icon: Award },
  { key: "aReports", path: "/admin/reports", label: "Reports", icon: FileBarChart },
  { key: "aAnalytics", path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { key: "aSettings", path: "/admin/settings", label: "Settings", icon: Settings },
];
