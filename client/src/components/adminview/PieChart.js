import React from 'react';
import ReactApexChart from 'react-apexcharts';




export default function PieChart(props) {
      
  
       const options = {
          labels: props.labels,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          title: {
              text: props.text,
              align: 'left',
              style: {
                  fontSize: '20px',
                  color: '#4b2e83'
                  
              }
          },
          legend: {
              position: 'bottom',
              
          },
          chart: {
              background: '#fff',
              toolbar: {
                show: true,
                tools: {
                  download: true
                }
              }
          },
        };

    

    if (!props.values || !props.labels) {
        return <div>Loading</div>
    } else {

    
      return (
        <div id="chart">
            <ReactApexChart options={options} series={props.values}type="pie" height='300' />
        </div>
      )
    }
};

    
