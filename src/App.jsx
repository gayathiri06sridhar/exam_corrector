import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadQuestionPage from './pages/UploadQuestionPage';
import UploadAnswersPage from './pages/UploadAnswersPage';
import EvaluatePage from './pages/EvaluatePage';
import ResultsPage from './pages/ResultsPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-question"
              element={
                <ProtectedRoute>
                  <UploadQuestionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-answers"
              element={
                <ProtectedRoute>
                  <UploadAnswersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evaluate"
              element={
                <ProtectedRoute>
                  <EvaluatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
