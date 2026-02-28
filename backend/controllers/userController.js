const User = require('../models/User');

// Update user background
exports.updateBackground = async (req, res) => {
  try {
    const { background } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { background },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Background updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update user branch
exports.updateBranch = async (req, res) => {
  try {
    const { branch } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { branch },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Branch updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update selected domains
exports.updateDomains = async (req, res) => {
  try {
    const { domains } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { selectedDomains: domains },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Domains updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
