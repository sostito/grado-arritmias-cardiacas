import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ChartModel } from '../interfaces/ChartModel';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  public data: ChartModel[];
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
    this.hubConnection.on('ReceiveHeartBeat', (data) => {
      console.log(data);
    });
  }

  public invocar() {
    this.hubConnection.invoke('SendHeartBeat', 123456)
    .catch(err => console.error(err));
  }
}
