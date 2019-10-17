import React from 'react';
import { Pie } from 'react-chartjs-2';


const options = {
    title: {
        display: true,
        text: 'Class Standing',
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
    
};

export default function PieChart(props) {
    const data = {
        labels: props.classStandingsLabels,
        datasets: [{
            data: props.classStandingsValues,
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