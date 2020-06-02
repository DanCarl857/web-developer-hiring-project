import { Component, OnInit } from '@angular/core';
import {
  ChartType,
  ChartOptions,
  ChartDataSets,
  RadialChartOptions
} from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  MultiDataSet
} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public radarChartOptions: RadialChartOptions = {
    responsive: true
  };
  public radarChartLabels: Label[] = [
    'Punctuality',
    'Communication',
    'Problem Solving',
    'Team Player',
    'Coding',
    'Technical Knowledge',
    'Meeting Deadlines'
  ];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
  ];
  public radarChartType: ChartType = 'radar';

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [[55, 25, 20]];
  doughnutChartType: ChartType = 'doughnut';
  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {}
}
