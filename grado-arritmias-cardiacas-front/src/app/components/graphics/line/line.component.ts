import { HttpClient } from '@angular/common/http';
import { Task } from './../../../interfaces/TaskModel';
import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import {environment } from '../../../../environments/environment';

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
  @Output() lastHRValue = new EventEmitter<string>();

  avgHr: number;

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

  primerRango = []
  segundoRango = []
  tercerRango = []

  public loaded(args: ILoadedEventArgs): void {

    let primeraSuma = this.primerRango.reduce((a, b) => Number(a) + Number(b), 0);
    let SegundaSuma = this.segundoRango.reduce((a, b) => Number(a) + Number(b), 0);
    let terceraSuma = this.tercerRango.reduce((a, b) => Number(a) + Number(b), 0);

    /*console.log('primer rango: ' + this.primerRango.length + ' - suma:  ' + primeraSuma + ' - Dividido: ' + this.primerRango.length + ' - igual: ' + primeraSuma / this.primerRango.length)
    console.log('segundo rango: ' + this.segundoRango.length + ' - suma:  ' + SegundaSuma + ' - Dividido: ' + this.segundoRango.length + ' - igual: ' + SegundaSuma / this.segundoRango.length)
    console.log('tercer rango: ' + this.tercerRango.length + ' - suma:  ' + terceraSuma + ' - Dividido: ' + this.tercerRango.length + ' - igual: ' + terceraSuma / this.tercerRango.length)*/

    var total = (primeraSuma + SegundaSuma ) / (this.primerRango.length + this.segundoRango.length )


    this.intervalId = setTimeout(() => {

      if ((this.visibleHR != '-')) {
        this.i++;
        this.j++;

        if (this.visibleHR <= 100) {
          this.primerRango.push(this.visibleHR)
        } else if (this.visibleHR > 100 && this.visibleHR <= 130) {
          this.segundoRango.push(this.visibleHR)
        } else {
          this.tercerRango.push(this.visibleHR)
        }

        if (this.averageHr != 0) {
          this.averageHr = (this.averageHr + Number(this.visibleHR)) / 2
        } else {
          this.averageHr = Number(this.visibleHR)
        }
        this.averageHr = Math.round(this.averageHr)
      }
      this.seriesHr.push({ x: this.i, y: total });
      this.seriesHr.shift();
      args.chart.series[0].dataSource = this.seriesHr;
      args.chart.refresh();

      if (this.j > 60) {
        clearInterval(this.intervalId)
        this.saveHistory();
        this.j = 0;
      }
    }, 500)


    if(this.primerRango.length > this.segundoRango.length && this.primerRango.length > this.tercerRango.length ){
      this.avgHr = Math.floor(primeraSuma / this.primerRango.length);
    }else if(this.segundoRango.length > this.primerRango.length && this.segundoRango.length > this.tercerRango.length){
      this.avgHr = Math.floor(SegundaSuma / this.segundoRango.length);
    }else if(this.tercerRango.length > this.primerRango.length && this.tercerRango.length > this.segundoRango.length){
      this.avgHr = Math.floor(terceraSuma / this.tercerRango.length);
    }

    if (!isNaN(this.avgHr)) {
      console.log('wtf: ' + this.avgHr)
      this.lastHRValue.emit(String(this.avgHr));
    }
  }

  saveHistory() {
    let body = {
      userName: localStorage.getItem('userLoged'),
      data: `${JSON.stringify(this.avgHr)}*${JSON.stringify(Number(this.visibleSPO2))}`
    }

    this._http.post(`${environment.urlApi}api/History/SaveHistory`, body )
      .subscribe(response => {
      },
      error => {
        console.log(error);
      })
  }

}
