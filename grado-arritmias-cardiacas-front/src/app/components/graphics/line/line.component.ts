import { Task } from './../../../interfaces/TaskModel';
import { Component, Input, ViewChild } from '@angular/core';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';

import {
  ILoadedEventArgs,
  Series,
  ChartTheme,
  ChartComponent
} from "@syncfusion/ej2-angular-charts";
import { getElement } from "@syncfusion/ej2-charts";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {

  public series1: Object[] = [];
  public value: number = 10;
  public intervalId: any;
  public setTimeoutValue: number;
  i: number = 0;
  j: number = 0;
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    minimum: 0,
    maximum: 160000
  };


  @ViewChild("chart")
  public chart: ChartComponent;

  @Input() lineChartData: [] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
  };

  tasks: Observable<Task[]>;

  constructor() {
    for (let index = 1; index < 40; index++) {
      this.lineChartLabels.push(index.toString())
    }

    for (; this.i < 100; this.i++) {
      if (Math.random() > 0.5) {
        if (this.value < 25) {
          this.value += Math.random() * 2.0;
        } else {
          this.value -= 2.0;
        }
      }
      this.series1[this.i] = { x: this.i, y: this.value };
    }
  }

  public animation1: Object = {
    enable: false
  };


  public loaded(args: ILoadedEventArgs): void {
    this.intervalId = setTimeout(() => {
      this.j++;
      this.i++;
      console.log(this.lineChartData[this.j])
        this.series1.push({ x: this.i, y: this.lineChartData[this.j] });
        this.series1.shift();
        args.chart.series[0].dataSource = this.series1;
      args.chart.refresh();
      if (this.j > 148) {
        clearInterval(this.intervalId)
        this.j = 0;
      }
    },100)

  }

}
