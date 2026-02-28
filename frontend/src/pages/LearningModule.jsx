import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Play, CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';
import { progressAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const learningModules = {
  AI: [
    { id: 'python-basics', name: 'Python Basics', duration: '2 hours', difficulty: 'Beginner' },
    { id: 'numpy-basics', name: 'NumPy Fundamentals', duration: '1.5 hours', difficulty: 'Beginner' },
    { id: 'pandas-intro', name: 'Pandas Introduction', duration: '2 hours', difficulty: 'Beginner' },
    { id: 'ml-basics', name: 'Machine Learning Basics', duration: '3 hours', difficulty: 'Intermediate' },
  ],
  Web: [
    { id: 'html-css', name: 'HTML & CSS', duration: '2 hours', difficulty: 'Beginner' },
    { id: 'javascript', name: 'JavaScript Essentials', duration: '3 hours', difficulty: 'Beginner' },
    { id: 'react-intro', name: 'React Fundamentals', duration: '4 hours', difficulty: 'Intermediate' },
    { id: 'nodejs', name: 'Node.js & Express', duration: '3 hours', difficulty: 'Intermediate' },
  ],
  Data: [
    { id: 'statistics', name: 'Statistics Basics', duration: '2 hours', difficulty: 'Beginner' },
    { id: 'data-viz', name: 'Data Visualization', duration: '2 hours', difficulty: 'Beginner' },
    { id: 'sql', name: 'SQL Fundamentals', duration: '2.5 hours', difficulty: 'Beginner' },
    { id: 'data-analysis', name: 'Data Analysis', duration: '3 hours', difficulty: 'Intermediate' },
  ],
};

const LearningModule = () => {
  const [progress, setProgress] = useState({});
  const [selectedDomain, setSelectedDomain] = useState('AI');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await progressAPI.getAllProgress();
      const progressMap = {};
      response.data.progress.forEach(p => {
        progressMap[`${p.domain}-${p.topic}`] = p;
      });
      setProgress(progressMap);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const startModule = async (domain, module) => {
    try {
      await progressAPI.updateProgress({
        domain,
        topic: module.id,
        progress: 10,
        completed: false
      });
      navigate(`/quiz/${domain}/${module.id}`);
    } catch (error) {
      console.error('Error starting module:', error);
    }
  };

  const domains = user?.selectedDomains || ['AI'];
  const modules = learningModules[selectedDomain] || learningModules.AI;

  const getModuleProgress = (domain, moduleId) => {
    return progress[`${domain}-${moduleId}`]?.progress || 0;
  };

  const isModuleCompleted = (domain, moduleId) => {
    return progress[`${domain}-${moduleId}`]?.completed || false;
  };

  return (
    <div className="min-h-screen animated-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Learning Modules</h1>
          <p className="text-gray-400 text-lg">Master the fundamentals and advance your skills</p>
        </motion.div>

        {/* Domain Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {domains.map((domain) => (
            <motion.button
              key={domain}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDomain(domain)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedDomain === domain
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'glass-card hover:bg-white/20'
              }`}
            >
              {domain}
            </motion.button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const moduleProgress = getModuleProgress(selectedDomain, module.id);
            const completed = isModuleCompleted(selectedDomain, module.id);

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      completed ? 'bg-green-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{module.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                          module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {module.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-purple-400 font-semibold">{moduleProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${moduleProgress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => startModule(selectedDomain, module)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {completed ? (
                    <>
                      <Award className="w-5 h-5" />
                      Review Module
                    </>
                  ) : moduleProgress > 0 ? (
                    <>
                      <Play className="w-5 h-5" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Module
                    </>
                  )}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
