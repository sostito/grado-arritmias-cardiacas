import { HttpClient } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import * as EventEmitter from 'node:events';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  // custom code end
  showChart = false;
  maxData = 50;
  isMobile = false;

  data: Object[] = [];
  data2: Object[] = [];
  SPO2: number;
  SPO2Message: string;
  SPO2Tooltip: string;
  hr: number;
  hrMessage: string;
  hrTooltip: string;
  originalDataRed = []
  originalDataIr = []
  historyData;
  title: string = 'Gráfica Red e Ir';
  width: string =  '100%';
  chartArea: Object = {
      border: {
          width: 0
      }
  };
  marker: Object = {
      visible: true,
      height: 10,
      width: 10
  };

  constructor(private _http: HttpClient) {

    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    this.getHistory();
  }

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

      // 0=red; 1=ir; 2=hr; 3=SPO2
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

      if (currentIndex == 2) {
        countx = 1;
        this.SPO2 = Number(item2.replace('"', ''))
        this.SPO2Message = "Su oxígeno en sangre fue de un: " + this.SPO2 + "%"
        this.SPO2Tooltip = " Los valores inferiores al 90 por ciento se consideran bajos e indican la necesidad de oxígeno suplementario. \n\nPara las personas con afecciones pulmonares crónicas y otros problemas respiratorios, no se aplica el rango de SpO2 'normal' del 95% al ​​100%. Estas personas siempre deben consultar con tu médico para obtener información sobre los niveles de oxígeno aceptables para tu estado de salud único. "
      }

      if (currentIndex == 3) {
        countx = 1;
        this.hr = Number(item2.replace('"', ''))
        this.hrMessage = "Su ritmo cardíaco fue de: " + this.hr
        this.hrTooltip = "Una frecuencia cardíaca en reposo normal para los adultos oscila entre 60 y 100 latidos por minuto.\n\nGeneralmente, una frecuencia cardíaca más baja en reposo implica una función cardíaca más eficiente y un mejor estado físico cardiovascular. Por ejemplo, un atleta bien entrenado puede tener una frecuencia cardíaca en reposo normal cercana a 40 latidos por minuto."
      }
    })

    this.data = this.isMobile ? this.originalDataRed.slice(0,15) : this.originalDataRed.slice(0,50)
    this.data2 = this.isMobile ? this.originalDataIr.slice(0,15) : this.originalDataIr.slice(0,50)
    this.showChart = true;
  }

}
