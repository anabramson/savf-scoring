import React, { useState, useEffect, useCallback } from 'react';
import { dimensionCategories, dimensionTitles, industryAdjustments } from './ScoringData';
import { StorageService } from '../services/StorageService';
import ScoringSection from './ScoringSection';
import ResultsVisualization from './ResultsVisualization';
import EnhancedVisualizations from './EnhancedVisualizations';
import ScoringExplanation from './ScoringExplanation';
import BenchmarkComparison from './BenchmarkComparison';
import PDFReport from './PDFReport';
import IndustryRecommendations from './IndustryRecommendations';
import TrendAnalysis from './TrendAnalysis';

const SAVFScoring = () => {
  const [scores, setScores] = useState({
    svc: { total: 0, subScores: {} },
    eai: { total: 0, subScores: {} },
    cim: { total: 0, subScores: {} },
    rsm: { total: 0, subScores: {} },
    wei: { total: 0, subScores: {} },
  });

  const [industry, setIndustry] = useState('general');
  const [historicalData, setHistoricalData] = useState([]);

  const calculateDimensionScore = useCallback((dimension, subScores) => {
    const rawTotal = Object.values(subScores).reduce((sum, score) => sum + Number(score), 0);
    if (industry !== 'general' && industryAdjustments[industry]?.[dimension]) {
      return Math.min(100, rawTotal * industryAdjustments[industry][dimension]);
    }
    return Math.min(100, rawTotal);
  }, [industry]);

  const handleScoreChange = (dimension, category, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [dimension]: {
        ...prevScores[dimension],
        subScores: {
          ...prevScores[dimension].subScores,
          [category]: value,
        },
      },
    }));
  };

  // Update scores when subScores or industry changes
  useEffect(() => {
    const newScores = {};
    Object.keys(scores).forEach((dimension) => {
      newScores[dimension] = {
        ...scores[dimension],
        total: calculateDimensionScore(dimension, scores[dimension].subScores),
      };
    });
    setScores((prevScores) => ({ ...prevScores, ...newScores }));
  }, [scores, calculateDimensionScore]);

  // Load saved scores and industry
  useEffect(() => {
    const loadData = async () => {
      const savedScores = await StorageService.loadScores();
      const savedIndustry = await StorageService.loadIndustry();

      if (savedScores) setScores(savedScores);
      if (savedIndustry) setIndustry(savedIndustry);
    };

    loadData();
  }, []);

  // Save scores and industry to storage
  useEffect(() => {
    StorageService.saveScores(scores);
    StorageService.saveIndustry(industry);
  }, [scores, industry]);

  // Update historical data when scores change
  useEffect(() => {
    setHistoricalData(prevData => [...prevData, {
      date: new Date(),
      scores: {...scores}
    }]);
  }, [scores]);

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score.total, 0);

  const exportScores = () => {
    const rows = [
      ['Dimension', 'Raw Score', 'Adjusted Score', 'Categories'],
      ...Object.entries(scores).map(([dim, score]) => [
        dimensionTitles[dim],
        Object.values(score.subScores).reduce((sum, s) => sum + Number(s), 0),
        score.total.toFixed(1),
        Object.entries(score.subScores)
          .map(([cat, val]) => `${cat}: ${val}`)
          .join('; '),
      ]),
    ];

    const csvContent = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `savf-scores-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetScores = () => {
    if (window.confirm('Are you sure you want to reset all scores? This cannot be undone.')) {
      setScores({
        svc: { total: 0, subScores: {} },
        eai: { total: 0, subScores: {} },
        cim: { total: 0, subScores: {} },
        rsm: { total: 0, subScores: {} },
        wei: { total: 0, subScores: {} },
      });
      setIndustry('general');
      StorageService.clearAllData();
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">SAVF Scoring System</h1>
        <p className="text-gray-600">Social AI Value Framework Assessment Tool</p>
      </div>

      {/* Industry Selection */}
      <div className="mb-6 p-4 border rounded-lg bg-white shadow">
        <label className="block text-sm font-medium mb-1">Industry</label>
        <select
          className="w-full p-2 border rounded"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="general">General</option>
          <option value="financial">Financial Services</option>
          <option value="healthcare">Healthcare</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      {/* Scoring Sections */}
      {Object.entries(dimensionCategories).map(([dim, categories]) => (
        <ScoringSection
          key={dim}
          title={dimensionTitles[dim]}
          dimension={dim}
          categories={categories}
          scores={scores}
          onScoreChange={handleScoreChange}
        />
      ))}

      {/* Basic Visualization */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Score Visualization</h3>
        <ResultsVisualization scores={scores} />
      </div>

      {/* Enhanced Visualizations */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
        <EnhancedVisualizations scores={scores} />
      </div>

      {/* Trend Analysis */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Score Trends</h3>
        <TrendAnalysis historicalData={historicalData} currentScores={scores} />
      </div>

      {/* Benchmark Comparison */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Industry Benchmarks</h3>
        <BenchmarkComparison scores={scores} industry={industry} />
      </div>

      {/* Industry Recommendations */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
        <IndustryRecommendations scores={scores} industry={industry} />
      </div>

      {/* Scoring Explanation */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Detailed Scoring Explanation</h3>
        <ScoringExplanation scores={scores} industry={industry} />
      </div>

      {/* Final Score */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Final Score</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.entries(scores).map(([dim, score]) => (
            <div key={dim} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{dimensionTitles[dim]}:</span>
              <span>{score.total.toFixed(1)}/100</span>
            </div>
          ))}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total Score:</span>
            <span className="text-2xl font-bold text-blue-600">
              {totalScore.toFixed(1)}/500
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={exportScores}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Export Scores to CSV
        </button>
        <PDFReport scores={scores} industry={industry} />
        <button
          onClick={resetScores}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Reset All Scores
        </button>
      </div>
    </div>
  );
};

export default SAVFScoring;