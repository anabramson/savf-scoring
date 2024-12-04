import React from 'react';
import { dimensionTitles } from './ScoringData';

const ScoringExplanation = ({ scores, industry }) => {
  // Calculate dimension breakdown
  const getDimensionBreakdown = (dimension, score) => {
    const rawTotal = Object.values(score.subScores).reduce((sum, s) => sum + Number(s), 0);
    const adjustment = industry !== 'general' ? 
      (score.total / rawTotal).toFixed(2) : 
      '1.00';

    return {
      rawScore: rawTotal,
      adjustedScore: score.total,
      adjustment: adjustment
    };
  };

  // Performance levels
  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'Exceptional', color: 'text-green-600' };
    if (score >= 80) return { level: 'Strong', color: 'text-blue-600' };
    if (score >= 70) return { level: 'Good', color: 'text-yellow-600' };
    if (score >= 60) return { level: 'Fair', color: 'text-orange-600' };
    return { level: 'Needs Improvement', color: 'text-red-600' };
  };

  const totalScore = Object.values(scores)
    .reduce((sum, score) => sum + score.total, 0);

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Overall Assessment</h3>
        <div className="space-y-2">
          <p className="text-lg">
            Total Score: <span className="font-bold">{totalScore.toFixed(1)}/500</span>
          </p>
          <p className={`text-lg ${getPerformanceLevel(totalScore/5).color}`}>
            Overall Performance Level: {getPerformanceLevel(totalScore/5).level}
          </p>
        </div>
      </div>

      {/* Dimension Breakdown */}
      {Object.entries(scores).map(([dim, score]) => {
        const breakdown = getDimensionBreakdown(dim, score);
        const performance = getPerformanceLevel(score.total);

        return (
          <div key={dim} className="p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">{dimensionTitles[dim]}</h4>
            <div className="space-y-2">
              <p>Raw Score: {breakdown.rawScore}/100</p>
              <p>Industry Adjustment Factor: {breakdown.adjustment}x</p>
              <p>Final Score: {breakdown.adjustedScore.toFixed(1)}/100</p>
              <p className={performance.color}>
                Performance Level: {performance.level}
              </p>
              
              {/* Detailed Category Breakdown */}
              <div className="mt-4">
                <h5 className="font-medium mb-2">Category Breakdown:</h5>
                {Object.entries(score.subScores).map(([category, value]) => (
                  <div key={category} className="flex justify-between py-1">
                    <span>{category}:</span>
                    <span className="font-medium">{value} points</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Recommendations */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
        <div className="space-y-2">
          {Object.entries(scores).map(([dim, score]) => {
            if (score.total < 70) {
              return (
                <div key={dim} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{dimensionTitles[dim]}:</p>
                  <p className="text-gray-600">
                    Consider improving this dimension to strengthen overall performance.
                    Focus on categories with lower scores.
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoringExplanation;