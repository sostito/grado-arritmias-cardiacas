import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from 'selenium-webdriver';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  // custom code end
  showChart = false;
  maxData = 50;
  isMobile = false;

  @Output() title: string = 'Gráfica Red e Ir';
  //Initializing Primary X Axis
  @Output() primaryXAxis: Object = {
  };
  //Initializing Primary Y Axis
  @Output() primaryYAxis: Object = {
  };
  @Output() chartArea: Object = {
      border: {
          width: 0
      }
  };
  @Output() width: string =  '100%';
  @Output() marker: Object = {
      visible: true,
      height: 10,
      width: 10
  };
  @Output() tooltip: Object = {
      enable: true
  };

  constructor(private _http: HttpClient) {

    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    this.getHistory();
  }

  ngOnInit(): void {
  }


  public data: Object[] = [];
  public data2: Object[] = [];
  @Output() originalDataRed = []
  @Output() originalDataIr = []
  historyData;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };


  getHistory() {
    this._http.get('https://localhost:44384/api/History/GetHistory/' + localStorage.getItem('userLoged'))
      .subscribe(response => {
      this.historyData = response
    },
    error => {
      console.log(error);
    })
  }

  getDataChart(keyDay) {
    let countx = 1;
    this.originalDataRed = [];
    this.originalDataIr = [];
    this.showChart = false;
    this.maxData = 50;

    this.historyData[keyDay].split('*').map((item2, currentIndex) => {
      item2 = item2.replace(']', '').replace('[', '').replace('"', '')

      // 0=red; 2=ir; 3=hr; 4=SPO2
      if (currentIndex == 0) {
        item2.split('","').map((item3) => {
          countx++;
          this.originalDataRed.push({ x: countx, y: Number(item3) })
        })
      }

      if (currentIndex == 1) {
        countx = 1;
        item2.split('","').map((item3) => {
          countx++;
          this.originalDataIr.push({ x: countx, y: Number(item3) })
        })
      }
    })

    this.data = this.isMobile ? this.originalDataRed.slice(0,15) : this.originalDataRed.slice(0,50)
    this.data2 = this.isMobile ? this.originalDataIr.slice(0,15) : this.originalDataIr.slice(0,50)
    this.showChart = true;
  }

  showNextData() {
    this.data = this.originalDataRed.slice(this.maxData + 1, this.maxData + (this.isMobile ? 15 : 50))
    this.data2 = this.originalDataIr.slice(this.maxData + 1, this.maxData + (this.isMobile ? 15 : 50))
    this.maxData += this.isMobile ? 15 : 50;
  }

}
