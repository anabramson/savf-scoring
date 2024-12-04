import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { industryBenchmarks } from '../data/BenchmarksData';
import { dimensionTitles } from './ScoringData';

const BenchmarkComparison = ({ scores, industry }) => {
  const getBenchmarkData = () => {
    if (industry === 'general') return null;
    
    return Object.entries(scores).map(([dim, score]) => ({
      dimension: dimensionTitles[dim],
      "Your Score": score.total,
      "Industry Average": industryBenchmarks[industry][dim].avg,
      "Top 25%": industryBenchmarks[industry][dim].top25,
      "Top 10%": industryBenchmarks[industry][dim].top10
    }));
  };

  const getPerformanceStatus = (dimension, score) => {
    const benchmark = industryBenchmarks[industry][dimension];
    if (score >= benchmark.top10) return 'Industry Leading';
    if (score >= benchmark.top25) return 'Above Average';
    if (score >= benchmark.avg) return 'Average';
    return 'Below Average';
  };

  const benchmarkData = getBenchmarkData();

  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveBar
          data={benchmarkData || []}
          keys={['Your Score', 'Industry Average', 'Top 25%', 'Top 10%']}
          indexBy="dimension"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          colors={{ scheme: 'nivo' }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Dimensions',
            legendPosition: 'middle',
            legendOffset: 40
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Score',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 120,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 2,
              symbolSize: 20
            }
          ]}
        />
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(scores).map(([dim, score]) => (
          <div key={dim} className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-medium text-lg mb-2">{dimensionTitles[dim]}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Your Score:</span>
                <span className="font-semibold">{score.total.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Industry Average:</span>
                <span className="font-semibold">
                  {industryBenchmarks[industry]?.[dim]?.avg || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold">
                  {industry !== 'general' ? getPerformanceStatus(dim, score.total) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkComparison;