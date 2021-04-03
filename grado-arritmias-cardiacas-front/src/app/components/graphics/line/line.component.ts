import { Task } from './../../../interfaces/TaskModel';
import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {

  @Input() lineChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['0', '100', '200', '300', '400', '500',];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
    for (let index = 1; index < 40; index++) {
      this.lineChartLabels.push(index.toString())
    }
  }

}
