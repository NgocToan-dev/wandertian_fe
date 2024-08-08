export const apexChartBuilder = () => {

  const buildOptions = (chart_id, xaxis) => {
    return {
      chart: {
        id: chart_id,
      },
      xaxis: {
        categories: xaxis,
      }
    }
  }

  const buildSeries = (series_name, series_data) => {
    for(let i = 0; i < series_name.length; i++){
      series_name[i] = {
        name: series_name[i],
        data: series_data[i],
      }
    }
    return series_name;
  }

  return {
    buildOptions,
    buildSeries
  }
}