export const prepareChartData = (scores, dimensionTitles) => {
    // Convert scores object to arrays for each chart type
    const dimensions = Object.keys(scores);
  
    // Radar chart data
    const radarData = dimensions.map(dim => ({
      dimension: dimensionTitles[dim],
      score: scores[dim].total
    }));
  
    // Bar chart data
    const barData = dimensions.map(dim => ({
      dimension: dimensionTitles[dim],
      score: scores[dim].total
    }));
  
    // Pie chart data
    const pieData = dimensions.map(dim => ({
      id: dimensionTitles[dim],
      label: dimensionTitles[dim],
      value: scores[dim].total
    }));
  
    return {
      radarData,
      barData,
      pieData
    };
  };