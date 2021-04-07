import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  observer = new Subject();
  public subscriber = this.observer.asObservable();

  LoginEmit(login: boolean, user ?:string){
    login ? localStorage.setItem('userLoged', user) : localStorage.removeItem('userLoged');
    this.observer.next(login);
  }
}
