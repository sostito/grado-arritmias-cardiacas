import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/UserModel.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  updateForm: FormGroup;
  alert: Boolean = false;
  alertMessage: String = '';
  alertDanger: Boolean = false;
  updateLoader: Boolean = false;

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      userName: new FormControl(''),
      name: new FormControl(''),
      lastName: new FormControl(''),
      weight: new FormControl(),
      height: new FormControl(),
      age: new FormControl(),
      gender: new FormControl('m')
    });

    this.GetUser();
  }

  GetUser(){
    this._http.get(`${environment.urlApi}api/User/GetUser/${localStorage.getItem('userLoged')}`)
      .subscribe((data: User) => {
        console.log(data);
        if(data !== null){
          this.updateForm.controls.userName.setValue(data.userName); 
          this.updateForm.controls.name.setValue(data.name); 
          this.updateForm.controls.lastName.setValue(data.lastName); 
          this.updateForm.controls.weight.setValue(data.weight); 
          this.updateForm.controls.height.setValue(data.height);
          this.updateForm.controls.age.setValue(data.age);
          this.updateForm.controls.gender.setValue(data.gender);
        }
      }, error => {
        //this._router.navigate(['login']);
      })
  }

  Update(){
    this.alert = false;
    this.alertMessage = '';
    this.updateLoader = true;
    this._http.post(`${environment.urlApi}api/User/UpdateProfile`, this.updateForm.value)
      .subscribe(response => {
        this.alertDanger = false;
        this.alert = true;
        this.alertMessage = 'Usuario actualizado correctamente';
        this.updateLoader = false;
      },
      error => {
        this.alertDanger = true;
        this.alert = true;
        this.alertMessage = 'Error al actualizar el usuario';
        this.updateLoader = false;
      })
  }

}
