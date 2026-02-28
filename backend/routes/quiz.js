const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.use(auth); // All routes require authentication

router.get('/:domain/:topic', quizController.getQuiz);
router.post('/submit', quizController.submitQuiz);
router.get('/results/all', quizController.getResults);
router.get('/results/:id', quizController.getResultById);

module.exports = router;
