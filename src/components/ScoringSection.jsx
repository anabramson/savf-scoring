import React from 'react';

const ScoringSection = ({ title, dimension, categories, scores, onScoreChange }) => {
  // Calculate the raw total before industry adjustments
  const rawTotal = Object.values(scores[dimension].subScores)
    .reduce((sum, score) => sum + Number(score), 0);

  return (
    <div className="mb-6 p-4 border rounded-lg bg-white shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {categories.map(category => (
        <div key={category.name} className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {category.name} (Max: {category.maxPoints} points)
          </label>
          <select 
            className="w-full p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={scores[dimension].subScores[category.name] || '0'}
            onChange={(e) => onScoreChange(dimension, category.name, e.target.value)}
          >
            <option value="0">Select a score</option>
            {category.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value}pts)
              </option>
            ))}
          </select>
        </div>
      ))}
      
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <div className="flex justify-between items-center">
          <span className="font-medium">Raw Score:</span>
          <span className="text-lg">{rawTotal}/100</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">Adjusted Score:</span>
          <span className="text-lg font-semibold text-blue-600">
            {scores[dimension].total.toFixed(1)}/100
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoringSection;