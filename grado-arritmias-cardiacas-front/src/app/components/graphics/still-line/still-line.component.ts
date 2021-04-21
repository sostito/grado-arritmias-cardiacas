import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Component, Input } from '@angular/core';

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
  @Input() originalData = []
  @Input() originalData2 = []
  @Input() tooltip: Object = {
      enable: true
  };
  @Input() name1;
  @Input() name2;
  @Input() maxData;
  isMobile = false;



  load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Material';
      args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };

  showNextData() {

  }

}
