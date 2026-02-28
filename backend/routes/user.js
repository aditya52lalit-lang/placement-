const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth); // All routes require authentication

router.get('/profile', userController.getProfile);
router.put('/background', userController.updateBackground);
router.put('/branch', userController.updateBranch);
router.put('/domains', userController.updateDomains);

module.exports = router;
