import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BackgroundSelection from './pages/BackgroundSelection';
import BranchSelection from './pages/BranchSelection';
import DomainSelection from './pages/DomainSelection';
import LearningModule from './pages/LearningModule';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/background-selection" element={
            <ProtectedRoute>
              <BackgroundSelection />
            </ProtectedRoute>
          } />
          
          <Route path="/branch-selection" element={
            <ProtectedRoute>
              <BranchSelection />
            </ProtectedRoute>
          } />
          
          <Route path="/domain-selection" element={
            <ProtectedRoute>
              <DomainSelection />
            </ProtectedRoute>
          } />
          
          <Route path="/learning" element={
            <ProtectedRoute>
              <LearningModule />
            </ProtectedRoute>
          } />
          
          <Route path="/quiz/:domain/:topic" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />
          
          <Route path="/results/:id" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
