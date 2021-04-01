import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(public signalRService: SignalRService, private http: HttpClient) { }
  ngOnInit() {
    console.log("1")
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }

  invocar() {
    this.signalRService.invocar()
  }
}
