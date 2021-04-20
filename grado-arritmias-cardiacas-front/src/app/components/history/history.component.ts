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
  isMobile = false;
  showInformation = false;
  SPO2Message: string;
  SPO2Tooltip: string;
  SPO2TooltipClass: string;
  hrMessage: string;
  hrTooltip: string;
  hrTooltipClass: string;
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
    let hr;
    let spo2;
    this.historyData[keyDay].split('*').map((item2, currentIndex) => {
      if (currentIndex == 0) {
        hr = item2;
        this.hrMessage = "Su ritmo cardíaco fue de: " + item2
        this.hrTooltip = "Una frecuencia cardíaca en reposo normal para los adultos oscila entre 60 y 100 latidos por minuto.\n\nGeneralmente, una frecuencia cardíaca más baja en reposo implica una función cardíaca más eficiente y un mejor estado físico cardiovascular. Por ejemplo, un atleta bien entrenado puede tener una frecuencia cardíaca en reposo normal cercana a 40 latidos por minuto."
      }

      if (currentIndex == 1) {
        spo2 = item2;
        this.SPO2Message = "Su oxígeno en sangre fue de un: " + item2 + "%"
        this.SPO2Tooltip = " Los valores inferiores al 90 por ciento se consideran bajos e indican la necesidad de oxígeno suplementario. \n\nPara las personas con afecciones pulmonares crónicas y otros problemas respiratorios, no se aplica el rango de SpO2 'normal' del 95% al ​​100%. Estas personas siempre deben consultar con tu médico para obtener información sobre los niveles de oxígeno aceptables para tu estado de salud único. "
      }
    })
    this.calculateUser(hr, spo2)
    this.showInformation = true;
  }

  calculateUser(hr, spo2) {
    if (hr >= 60 && hr <= 100) {
      this.hrTooltipClass = "alert alert-success"
    } else {
      this.hrTooltipClass = "alert alert-danger"
    }

    if (spo2 > 95) {
      this.SPO2TooltipClass = "alert alert-success"
    } else if(spo2 >= 80 && spo2 < 95) {
      this.SPO2TooltipClass = "alert alert-warning"
    } else {
      this.SPO2TooltipClass = "alert alert-danger"
    }
  }

}
