const getColors = () => {

  return {
    "DEV": getComputedStyle(document.documentElement).getPropertyValue('--handlungsfeld-dev'),
    "DUX": getComputedStyle(document.documentElement).getPropertyValue('--handlungsfeld-dux'),
    "EXA": getComputedStyle(document.documentElement).getPropertyValue('--handlungsfeld-exa'),
    "CREA": getComputedStyle(document.documentElement).getPropertyValue('--handlungsfeld-crea'),
    "INDI": getComputedStyle(document.documentElement).getPropertyValue('--handlungsfeld-indi'),
  };
};

const aggregateData = (rawData, handlungsfelderMapInverted, direction) => {

  const handlungsfelderColors = getColors();
  const datasetsData = [], labels = [], colors = [];

  for (const [key, value] of Object.entries(handlungsfelderMapInverted)) {
    const handlungsfeld = rawData[key];
    let result = 0;
    if(!handlungsfeld) continue;
    for (const [key, values] of Object.entries(handlungsfeld)) { result += values[direction]};

    if(result === 0) continue;

    datasetsData.push(result);
    labels.push(value);
    colors.push(handlungsfelderColors[key]);
  }
  
  return {
    datasetsData,
    labels,
    colors,
  };
};

const showPolarAreaChart = (element) => {

  const fontFamiliy = getComputedStyle(document.documentElement).getPropertyValue('--ff-normal');
  Chart.defaults.font.family = fontFamiliy;
  Chart.defaults.font.size = 14;

  const targetId = element.dataset.target;
  const ctx = document.getElementById(targetId);

  const direction = element.dataset.direction && element.dataset.direction === 'erwerb'
    ? 'liefert'
    : 'braucht';

  const rawData = JSON.parse(element.dataset.chart);
  const handlungsfelderMapInverted = JSON.parse(element.dataset.handlungsfelder);
  const aggregatedData = aggregateData(rawData, handlungsfelderMapInverted, direction);
  
  const data = {
    labels: aggregatedData.labels,
    datasets: [{
      label: 'Kompetenzen in Handlungsfeldern',
      data: aggregatedData.datasetsData,
      backgroundColor: aggregatedData.colors,
    }]
  };

  new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: {
      plugins: {
        legend: {
            display: false,
            position: 'bottom',
            align: 'start',
            font: {
              size: 20,
              family: 'IBMplex',
            },
        }
    }
    }
  });
};


/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-chart]').forEach((element) => {
    showPolarAreaChart(element);
  });
}); 
