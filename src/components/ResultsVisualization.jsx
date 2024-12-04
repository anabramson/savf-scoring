import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { dimensionTitles } from './ScoringData';

const ResultsVisualization = ({ scores }) => {
  const data = Object.entries(scores).map(([key, value]) => ({
    dimension: dimensionTitles[key],
    score: value.total,
    fullMark: 100,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="dimension"
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2563EB"
            fill="#3B82F6"
            fillOpacity={0.6}
          />
          <Tooltip 
            formatter={(value) => [`${value.toFixed(1)} points`, "Score"]}
            contentStyle={{ backgroundColor: 'white', borderRadius: '4px' }}
          />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsVisualization;
