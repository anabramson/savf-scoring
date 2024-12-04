export const StorageService = {
  saveScores: (scores) => {
    try {
      localStorage.setItem('savf_scores', JSON.stringify(scores));
      return true;
    } catch (error) {
      console.error('Error saving scores:', error);
      return false;
    }
  },

  loadScores: () => {
    try {
      const savedScores = localStorage.getItem('savf_scores');
      return savedScores ? JSON.parse(savedScores) : null;
    } catch (error) {
      console.error('Error loading scores:', error);
      return null;
    }
  },

  saveIndustry: (industry) => {
    try {
      localStorage.setItem('savf_industry', industry);
      return true;
    } catch (error) {
      console.error('Error saving industry:', error);
      return false;
    }
  },

  loadIndustry: () => {
    try {
      return localStorage.getItem('savf_industry') || 'general';
    } catch (error) {
      console.error('Error loading industry:', error);
      return 'general';
    }
  },

  clearAllData: () => {
    try {
      localStorage.removeItem('savf_scores');
      localStorage.removeItem('savf_industry');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};