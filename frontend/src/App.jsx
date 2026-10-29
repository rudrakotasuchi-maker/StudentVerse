import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BranchExplorationPage from './pages/BranchExplorationPage';
import InterestFinderPage from './pages/InterestFinderPage';
import CareerRoadmapPage from './pages/CareerRoadmapPage';
import LearningResourcesPage from './pages/LearningResourcesPage';
import OpportunitiesHubPage from './pages/OpportunitiesHubPage';
import TestsPracticePage from './pages/TestsPracticePage';
import ProjectPlacementPrepPage from './pages/ProjectPlacementPrepPage';
import CodingPracticePage from './pages/CodingPracticePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import GuidancePage from './pages/GuidancePage';

// 404 Page
function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem auto' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home Page
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/branches" element={<BranchExplorationPage />} />
            <Route path="/guidance" element={<GuidancePage />} />
            <Route path="/interest-finder" element={<InterestFinderPage />} />
            <Route path="/career-roadmap" element={<CareerRoadmapPage />} />
            <Route path="/career-roadmap/:slug" element={<CareerRoadmapPage />} />
            <Route path="/learning-resources" element={<LearningResourcesPage />} />
            <Route path="/opportunities" element={<OpportunitiesHubPage />} />
            <Route path="/tests-practice" element={<TestsPracticePage />} />
            <Route path="/coding-practice" element={<CodingPracticePage />} />
            <Route path="/coding-practice/:lang" element={<CodingPracticePage />} />
            <Route path="/project-prep" element={<ProjectPlacementPrepPage />} />

            {/* Protected Student Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
