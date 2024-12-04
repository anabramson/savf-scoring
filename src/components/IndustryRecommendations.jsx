import React from 'react';
import { dimensionTitles } from './ScoringData';
import { industryRecommendations } from '../data/BenchmarksData';

const IndustryRecommendations = ({ scores = {}, industry = 'general' }) => {
  const getPriorityLevel = (score) => {
    if (!Number.isFinite(score)) return { level: 'Unknown', color: 'bg-gray-100 border-gray-500' };
    if (score < 60) return { level: 'High', color: 'bg-red-100 border-red-500' };
    if (score < 80) return { level: 'Medium', color: 'bg-yellow-100 border-yellow-500' };
    return { level: 'Low', color: 'bg-green-100 border-green-500' };
  };

  const getRecommendations = (dimension, score) => {
    if (industry === 'general') return { recommendations: [], priority: getPriorityLevel(score) };
    
    const recommendations = industryRecommendations[industry]?.[dimension] || [];
    const priority = getPriorityLevel(score);
    
    return {
      recommendations,
      priority,
    };
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {Object.entries(scores).map(([dim, score]) => {
          const { recommendations, priority } = getRecommendations(dim, score?.total || 0);
          
          return (
            <div 
              key={dim} 
              className={`p-4 rounded-lg border-l-4 ${priority.color}`}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold">{dimensionTitles[dim] || 'Unknown Dimension'}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  priority.level === 'High' ? 'bg-red-500 text-white' :
                  priority.level === 'Medium' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {priority.level} Priority
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current Score:</span>
                  <span>{(score?.total || 0).toFixed(1)}/100</span>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium mb-2">Recommended Actions:</h5>
                  {recommendations.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No specific recommendations available for this dimension.
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <h5 className="font-medium mb-2">Next Steps:</h5>
                  <div className="text-sm space-y-1">
                    <p>• Review current practices and identify gaps</p>
                    <p>• Develop action plan for implementation</p>
                    <p>• Set measurable goals and timelines</p>
                    <p>• Monitor progress and adjust strategies</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryRecommendations;
