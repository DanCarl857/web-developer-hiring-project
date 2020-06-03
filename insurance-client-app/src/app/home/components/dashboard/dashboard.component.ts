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
  wiring = 0;
  floor = 0;
  paint = 0;
  roof = 0;
  doors = 0;

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
    'Wiring & Pipes',
    'Floor Condition',
    'Paint Condition',
    'Roof Condition',
    'Doors, windows & ceilings'
  ];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Property Defect Analysis' }
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

    // First 3 properties are the worst
    // and last 3 are the best based on their ratings
    this.defectivePropertyArray = tempData.slice(0, 3);
    this.goodPropertyArray = tempData.slice(Math.max(tempData.length - 3, 0));
    this.generateDashboardData(value);
  }

  generateDashboardData(data) {
    // Total # of properties
    this.totalCount = data.count;

    // Generate some data
    [...data.data].map((property) => {
      // Generate data for Defect Analysis graph
      if (property.inspection) {
        const inspectionData = JSON.parse(property.inspection);
        this.wiring += inspectionData.wiring;
        this.floor += inspectionData.floor;
        this.paint += inspectionData.paint;
        this.roof += inspectionData.roof;
        this.doors += inspectionData.doors;
      }

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

    this.radarChartData = [
      {
        data: [this.wiring, this.floor, this.paint, this.roof, this.doors],
        label: 'Property Defect Analysis'
      }
    ];

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
