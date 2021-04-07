import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

    console.log(localStorage.getItem('userLoged'));

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
    this._http.post('https://localhost:44384/api/Login/Login', this.loginForm.value)
      .subscribe(response => {
        this._loginService.LoginEmit(true, this.loginForm.value.userName);
        this._router.navigate(['main']);
      },
      error => {
        this.alert = true;
        this.alertMessage = 'Usuario o contraseña incorrectos';
        this.loginLoader = false;
      })
  }
}
