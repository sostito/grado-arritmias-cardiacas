import { HttpClient } from '@angular/common/http';
import { Task } from './../../../interfaces/TaskModel';
import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ILoadedEventArgs,
  ChartComponent
} from "@syncfusion/ej2-angular-charts";
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {

  public seriesHr: Object[] = [];
  public value: number = 10;
  public intervalId: any;
  public setTimeoutValue: number;
  i: number = 0;
  j: number = 0;
  averageHr = 0;

  @ViewChild("chart")
  public chart: ChartComponent;

  @Input() hr: [] = [];
  @Input() hrValid: [] = [];
  @Input() visibleHR;
  @Input() SPO2: [] = [];
  @Input() SPO2Valid: [] = [];
  @Input() visibleSPO2;
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
    maximum: 300
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
      this.seriesHr[this.i] = { x: this.i, y: this.value };
    }
  }


  public loaded(args: ILoadedEventArgs): void {
    this.intervalId = setTimeout(() => {



      if ((this.visibleHR != '-')) {
        this.i++;
        this.j++;
        if (this.averageHr != 0) {
          this.averageHr = (this.averageHr + Number(this.visibleHR)) / 2
        } else {
          this.averageHr = Number(this.visibleHR)
        }
        this.averageHr = Math.round(this.averageHr)
      }
      this.seriesHr.push({ x: this.i, y: this.averageHr });
      this.seriesHr.shift();
      args.chart.series[0].dataSource = this.seriesHr;
      args.chart.refresh();

      if (this.j > 199) {
        clearInterval(this.intervalId)
        this.saveHistory();
        this.j = 0;
      }
    }, 150)
  }

  saveHistory() {
    let body = {
      userName: localStorage.getItem('userLoged'),
      data: `${JSON.stringify(this.averageHr)}*${JSON.stringify(Number(this.visibleSPO2))}`
    }

    this._http.post('https://localhost:44384/api/History/SaveHistory', body )
      .subscribe(response => {
      },
      error => {
        console.log(error);
      })
  }

}
