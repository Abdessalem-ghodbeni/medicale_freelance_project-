import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {GraphApiService} from "../../Services/graph-api.service";


@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  
  apiData: any; // Variable pour stocker les données de l'API
  myChart: Chart; // Variable pour stocker l'instance du graphique Chart.js

  constructor(private graphApiService: GraphApiService) {
    Chart.register(...registerables); // Enregistrement des modules nécessaires de Chart.js
  }

  ngOnInit(): void {
    
     this.graphApiService.table$.subscribe((data) => {
      this.apiData = JSON.parse(data);
      console.log(this.apiData);
      this.createChart(); // Création du graphique
    });
      
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.destroy(); // Destruction du graphique lors de la destruction du composant
    }
  }

  createChart(): void {
    setTimeout(() => {
      const chartData = {
        labels: [], // Les dates seront ajoutées ici
        datasets: [
          {
            label: "Mesure",
            data: [], // Les valeurs de mesure seront ajoutées ici
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)"
          }
        ]
      };
      // Extraction des valeurs nécessaires
      this.apiData.levels.forEach(level => {
        chartData.labels.push(level.date);
        chartData.datasets[0].data.push(level.measure);
      });
      // Création du graphique
      const ctx = document.getElementById("myChart");
      // @ts-ignore
      this.myChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: this.apiData?.mesureOf // Utilisation de la valeur de "mesureOf" comme titre
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date"
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Mesure"
              }
            }
          },
          legend: {
            display: false
          }
        }
      });
    }, 1000);
  }
  
}