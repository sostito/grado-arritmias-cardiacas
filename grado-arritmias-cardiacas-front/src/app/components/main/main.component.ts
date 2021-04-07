import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/TaskModel';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent /*implements OnInit*/ {

  enabledGraph = false;

  red = [];
  ir = [];
  hr = [];
  hrValid = [];
  sPO2 = [];
  sPO2Valid = [];
  visibleHR = '-';
  visibleSPO2 = '-';

  currentIndex = 1;

  tasks: Observable<Task[]>;

  constructor(public signalRService: SignalRService, private store: Store, private _router: Router) {
    // Accedemos a la store:
    this.tasks = this.store.select((tasks: any) => tasks)

    this.tasks.subscribe((data: any) => {
      if (data['tasks'] && data['tasks'].length > 1) {
        let result = data['tasks'].map((data) =>
          JSON.parse(data['state'])
        )

        let dataToProcess = result[this.currentIndex][this.currentIndex - 1]
        let splitItem = dataToProcess.split(',')
        this.red.push(splitItem[0])
        this.ir.push(splitItem[1])
        this.hr.push(splitItem[2])
        this.hrValid.push(splitItem[3])
        this.sPO2.push(splitItem[4])
        this.sPO2Valid.push(splitItem[5])
        this.visibleHR = splitItem[3] == '1' ? splitItem[2] : this.visibleHR
        this.visibleSPO2 = (splitItem[5] && splitItem[5].includes('1')) ? splitItem[4] : this.visibleSPO2
        this.currentIndex++;
      }
    })
  }

  ngOnInit() {
    
    if(localStorage.getItem('userLoged') == null){
      this._router.navigate(['login']);
    }

    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }

  enabled() {
    this.signalRService.dataChartLine = [];
    this.signalRService.sendHeartBeat();
    this.enabledGraph = true;
  }

}
