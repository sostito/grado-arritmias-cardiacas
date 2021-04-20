import { HttpClient } from '@angular/common/http';
import { Component, Output } from '@angular/core';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  // custom code end
  isMobile = false;
  showInformation = false;
  SPO2Result: string;
  SPO2Message: string;
  SPO2TooltipClass: string;
  hrMessage: string;
  hrResult: string;
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
        this.hrResult = "Su ritmo cardíaco fue de: " + item2
      }

      if (currentIndex == 1) {
        spo2 = item2;
        this.SPO2Result = "Su oxígeno en sangre fue de un: " + item2 + "%"
        this.SPO2Message = " Los valores inferiores al 90 por ciento se consideran bajos e indican la necesidad de oxígeno suplementario. \n\nPara las personas con afecciones pulmonares crónicas y otros problemas respiratorios, no se aplica el rango de SpO2 'normal' del 95% al ​​100%. Estas personas siempre deben consultar con tu médico para obtener información sobre los niveles de oxígeno aceptables para tu estado de salud único. "
      }
    })
    this.calculateUser(hr, spo2)
    this.showInformation = true;
  }

  calculateUser(hr, spo2) {
    const user = JSON.parse(localStorage.getItem('dataUser'));

    if (user.age <= 2) {

      this.hrMessage = "Un niño hasta la edad de 2 años de edad debería tener un ritmo cardiaco entre los 120 y 140 latidos por minutos (lpm)."
      if (hr >= 120 && hr <= 140) {
        this.hrTooltipClass = "alert alert-success"
        this.hrMessage = "Ritmo cardiaco OPTIMO. " + this.hrMessage;
      } else {
        this.hrTooltipClass = "alert alert-danger"
        this.hrMessage = "Ritmo cardiaco NO OPTIMO. " + this.hrMessage;
      }

    } else if (user.age >= 8 && user.age <= 17) {

      this.hrMessage = "Un joven de entre 8 y 17 años de edad debería tener un ritmo cardiaco entre los 80 y 10 latidos por minutos (lpm)."
      if (hr >= 80 && hr <= 100) {
        this.hrTooltipClass = "alert alert-success"
        this.hrMessage = "Ritmo cardiaco OPTIMO. " + this.hrMessage;
      } else {
        this.hrTooltipClass = "alert alert-danger"
        this.hrMessage = "Ritmo cardiaco NO OPTIMO. " + this.hrMessage;
      }

    } else if (user.age >= 18 && user.age <= 65) {

      this.hrMessage = "Una persona sedentaria de entre 18 y 65 años de edad debería tener un ritmo cardiaco entre los 70 y 80 latidos por minutos (lpm)."
      if (hr >= 70 && hr <= 80) {
        this.hrTooltipClass = "alert alert-success"
        this.hrMessage = "Ritmo cardiaco OPTIMO. " + this.hrMessage;
      } else {
        this.hrTooltipClass = "alert alert-danger"
        this.hrMessage = "Ritmo cardiaco NO OPTIMO. " + this.hrMessage;
      }

    } else if (user.age > 65) {
      this.hrMessage = "Una persona mayor a 65 años de edad debería tener un ritmo cardiaco entre los 50 y 60 latidos por minutos (lpm)."

      if (hr >= 50 && hr <= 60) {
        this.hrTooltipClass = "alert alert-success"
        this.hrMessage = "Ritmo cardiaco OPTIMO. " + this.hrMessage;
      } else {
        this.hrTooltipClass = "alert alert-danger"
        this.hrMessage = "Ritmo cardiaco NO OPTIMO. " + this.hrMessage;
      }

    }

    if (spo2 > 95) {
      this.SPO2TooltipClass = "alert alert-success"
      this.SPO2Message = "Ritmo cardiaco NORMAL. " + this.SPO2Message;
    } else if(spo2 >= 80 && spo2 < 95) {
      this.SPO2TooltipClass = "alert alert-warning"
      this.SPO2Message = "Ritmo cardiaco NO OPTIMO. " + this.SPO2Message;
    } else {
      this.SPO2TooltipClass = "alert alert-danger"
      this.SPO2Message = "Ritmo cardiaco BAJO. " + this.SPO2Message;
    }

  }

}
