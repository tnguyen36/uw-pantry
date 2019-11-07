import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function BarGraph(props) {
    const dataSet = props.getDataSet(props.dateGroups)
    const options = {
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: props.getLabels(),
          
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          }
        },
        fill: {
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          },
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
          }
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }


    return (
        <div>
             <ReactApexChart options={options} series={[{name: 'Total', data: dataSet}]} type="bar" height="400"/>
        </div>
    );
}