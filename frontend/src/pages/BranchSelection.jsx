import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Code, Zap, Database, Network, Cog, TrendingUp, Briefcase, Target, Users, BookOpen } from 'lucide-react';
import { userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const branchesData = {
  'B.Tech': [
    { id: 'CSE', name: 'Computer Science', icon: Code, color: 'from-blue-500 to-purple-500' },
    { id: 'ECE', name: 'Electronics', icon: Cpu, color: 'from-green-500 to-teal-500' },
    { id: 'EEE', name: 'Electrical', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'IT', name: 'Information Tech', icon: Database, color: 'from-pink-500 to-red-500' },
    { id: 'MECH', name: 'Mechanical', icon: Cog, color: 'from-gray-500 to-slate-500' },
    { id: 'CIVIL', name: 'Civil', icon: Network, color: 'from-indigo-500 to-blue-500' },
  ],
  'B.Com': [
    { id: 'GENERAL', name: 'General', icon: Code, color: 'from-green-500 to-emerald-500' },
    { id: 'ACCOUNTING', name: 'Accounting', icon: Database, color: 'from-blue-500 to-cyan-500' },
    { id: 'FINANCE', name: 'Finance', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  ],
  'MBA': [
    { id: 'GENERAL', name: 'General MBA', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { id: 'FINANCE', name: 'Finance', icon: TrendingUp, color: 'from-green-500 to-teal-500' },
    { id: 'MARKETING', name: 'Marketing', icon: Target, color: 'from-red-500 to-orange-500' },
    { id: 'HR', name: 'Human Resources', icon: Users, color: 'from-blue-500 to-indigo-500' },
  ],
  'Degree': [
    { id: 'GENERAL', name: 'General', icon: BookOpen, color: 'from-orange-500 to-red-500' },
  ],
};

const BranchSelection = () => {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const branches = branchesData[user?.background] || branchesData['Degree'];

  const handleSelect = async (branch) => {
    setSelected(branch);
    setLoading(true);

    try {
      // Skip API call - just navigate
      setTimeout(() => {
        navigate('/domain-selection');
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
          <h1 className="text-5xl font-bold gradient-text mb-4">Select Your Branch</h1>
          <p className="text-gray-400 text-lg">Choose your specialization to get tailored content</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !loading && handleSelect(branch.id)}
              className={`glass-card-hover p-8 cursor-pointer relative overflow-hidden ${
                selected === branch.id ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${branch.color} opacity-10`}></div>

              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full bg-gradient-to-br ${branch.color}`}>
                  <branch.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center">{branch.name}</h3>

                {selected === branch.id && loading && (
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

export default BranchSelection;
