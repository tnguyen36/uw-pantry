import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';



export default function PieChart(props) {
    const options = {
        title: {
            display: true,
            text: props.text,
            fontSize: 25,
            fontColor: 'black',
            fontStyle: 'normal'
        },
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black',
                boxWidth: 25
            }
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                return percentage + "%";
              }
            }
        },
        plugins: {
            labels: {
                fontColor: 'black',
                fontStyle: 'bold',
            }
        },
          
        
    };
    const data = {
        labels: props.labels,
        datasets: [{
            data: props.values,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00ff99',
            '#6e48aa'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00ff99',
            '#6e48aa'
            ]
        }]
    };
    


    return (
      <div>
        <Pie data={data} options={options} />
      </div>
    )
};