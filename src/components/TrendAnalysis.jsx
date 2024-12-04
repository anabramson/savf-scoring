import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { dimensionTitles } from './ScoringData';

const TrendAnalysis = ({ historicalData, currentScores }) => {
  // Create mock historical data if none exists
  const defaultHistoricalData = [
    {
      date: '3 months ago',
      scores: {
        svc: { total: 65 },
        eai: { total: 70 },
        cim: { total: 68 },
        rsm: { total: 72 },
        wei: { total: 67 }
      }
    },
    {
      date: '2 months ago',
      scores: {
        svc: { total: 70 },
        eai: { total: 75 },
        cim: { total: 73 },
        rsm: { total: 76 },
        wei: { total: 72 }
      }
    },
    {
      date: '1 month ago',
      scores: {
        svc: { total: 75 },
        eai: { total: 80 },
        cim: { total: 78 },
        rsm: { total: 81 },
        wei: { total: 77 }
      }
    }
  ];

  // Transform data for visualization
  const getLineData = () => {
    const dataToUse = historicalData || defaultHistoricalData;
    
    return Object.keys(dimensionTitles).map(dimension => ({
      id: dimensionTitles[dimension],
      data: dataToUse.map((entry) => ({
        x: entry.date,
        y: entry.scores[dimension].total
      })).concat({
        x: 'Current',
        y: currentScores[dimension].total
      })
    }));
  };

  return (
    <div className="space-y-4">
      <div className="h-[400px]">
        <ResponsiveLine
          data={getLineData()}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ 
            type: 'linear', 
            min: 0, 
            max: 100 
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Time Period',
            legendOffset: 40,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Score',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>

      {/* Trend Summary */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(currentScores).map(([dim, score]) => {
          const previousScore = defaultHistoricalData[defaultHistoricalData.length - 1]?.scores[dim].total;
          const change = previousScore ? score.total - previousScore : 0;
          
          return (
            <div key={dim} className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium">{dimensionTitles[dim]}</h4>
              <div className="flex justify-between items-center mt-2">
                <span>Change:</span>
                <span className={`font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendAnalysis;