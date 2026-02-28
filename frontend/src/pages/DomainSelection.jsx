import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Globe, Database, Bot, Cpu, CheckCircle } from 'lucide-react';
import { userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const domains = [
  { id: 'AI', name: 'Artificial Intelligence', icon: Brain, color: 'from-purple-500 to-pink-500', desc: 'Machine Learning & Deep Learning' },
  { id: 'Web', name: 'Web Development', icon: Globe, color: 'from-blue-500 to-cyan-500', desc: 'Full Stack Development' },
  { id: 'Data', name: 'Data Science', icon: Database, color: 'from-green-500 to-teal-500', desc: 'Analytics & Visualization' },
  { id: 'Robotics', name: 'Robotics', icon: Bot, color: 'from-orange-500 to-red-500', desc: 'Automation & IoT' },
  { id: 'Core', name: 'Core Engineering', icon: Cpu, color: 'from-indigo-500 to-purple-500', desc: 'Fundamentals & Systems' },
];

const DomainSelection = () => {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const toggleDomain = (domainId) => {
    setSelected(prev =>
      prev.includes(domainId)
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) return;
    
    setLoading(true);
    try {
      const response = await userAPI.updateDomains(selected);
      updateUser(response.data.user);
      navigate('/learning');
    } catch (error) {
      console.error('Error updating domains:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-bg p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Choose Your Domains</h1>
          <p className="text-gray-400 text-lg">Select one or more areas you want to master</p>
          <div className="mt-4 inline-flex items-center gap-2 glass-card px-6 py-3">
            <span className="text-purple-400 font-semibold">{selected.length}</span>
            <span className="text-gray-300">domain{selected.length !== 1 ? 's' : ''} selected</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {domains.map((domain, index) => {
            const isSelected = selected.includes(domain.id);
            
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDomain(domain.id)}
                className={`glass-card-hover p-8 cursor-pointer relative overflow-hidden ${
                  isSelected ? 'ring-4 ring-purple-500 neon-border' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-${isSelected ? '20' : '10'}`}></div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${domain.color}`}>
                      <domain.icon className="w-10 h-10 text-white" />
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 rounded-full p-1"
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{domain.name}</h3>
                    <p className="text-gray-400 text-sm">{domain.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={handleContinue}
            disabled={selected.length === 0 || loading}
            className={`btn-primary px-12 py-4 text-lg ${
              selected.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                <span>Loading...</span>
              </div>
            ) : (
              `Continue with ${selected.length} domain${selected.length !== 1 ? 's' : ''}`
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DomainSelection;
