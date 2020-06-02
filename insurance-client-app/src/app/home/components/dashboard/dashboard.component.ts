/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  properties: any = [];
  defectivePropertyArray = [];
  goodPropertyArray = [];
  totalCount = 0;
  propertiesInspected = 0;
  goodProperties = 0;
  defectiveProperties = 0;
  neutralProperties = 0;

  // Plot Pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [['Good'], ['Defective'], 'Neutral'];
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public radarChartOptions: RadialChartOptions = {
    responsive: true
  };
  public radarChartLabels: Label[] = [
    'Bad Wiring',
    'Roof Condition',
    'Leaking pipes',
    'Rotten Wood',
    'Poor painting',
    'Destroyed ceilings',
    'Bad Doors'
  ];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Property Defect Analysis' }
  ];
  public radarChartType: ChartType = 'radar';

  doughnutChartLabels: Label[] = ['Good', 'Defective', 'Done'];
  doughnutChartData: MultiDataSet = [[0, 0, 0]];
  doughnutChartType: ChartType = 'doughnut';
  constructor(private propertyService: PropertyService) {
    this.getAllProperties();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {}

  async getAllProperties() {
    const value = await this.propertyService.getAllProperties();
    const tempData = [...value.data];
    tempData.sort((a, b) => a.rating - b.rating);
    this.defectivePropertyArray = tempData.slice(0, 3);
    this.goodPropertyArray = tempData.slice(Math.max(tempData.length - 3, 0));
    this.generateDashboardData(value);
  }

  generateDashboardData(data) {
    // Total # of properties
    this.totalCount = data.count;

    // Generate some data
    [...data.data].map((property) => {
      if (property.inspected) {
        this.propertiesInspected += 1;
      }
      if (property.comment === 'DEFECTIVE') {
        this.defectiveProperties += 1;
      } else if (property.comment === 'GOOD') {
        this.goodProperties += 1;
      } else {
        this.neutralProperties += 1;
      }
    });

    const inspected = (
      (this.propertiesInspected / this.totalCount) *
      100
    ).toFixed(2);
    this.propertiesInspected = parseFloat(inspected);
    const defective = (
      (this.defectiveProperties / this.totalCount) *
      100
    ).toFixed(2);
    this.defectiveProperties = parseFloat(defective);
    const good = ((this.goodProperties / this.totalCount) * 100).toFixed(2);
    this.goodProperties = parseFloat(good);
    const neutral = ((this.neutralProperties / this.totalCount) * 100).toFixed(
      2
    );
    this.neutralProperties = parseFloat(neutral);
    this.plotGraphs();
  }

  plotGraphs() {
    // Plot Pie Chart
    this.pieChartData = [
      this.goodProperties,
      this.defectiveProperties,
      this.neutralProperties
    ];

    // Plot Doughnut Chart
    this.doughnutChartData = [
      [
        Math.ceil((this.goodProperties * this.totalCount) / 100),
        Math.ceil((this.defectiveProperties * this.totalCount) / 100),
        Math.ceil((this.propertiesInspected * this.totalCount) / 100)
      ]
    ];
  }
}
