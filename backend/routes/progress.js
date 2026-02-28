const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.use(auth); // All routes require authentication

router.get('/', progressController.getAllProgress);
router.get('/:domain', progressController.getProgress);
router.post('/', progressController.updateProgress);

module.exports = router;
