import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Component, Input, Output } from '@angular/core';
import * as EventEmitter from 'node:events';

@Component({
  selector: 'app-still-line',
  templateUrl: './still-line.component.html',
  styleUrls: ['./still-line.component.css']
})
export class StillLineComponent {

  @Input() data: Object[] = [];
  @Input() data2: Object[] = [];
  @Input() title: string;
  @Input() primaryXAxis: Object = {};
  @Input() primaryYAxis: Object = {};
  @Input() chartArea: Object = {};
  @Input() width: string =  '100%';
  @Input() marker: Object = {};
  @Input() originalDataRed = []
  @Input() originalDataIr = []
  @Input() tooltip: Object = {
      enable: true
  };

  @Input() maxData;
  isMobile = false;



  load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Material';
      args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };

  showNextData() {
    this.data = this.originalDataRed.slice(this.maxData + 1, this.maxData + (this.isMobile ? 15 : 50))
    this.data2 = this.originalDataIr.slice(this.maxData + 1, this.maxData + (this.isMobile ? 15 : 50))
    this.maxData += this.isMobile ? 15 : 50;
  }

}
