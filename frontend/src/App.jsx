import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
          <Route path="/background-selection" element={<BackgroundSelection />} />
          
          <Route path="/branch-selection" element={<BranchSelection />} />
          
          <Route path="/domain-selection" element={<DomainSelection />} />
          
          <Route path="/learning" element={<LearningModule />} />
          
          <Route path="/quiz/:domain/:topic" element={<Quiz />} />
          
          <Route path="/results/:id" element={<Results />} />
          
          <Route path="/" element={<Navigate to="/background-selection" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
