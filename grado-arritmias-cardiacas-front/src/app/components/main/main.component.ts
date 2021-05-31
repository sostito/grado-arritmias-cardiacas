import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/TaskModel';
import { User } from 'src/app/interfaces/UserModel.interface';
import { SignalRService } from 'src/app/services/signal-r.service';
import { environment } from 'src/environments/environment';

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
  sPO2: number[] = [];
  sPO2Valid = [];
  visibleHR = '-';
  visibleSPO2 = '-';
  enableStatusBar: boolean = false;
  statusBarLevel: number = 1;
  userData: User;
  lastHRValue: String = '-';
  disabledMetering = false;

  currentIndex = 1;

  tasks: Observable<Task[]>;

  constructor(private _http: HttpClient,public signalRService: SignalRService, private store: Store, private _router: Router) {
    // Accedemos a la store:
    this.tasks = this.store.select((tasks: any) => tasks)

    this.tasks.subscribe((data: any) => {
      if (data['tasks'] && data['tasks'].length > 1) {
        let result = data['tasks'].map((data) =>
          JSON.parse(data['state'])
        )


        let dataToProcess = result[this.currentIndex][this.currentIndex - 1]
        let splitItem = dataToProcess.split(',');

        console.log(Number(splitItem[2]));

        this.hr.push(splitItem[0])
        this.hrValid.push(splitItem[1])
        this.sPO2.push(Number(splitItem[2]))
        this.sPO2Valid.push(splitItem[3])
        this.visibleHR = splitItem[1] == '1' ? splitItem[0] : this.visibleHR
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
    this.getUser();
  }

  calculateStats(heartRate: number){
    if(this.userData.gender == 'm'){
      if(this.userData.age <= 35){
        if(heartRate <= 61){
          this.statusBarLevel = 0;
        }else if(heartRate >= 62 && heartRate <= 65){
          this.statusBarLevel = 1;
        }else if(heartRate > 65 && heartRate <= 81){
          this.statusBarLevel = 2;
        }else if(heartRate > 81){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 35 && this.userData.age <= 45){
        if(heartRate <= 62){
          this.statusBarLevel = 0;
        }else if(heartRate >= 63 && heartRate <= 66){
          this.statusBarLevel = 1;
        }else if(heartRate > 66 && heartRate <= 82){
          this.statusBarLevel = 2;
        }else if(heartRate >= 83){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 45 && this.userData.age <= 55){
        if(heartRate <= 63){
          this.statusBarLevel = 0;
        }else if(heartRate >= 64 && heartRate <= 67){
          this.statusBarLevel = 1;
        }else if(heartRate > 67 && heartRate <= 83){
          this.statusBarLevel = 2;
        }else if(heartRate > 83){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 55 && this.userData.age <= 65){
        if(heartRate <= 61){
          this.statusBarLevel = 0;
        }else if(heartRate >= 62 && heartRate <= 67){
          this.statusBarLevel = 1;
        }else if(heartRate > 67 && heartRate <= 81){
          this.statusBarLevel = 2;
        }else if(heartRate > 81){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 65){
        if(heartRate <= 61){
          this.statusBarLevel = 0;
        }else if(heartRate >= 62 && heartRate <= 65){
          this.statusBarLevel = 1;
        }else if(heartRate > 65 && heartRate <= 79){
          this.statusBarLevel = 2;
        }else if(heartRate > 79){
          this.statusBarLevel = 3;
        }
      }
    }else if(this.userData.gender == 'f'){
      if(this.userData.age <= 25){
        if(heartRate <= 65){
          this.statusBarLevel = 0;
        }else if(heartRate >= 66 && heartRate <= 69){
          this.statusBarLevel = 1;
        }else if(heartRate > 69 && heartRate <= 84){
          this.statusBarLevel = 2;
        }else if(heartRate > 84){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 25 && this.userData.age <= 35){
        if(heartRate <= 64){
          this.statusBarLevel = 0;
        }else if(heartRate >= 65 && heartRate <= 68){
          this.statusBarLevel = 1;
        }else if(heartRate > 68 && heartRate <= 82){
          this.statusBarLevel = 2;
        }else if(heartRate >= 83){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 35 && this.userData.age <= 45){
        if(heartRate <= 64){
          this.statusBarLevel = 0;
        }else if(heartRate >= 65 && heartRate <= 69){
          this.statusBarLevel = 1;
        }else if(heartRate > 69 && heartRate <= 84){
          this.statusBarLevel = 2;
        }else if(heartRate > 84){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 45 && this.userData.age <= 55){
        if(heartRate <= 65){
          this.statusBarLevel = 0;
        }else if(heartRate >= 66 && heartRate <= 69){
          this.statusBarLevel = 1;
        }else if(heartRate > 69 && heartRate <= 83){
          this.statusBarLevel = 2;
        }else if(heartRate > 83){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 55 && this.userData.age <= 65){
        if(heartRate <= 64){
          this.statusBarLevel = 0;
        }else if(heartRate >= 65 && heartRate <= 68){
          this.statusBarLevel = 1;
        }else if(heartRate > 68 && heartRate <= 83){
          this.statusBarLevel = 2;
        }else if(heartRate > 83){
          this.statusBarLevel = 3;
        }
      }else if(this.userData.age > 65){
        if(heartRate <= 64){
          this.statusBarLevel = 0;
        }else if(heartRate >= 65 && heartRate <= 68){
          this.statusBarLevel = 1;
        }else if(heartRate > 68 && heartRate <= 83){
          this.statusBarLevel = 2;
        }else if(heartRate > 83){
          this.statusBarLevel = 3;
        }
      }
    }else{
      //console.log('no');
      //nothig to do
    }
    this.enableStatusBar = true;
  }

  enabled() {
    this.disabledMetering = true
    this.signalRService.dataChartLine = [];
    this.signalRService.sendHeartBeat();
    this.enabledGraph = true;
    this.calculateStats(Number(this.visibleHR));
  }

  getUser(){
    this._http.get(`${environment.urlApi}api/User/GetUser/${localStorage.getItem('userLoged')}`)
      .subscribe((data: User) => {
        if(data !== null){
          this.userData = data;
        }
      }, error => {
        //this._router.navigate(['login']);
      })
  }

  UpdateHRValue(hrValue){
    console.log(this.sPO2);
    this.visibleSPO2 = String(this.sPO2.reduce((op, item) => op = op > item ? op : item, 0));
    this.lastHRValue = hrValue;
    this.calculateStats(hrValue);
  }

}
