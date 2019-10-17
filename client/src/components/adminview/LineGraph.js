import React from 'react';
import { Line } from 'react-chartjs-2';


const options = {
    title: {
        display: true,
        text: 'New Users Per Month',
        fontSize: 25,
        fontColor: 'black',
        fontStyle: 'normal'
    },
    legend: {
        position: 'bottom',
        labels: {
            fontColor: 'black',
            boxWidth: 20
        }
    },
   };

function getDataSet(dateGroups) {
    var result = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < dateGroups.length; i++) {
        result[dateGroups[i]._id - 1] = dateGroups[i].total
    }
    console.log(result);
    
   
    return result;
}

export default function LineGraph(props) {
    const dataSet = getDataSet(props.dateGroups)
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
            label: new Date().getFullYear(),
            data: dataSet,
            backgroundColor: '#6e48aa',
            fill: false,
            lineTension: 0.1,
            borderColor: '#6e48aa',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointRadius: 5,
            pointHitRadius: 10
        }],

    };
    


    return (
      <div>
        <Line data={data} options={options} />
      </div>
    )
};