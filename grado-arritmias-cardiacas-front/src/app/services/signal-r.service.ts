import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { Store } from '@ngrx/store';

import * as TaskActions from './../../store/tasks.actions';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {

  dataChartLine = new Array<number>();

  constructor(private store: Store) {

  }

 private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44384/heartbeathub', {
                            skipNegotiation: true,
                            transport: signalR.HttpTransportType.WebSockets
                          })
    .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  addTransferChartDataListener = () => {
    this.hubConnection.on('ReceiveHeartBeat', (data: number) => {
      console.log(data)
      this.addTask(data)
    });
  }

  public sendHeartBeat() {
    this.store.dispatch(new TaskActions.CleanTask({ name: "First Task", state: ""}) )
    this.hubConnection.invoke('SendHeartBeat')
    .catch(err => console.error(err));
  }

  addTask(data) {
    this.dataChartLine.push(data);
    this.store.dispatch(new TaskActions.AddTask({ name: "First Task", state: JSON.stringify(this.dataChartLine)}) )
  }
}
