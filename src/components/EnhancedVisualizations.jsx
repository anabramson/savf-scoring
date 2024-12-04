import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { prepareChartData } from '../helpers/ChartDataHelpers';
import { dimensionTitles } from './ScoringData';

const EnhancedVisualizations = ({ scores }) => {
  const [activeView, setActiveView] = useState('radar');
  const { radarData, barData, pieData } = prepareChartData(scores, dimensionTitles);

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex gap-2 mb-4">
        {['radar', 'bar', 'pie'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded ${
              activeView === view ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)} Chart
          </button>
        ))}
      </div>

      {/* Chart Display */}
      <div style={{ height: '400px', width: '100%' }}>
        {activeView === 'radar' && (
          <ResponsiveRadar
            data={radarData}
            keys={['score']}
            indexBy="dimension"
            maxValue={100}
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderColor={{ theme: 'background' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
        )}

        {activeView === 'bar' && (
          <ResponsiveBar
            data={barData}
            keys={['score']}
            indexBy="dimension"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ theme: 'background' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
              }
            ]}
          />
        )}

        {activeView === 'pie' && (
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ theme: 'background' }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#ffffff"
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
              }
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedVisualizations;