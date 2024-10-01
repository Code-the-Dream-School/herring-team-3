import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SampleChart = () => {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: '# of Kit Requests',
          data: [12, 19, 10, 5, 7, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      myChart.destroy(); // Clean up the chart on component unmount
    };
  }, []);

  return (
    <canvas id="myChart" width="400" height="200"></canvas>
  );
};

export default SampleChart;
