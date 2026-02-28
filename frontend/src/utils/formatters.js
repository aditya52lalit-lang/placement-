// Helper utility for formatting and validation
const formatters = {
  // Format percentage score
  formatPercentage: (percentage) => {
    return Math.round(percentage * 10) / 10;
  },

  // Format time in seconds to HH:MM:SS
  formatTime: (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  },

  // Get performance level
  getPerformanceLevel: (percentage) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
  },

  // Get confidence score
  getConfidenceScore: (percentage, timeTaken, totalTime) => {
    let score = percentage;
    const timeRatio = timeTaken / totalTime;
    
    if (timeRatio < 0.5) score += 10; // Extra points for speed
    if (timeRatio > 0.9) score -= 5;  // Penalty for rushing
    
    return Math.min(100, Math.max(0, score));
  }
};

export default formatters;
