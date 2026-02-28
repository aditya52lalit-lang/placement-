const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    }
  }],
  duration: {
    type: Number,
    default: 600 // 10 minutes in seconds
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
