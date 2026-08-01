import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { DataProvider } from "./context/DataContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StudentLayout } from "./layouts/StudentLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AuthPage } from "./pages/AuthPage";

import { DashboardPage } from "./pages/student/DashboardPage";
import { CoursesPage } from "./pages/student/CoursesPage";
import { CourseDetailPage } from "./pages/student/CourseDetailPage";
import { AiTutorPage } from "./pages/student/AiTutorPage";
import { QuizPracticePage } from "./pages/student/QuizPracticePage";
import { StudyPlannerPage } from "./pages/student/StudyPlannerPage";
import { ProgressAnalyticsPage } from "./pages/student/ProgressAnalyticsPage";
import { ResumeBuilderPage } from "./pages/student/ResumeBuilderPage";
import { ResumeAnalyzerPage } from "./pages/student/ResumeAnalyzerPage";
import { InterviewPrepPage } from "./pages/student/InterviewPrepPage";
import { CareerGuidancePage } from "./pages/student/CareerGuidancePage";
import { SkillGapAnalysisPage } from "./pages/student/SkillGapAnalysisPage";
import { LearningRoadmapPage } from "./pages/student/LearningRoadmapPage";
import { JobPortalPage } from "./pages/student/JobPortalPage";
import { CertificatesPage } from "./pages/student/CertificatesPage";
import { NotificationsPage } from "./pages/student/NotificationsPage";
import { ProfileSettingsPage } from "./pages/student/ProfileSettingsPage";

import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminStudentsPage } from "./pages/admin/AdminStudentsPage";
import { AdminCoursesPage } from "./pages/admin/AdminCoursesPage";
import { AdminQuizzesPage } from "./pages/admin/AdminQuizzesPage";
import { AdminTutorKnowledgePage } from "./pages/admin/AdminTutorKnowledgePage";
import { AdminJobsPage } from "./pages/admin/AdminJobsPage";
import { AdminCompaniesPage } from "./pages/admin/AdminCompaniesPage";
import { AdminCertsPage } from "./pages/admin/AdminCertsPage";
import { AdminReportsPage } from "./pages/admin/AdminReportsPage";
import { AdminAnalyticsPage } from "./pages/admin/AdminAnalyticsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<AuthPage />} />

                <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="courses/:courseId" element={<CourseDetailPage />} />
                  <Route path="tutor" element={<AiTutorPage />} />
                  <Route path="quizzes" element={<QuizPracticePage />} />
                  <Route path="planner" element={<StudyPlannerPage />} />
                  <Route path="progress" element={<ProgressAnalyticsPage />} />
                  <Route path="resume-builder" element={<ResumeBuilderPage />} />
                  <Route path="resume-analyzer" element={<ResumeAnalyzerPage />} />
                  <Route path="interview" element={<InterviewPrepPage />} />
                  <Route path="career" element={<CareerGuidancePage />} />
                  <Route path="skill-gap" element={<SkillGapAnalysisPage />} />
                  <Route path="roadmap" element={<LearningRoadmapPage />} />
                  <Route path="jobs" element={<JobPortalPage />} />
                  <Route path="certificates" element={<CertificatesPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="profile" element={<ProfileSettingsPage />} />
                </Route>

                <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="students" element={<AdminStudentsPage />} />
                  <Route path="courses" element={<AdminCoursesPage />} />
                  <Route path="quizzes" element={<AdminQuizzesPage />} />
                  <Route path="tutor" element={<AdminTutorKnowledgePage />} />
                  <Route path="jobs" element={<AdminJobsPage />} />
                  <Route path="companies" element={<AdminCompaniesPage />} />
                  <Route path="certificates" element={<AdminCertsPage />} />
                  <Route path="reports" element={<AdminReportsPage />} />
                  <Route path="analytics" element={<AdminAnalyticsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
