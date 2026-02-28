const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

// Get quiz by domain and topic
exports.getQuiz = async (req, res) => {
  try {
    const { domain, topic } = req.params;
    let quiz = await Quiz.findOne({ domain, topic });

    // If no quiz exists, create a sample one
    if (!quiz) {
      quiz = await Quiz.create({
        domain,
        topic,
        questions: generateSampleQuestions(domain, topic),
        duration: 600
      });
    }

    // Don't send correct answers to frontend
    const quizData = {
      _id: quiz._id,
      domain: quiz.domain,
      topic: quiz.topic,
      duration: quiz.duration,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options,
        difficulty: q.difficulty
      }))
    };

    res.json({ quiz: quizData });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Submit quiz and generate AI analysis
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate score
    let correctCount = 0;
    const processedAnswers = answers.map((answer, index) => {
      const isCorrect = quiz.questions[index].correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: index,
        selectedAnswer: answer.selectedAnswer,
        isCorrect
      };
    });

    const percentage = (correctCount / quiz.questions.length) * 100;

    // AI Analysis (placeholder - can be replaced with actual AI service)
    const analysis = generateAIAnalysis(quiz, processedAnswers, percentage);

    const result = await QuizResult.create({
      userId: req.userId,
      quizId,
      answers: processedAnswers,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      percentage,
      timeTaken,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      confidenceScore: analysis.confidenceScore,
      recommendations: analysis.recommendations
    });

    res.json({ 
      message: 'Quiz submitted successfully',
      result: await result.populate('quizId')
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get quiz results
exports.getResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.userId })
      .populate('quizId')
      .sort({ completedAt: -1 });
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get specific result
exports.getResultById = async (req, res) => {
  try {
    const result = await QuizResult.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate('quizId');
    
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// AI Analysis Generator (placeholder for OpenAI integration)
function generateAIAnalysis(quiz, answers, percentage) {
  const correctAnswers = answers.filter(a => a.isCorrect);
  const incorrectAnswers = answers.filter(a => !a.isCorrect);

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  if (percentage >= 80) {
    strengths.push('Excellent understanding of core concepts');
    strengths.push('Strong problem-solving skills');
    recommendations.push('Ready to move to advanced topics');
    recommendations.push('Consider taking on real-world projects');
  } else if (percentage >= 60) {
    strengths.push('Good grasp of fundamental concepts');
    weaknesses.push('Need more practice on complex problems');
    recommendations.push('Review topics with lower scores');
    recommendations.push('Practice more coding challenges');
  } else {
    weaknesses.push('Need to strengthen fundamental concepts');
    weaknesses.push('Requires more practice and revision');
    recommendations.push('Revisit learning materials');
    recommendations.push('Focus on basics before advancing');
  }

  const confidenceScore = Math.min(95, percentage + (correctAnswers.length > 0 ? 10 : 0));

  return { strengths, weaknesses, confidenceScore, recommendations };
}

// Sample question generator
function generateSampleQuestions(domain, topic) {
  return [
    {
      question: `What is the primary purpose of ${topic} in ${domain}?`,
      options: [
        'Data processing and analysis',
        'User interface design',
        'Network communication',
        'Database management'
      ],
      correctAnswer: 0,
      difficulty: 'easy'
    },
    {
      question: `Which of the following is a key concept in ${topic}?`,
      options: [
        'Variables and data types',
        'Loops and conditionals',
        'Functions and methods',
        'All of the above'
      ],
      correctAnswer: 3,
      difficulty: 'medium'
    },
    {
      question: `What is the best practice when working with ${topic}?`,
      options: [
        'Write clean, readable code',
        'Use proper documentation',
        'Follow coding standards',
        'All of the above'
      ],
      correctAnswer: 3,
      difficulty: 'medium'
    },
    {
      question: `In ${domain}, ${topic} is most commonly used for:`,
      options: [
        'Building scalable applications',
        'Optimizing performance',
        'Solving complex problems',
        'All of the above'
      ],
      correctAnswer: 3,
      difficulty: 'hard'
    },
    {
      question: `What is an advanced technique in ${topic}?`,
      options: [
        'Algorithm optimization',
        'Design patterns',
        'Code refactoring',
        'All of the above'
      ],
      correctAnswer: 3,
      difficulty: 'hard'
    }
  ];
}

module.exports = exports;
