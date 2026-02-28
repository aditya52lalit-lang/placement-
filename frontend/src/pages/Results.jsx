import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, TrendingUp, TrendingDown, Target, Brain, 
  MessageSquare, Send, Sparkles, ArrowLeft, Award 
} from 'lucide-react';
import { quizAPI } from '../utils/api';

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchResult();
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const fetchResult = async () => {
    try {
      // Generate mock result data
      const mockResult = {
        _id: id,
        score: Math.floor(Math.random() * 3) + 3, // 3-5 out of 5
        totalQuestions: 5,
        percentage: Math.random() * 40 + 60, // 60-100%
        confidenceScore: Math.random() * 40 + 60, // 60-100%
        timeTaken: 300,
        strengths: ['Good understanding of core concepts', 'Strong problem-solving approach', 'Excellent time management'],
        weaknesses: ['Need more practice on advanced topics', 'Could improve on edge cases'],
        recommendations: ['Review advanced concepts', 'Practice more challenging problems', 'Study design patterns']
      };
      
      setResult(mockResult);
      
      // Initialize chat with AI analysis
      setChatMessages([
        {
          type: 'ai',
          content: `Hello! I've analyzed your quiz performance. You scored ${mockResult.percentage.toFixed(1)}% with a confidence score of ${mockResult.confidenceScore.toFixed(0)}. Let me break down your results.`
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', content: inputMessage }]);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, result);
      setChatMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (message, result) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('improve') || lowerMessage.includes('better')) {
      return `To improve your performance:\n${result.recommendations.map(r => `• ${r}`).join('\n')}\n\nFocus on your weak areas and practice regularly.`;
    } else if (lowerMessage.includes('strength')) {
      return `Your strengths include:\n${result.strengths.map(s => `• ${s}`).join('\n')}\n\nKeep building on these!`;
    } else if (lowerMessage.includes('weakness')) {
      return `Areas to work on:\n${result.weaknesses.map(w => `• ${w}`).join('\n')}\n\nDon't worry, consistent practice will help!`;
    } else if (lowerMessage.includes('next') || lowerMessage.includes('what should')) {
      return `Based on your performance, I recommend:\n${result.recommendations[0]}\n\nWould you like specific resources for this?`;
    } else {
      return `I'm here to help you understand your results better. You can ask me about:\n• How to improve your score\n• Your strengths and weaknesses\n• What to study next\n• Specific topics you struggled with`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="glass-card p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen animated-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learning
          </button>
          <h1 className="text-5xl font-bold gradient-text mb-2">Quiz Results</h1>
          <p className="text-gray-400 text-lg">AI-Powered Performance Analysis</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-6xl font-bold gradient-text mb-2">
                {result.percentage.toFixed(1)}%
              </h2>
              <p className="text-gray-400 text-lg">
                {result.score} out of {result.totalQuestions} correct
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="glass-card px-6 py-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Confidence</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{result.confidenceScore}%</p>
                </div>
                <div className="glass-card px-6 py-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-pink-400" />
                    <span className="text-sm text-gray-400">Grade</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">
                    {result.percentage >= 90 ? 'A+' :
                     result.percentage >= 80 ? 'A' :
                     result.percentage >= 70 ? 'B' :
                     result.percentage >= 60 ? 'C' : 'D'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <Sparkles className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Weaknesses */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold">Areas to Improve</h3>
              </div>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <Target className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>{weakness}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">AI Recommendations</h3>
              </div>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - AI Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 flex flex-col h-[800px]"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-sm text-gray-400">Ask me anything about your results</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'glass-card'
                  }`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your performance..."
                className="flex-1 px-4 py-3 glass-card border-none focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button
                type="submit"
                className="btn-primary px-4"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;
