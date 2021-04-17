import { HttpClient } from '@angular/common/http';
import { Task } from './../../../interfaces/TaskModel';
import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ILoadedEventArgs,
  ChartComponent
} from "@syncfusion/ej2-angular-charts";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {

  public seriesRed: Object[] = [];
  public seriesIr: Object[] = [];
  public value: number = 10;
  public intervalId: any;
  public setTimeoutValue: number;
  i: number = 0;
  j: number = 0;

  @ViewChild("chart")
  public chart: ChartComponent;

  @Input() red: [] = [];
  @Input() ir: [] = [];
  @Input() hr: [] = [];
  @Input() hrValid: [] = [];
  @Input() visibleHR: [] = [];
  @Input() SPO2: [] = [];
  @Input() SPO2Valid: [] = [];
  @Input() visibleSPO2: [] = [];
  tasks: Observable<Task[]>;

  public lineChartOptions = {
    responsive: true,
  };

  public animation1: Object = {
    enable: false
  };

  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    minimum: 0,
    maximum: 80000
  };


  constructor(private _http: HttpClient) {
    for (; this.i < 100; this.i++) {
      if (Math.random() > 0.5) {
        if (this.value < 25) {
          this.value += Math.random() * 2.0;
        } else {
          this.value -= 2.0;
        }
      }
      this.seriesRed[this.i] = { x: this.i, y: this.value };
      this.seriesIr[this.i] = { x: this.i, y: this.value + 1000 };
    }
  }


  public loaded(args: ILoadedEventArgs): void {
    this.intervalId = setTimeout(() => {
      this.j++;
      this.i++;
        this.seriesRed.push({ x: this.i, y: this.red[this.j] });
        this.seriesIr.push({ x: this.i, y: this.ir[this.j] });
        this.seriesRed.shift();
        this.seriesIr.shift();
        args.chart.series[0].dataSource = this.seriesRed;
        args.chart.refresh();
      if (this.j > 199) {
        clearInterval(this.intervalId)
        this.saveHistory();
        this.j = 0;
      }
    }, 50)
  }

  saveHistory() {
    let body = {
      userName: localStorage.getItem('userLoged'),
      data: `${JSON.stringify(this.red)}*${JSON.stringify(this.ir)}*${JSON.stringify(this.visibleHR)}*${JSON.stringify(this.visibleSPO2)}`
    }

    this._http.post('https://localhost:44384/api/History/SaveHistory', body )
      .subscribe(response => {
      },
      error => {
        console.log(error);
      })
  }

}
