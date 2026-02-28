import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, TrendingUp, BookOpen } from 'lucide-react';
import { userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const backgrounds = [
  { id: 'B.Tech', name: 'B.Tech', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
  { id: 'B.Com', name: 'B.Com', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  { id: 'MBA', name: 'MBA', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
  { id: 'Degree', name: 'Degree', icon: BookOpen, color: 'from-orange-500 to-red-500' },
];

const BackgroundSelection = () => {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSelect = async (background) => {
    setSelected(background);
    setLoading(true);

    try {
      // Skip API call - just navigate
      setTimeout(() => {
        navigate('/branch-selection');
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-bg p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Choose Your Background</h1>
          <p className="text-gray-400 text-lg">Select your educational background to personalize your experience</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {backgrounds.map((bg, index) => (
            <motion.div
              key={bg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !loading && handleSelect(bg.id)}
              className={`glass-card-hover p-8 cursor-pointer relative overflow-hidden ${
                selected === bg.id ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bg.color} opacity-10`}></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full bg-gradient-to-br ${bg.color}`}>
                  <bg.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{bg.name}</h3>
                
                {selected === bg.id && loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl"
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelection;
