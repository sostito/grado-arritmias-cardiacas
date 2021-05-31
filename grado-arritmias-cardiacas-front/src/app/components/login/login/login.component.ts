import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alert: Boolean = false;
  alertMessage: String = '';
  loginLoader: Boolean = false;

  constructor(private _http: HttpClient, private _router: Router, private _loginService: LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userLoged') !== null){
      this._router.navigate(['main']);
    }

    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
  }

  Login(){
    this.loginLoader = true;
    this._http.post(`${environment.urlApi}api/Login/Login`, this.loginForm.value)
      .subscribe(response => {
        this._loginService.LoginEmit(true, this.loginForm.value.userName);


        this._http.get(`${environment.urlApi}api/User/GetUser/` + this.loginForm.value.userName)
          .subscribe(response => {
            localStorage.setItem('dataUser', JSON.stringify(response))
            this._router.navigate(['main']);
        })
      },
      error => {
        this.alert = true;
        this.alertMessage = 'Usuario o contraseña incorrectos';
        this.loginLoader = false;
      })
  }
}
