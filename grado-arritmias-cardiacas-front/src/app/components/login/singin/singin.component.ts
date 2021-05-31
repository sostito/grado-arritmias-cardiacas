import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  singinForm: FormGroup;
  alert: Boolean = false;
  alertMessage: String = '';
  alertDanger: Boolean = false;
  loginLoader: Boolean = false;

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.singinForm = new FormGroup({
      userName: new FormControl(''),
      name: new FormControl(''),
      lastName: new FormControl(''),
      weight: new FormControl(),
      height: new FormControl(),
      password: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl('')
    });
  }

  Singin(){
    this.alert = false;
    this.alertMessage = '';
    this.loginLoader = true;
    this._http.post(`${environment.urlApi}api/Login/Singin`, this.singinForm.value)
      .subscribe(response => {
        this.singinForm.reset();
        this.alertDanger = false;
        this.alert = true;
        this.alertMessage = 'Usuario creado correctamente';
        this.loginLoader = false;
      },
      error => {
        console.log(error);
        this.alertDanger = true;
        this.alert = true;
        this.alertMessage = 'Error al crear el usuario';
        this.loginLoader = false;
      })
  }
}
