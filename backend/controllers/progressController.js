const LearningProgress = require('../models/LearningProgress');

// Get user progress for a domain
exports.getProgress = async (req, res) => {
  try {
    const { domain } = req.params;
    const progress = await LearningProgress.find({ 
      userId: req.userId,
      domain 
    });
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all user progress
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await LearningProgress.find({ userId: req.userId });
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update progress
exports.updateProgress = async (req, res) => {
  try {
    const { domain, topic, progress, completed } = req.body;

    const learningProgress = await LearningProgress.findOneAndUpdate(
      { userId: req.userId, domain, topic },
      { 
        progress, 
        completed,
        lastAccessed: Date.now()
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Progress updated', progress: learningProgress });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
