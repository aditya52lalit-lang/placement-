import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { quizAPI } from '../utils/api';

const Quiz = () => {
  const { domain, topic } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [domain, topic]);

  useEffect(() => {
    if (!quiz || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, timeLeft]);

  const fetchQuiz = async () => {
    try {
      const response = await quizAPI.getQuiz(domain, topic);
      setQuiz(response.data.quiz);
      setAnswers(new Array(response.data.quiz.questions.length).fill(null));
      setTimeLeft(response.data.quiz.duration);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { selectedAnswer: answerIndex };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]?.selectedAnswer ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1]?.selectedAnswer ?? null);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const timeTaken = quiz.duration - timeLeft;
      const response = await quizAPI.submitQuiz({
        quizId: quiz._id,
        answers,
        timeTaken
      });
      navigate(`/results/${response.data.result._id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen animated-bg p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold gradient-text">{quiz.topic}</h1>
              <p className="text-gray-400">{quiz.domain}</p>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Clock className={`w-6 h-6 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-purple-400'}`} />
              <span className={timeLeft < 60 ? 'text-red-500' : 'text-white'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span className="text-purple-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 mb-6"
          >
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-purple-400 font-bold text-lg">Q{currentQuestion + 1}.</span>
                <h2 className="text-xl font-semibold flex-1">{question.question}</h2>
              </div>
              {question.difficulty && (
                <span className={`inline-block px-3 py-1 rounded text-xs ${
                  question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {question.difficulty.toUpperCase()}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedAnswer === index
                      ? 'bg-purple-500/30 border-2 border-purple-500'
                      : 'glass-card hover:bg-white/15 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  answers[index] !== null && answers[index] !== undefined
                    ? 'bg-green-500'
                    : index === currentQuestion
                    ? 'bg-purple-500'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
