import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function LineGraph(props) {
    const dataSet = props.getDataSet(props.dateGroups)
    const options = {
        chart: {
              zoom: {
                  enabled: false
              },
              background: '#fff',             
          },
          dataLabels: {
              enabled: false,
          },
          stroke: {
              curve: 'straight',
              width: 4
          },
          title: {
              text: props.title,
              align: 'left',
              style: {
                  fontSize: '20px',
                  color: '#4b2e83'
              }
          },
          grid: {
              row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
              },
          },
          xaxis: {
            type: 'datetime',                     
          },
          markers: {
            size: 0,
            style: 'hollow',
          },
          yaxis: {
              title: {
                  text: props.yaxisLabel
              }
          },
          colors: ["#6e48aa"],
          tooltip: {
            x: {
              format: props.tooltipLabel
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          }        
      }
      
    return (
        <div>
            <ReactApexChart options={options} series={[{name: 'Total', data: dataSet}]} type="area" height="400"/>
        </div>
    );
}