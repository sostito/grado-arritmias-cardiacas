import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  userName: string = '';

  constructor(private _loginService: LoginService,  private _router: Router) { }

  ngOnInit(): void {
    this._loginService.subscriber.subscribe((data: boolean) => {
      this.isLogin = data;
      this.userName = this.isLogin ? localStorage.getItem('userLoged') : '';
    });

    if(localStorage.getItem('userLoged') !== null){
      this.isLogin = true;
      this.userName = localStorage.getItem('userLoged');
    }else{
      this.isLogin = false;
      this.userName = '';
    }
  }

  LogOut(){
    this._loginService.LoginEmit(false);
    this.isLogin = false;
    this._router.navigate(['/login']);
  }

}
