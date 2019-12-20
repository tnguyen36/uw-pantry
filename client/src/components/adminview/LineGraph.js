import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function LineGraph(props) {
    const dataSet = props.getDataSet(props.dateGroups)
    const options = {
        chart: {
            zoom: {
                type: 'xy',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
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
                  color: props.lineColor
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
                  text: props.yaxisLabel,
                  style: {
                      fontSize: '12px'
                  }
              },
              labels: {
                  formatter: function (value) {
                      return value.toFixed(2)
                  }
              }
          },
          colors: [props.lineColor],
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
            <ReactApexChart options={options} series={[{name: props.dataSetLabel, data: dataSet}]} type="area" height="400"/>
        </div>
    );
}