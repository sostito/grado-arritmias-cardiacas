import { Task } from './interfaces/TaskModel';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent /*implements OnInit*/ {

  enabledGraph = false;

  red = [];
  ir = [];
  hr = [];
  hrValid = [];
  sPO2 = [];
  sPO2Valid = [];
  visibleHR = '-';
  visibleSPO2 = '-';

  tasks: Observable<Task[]>;

  constructor(public signalRService: SignalRService, private store: Store) {
    // Accedemos a la store:
    this.tasks = this.store.select((tasks: any) => tasks)

    this.tasks.subscribe((data: any) => {
      if (data['tasks'] && data['tasks'].length > 199) {
        let result = data['tasks'].map((data) =>
          JSON.parse(data['state'])
        )

        result[199].map((item: string) => {
          let splitItem = item.split(',')
          this.red.push(splitItem[0])
          this.ir.push(splitItem[1])
          this.hr.push(splitItem[2])
          this.hrValid.push(splitItem[3])
          this.sPO2.push(splitItem[4])
          this.sPO2Valid.push(splitItem[5])
          this.visibleHR = splitItem[3] == '1' ? splitItem[2] : this.visibleHR
          this.visibleSPO2 = (splitItem[5] && splitItem[5].includes('1')) ? splitItem[4] : this.visibleSPO2
        })
      }
    })
  }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }

  enabled() {
    this.signalRService.dataChartLine = [];
    this.signalRService.sendHeartBeat();
    this.enabledGraph = true;
  }

}
