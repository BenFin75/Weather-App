import React from "react";
import { Line } from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ForcastChart = ({ weather, units }) => {
  let lables = []
  let tempData = []
  let percipData = []
  if (weather !== '') {
    lables = []
    tempData = []
    percipData = []
    let currentTime = new Date()
    for (let i = 0; i < 12; i++) {
      const percip = weather.data.hourly[i].pop * 100;
      const temp = weather.data.hourly[i].temp;
      const hour = new Date(currentTime.setHours(currentTime.getHours() + 1));
      const localHour = hour.toLocaleString('en-US', {timeZone:weather.data.timezone, hour: 'numeric', hour12: true });
      lables.push(localHour)
      tempData.push(temp)
      percipData.push(percip)
    }
  }


return (
  <div className="forcast-chart">
    { weather &&
      <Line 
        height={'200px'}
        width={'90%'}
        data={{
            datasets: [{
                type: 'line',
                label: 'Temperature',
                yAxisID: 'y1',
                backgroundColor: '#ff5e00',
                borderColor: [
                  '#ff5e00'
                ],
                pointBackgroundColor: '#ff5e00',
                pointRadius:5,
                pointHoverRadius: 10,
                data: tempData,
            }, {
              type: 'bar',
              label: 'Percipitation',
              yAxisID: 'y2',
              backgroundColor: 'aqua',
              data: percipData
            }],
            labels: lables,
        }}
        options= {{
          // maintainAspectRatio: false,
          aspectRatio: 2,
          plugins: {
            legend: {
              labels: {
                color: 'white',
                font: {
                  size: '16px',
                  weight: 700,
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                // color: "azure",
              },
              ticks: {
                color: "azure",
                font: {
                  size: '16px',
                  weight: 700,
                }
              }
            },
            y1: {
              title: {
                display: true,
                color: "azure",
                text: `Temperature ${(units === "metric") ? '°C' : '°F'}`,
                font: {
                  size: '16px',
                  weight: 700,
                }
              },
              ticks: {
                color: "azure",
                maxTicksLimit: 6,
                callback: function(value, index, values) {
                  return value + '°';
                },
                font: {
                  size: '16px',
                  weight: 700,
                },
              },
              grid: {
                color: 'azure',
              },
              type: 'linear',
              position: 'left',
              min: Math.round(Math.min(...tempData) - 1),
            }, 
            y2: {
              title: {
                display: true,
                color: "azure",
                text: `Percipitation`,
                font: {
                  size: '16px',
                  weight: 700,
                }
              },
              ticks: {
                color: "azure",
                stepSize: 50,
                callback: function(value, index, values) {
                  return value + '%';
                },
                font: {
                  size: '16px',
                  weight: 700,
                }
              },
              grid: {
                display: false,
              },
              type: 'linear',
              position: 'right',
              max: 100,
              min: 0,
            }
          }
        }}
      />
    }
  </div>
);
}
 
export default ForcastChart;