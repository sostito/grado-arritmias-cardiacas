import { ChartModel } from './interfaces/ChartModel';
import { Task } from './interfaces/TaskModel';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  chartValue: ChartModel[] = [
    { data: [], label: 'Series A' },
  ]

  tasks: Observable<Task[]>;

  constructor(public signalRService: SignalRService, private store: Store) {
    // Accedemos a la store:
    this.tasks = this.store.select((tasks: any) => tasks)

    this.tasks.subscribe((data: any) => {
      if (data['tasks'] && data['tasks'].length > 149) {

        let result = data['tasks'].map((data) =>
          JSON.parse(data['state'])
        )

        let result2 = result[149].map((item) => Number(item))

        let newCharModel: ChartModel[] = [
          { data: result2, label: 'Series A' },
        ]
        this.chartValue = newCharModel;
      }
    })

  }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }

  sendHeartBeat() {
    this.signalRService.sendHeartBeat()
  }

}
