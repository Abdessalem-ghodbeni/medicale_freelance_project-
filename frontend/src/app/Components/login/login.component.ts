import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControlerService} from "../../Services/form-controler.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AllApisService} from "../../Services/all-apis.service";

import {AuthServiceService} from "../../Services/Security/auth-service.service";
import {TokenStorageService} from "../../Services/Security/token-storage.service";
import {Login} from "../../Models/Login/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPasswordVisible = false;
  login :Login = new Login();
  showsuccessmessage: boolean=false;
  showerrormessage: boolean=false;

  constructor(public formService :FormControlerService,
              private router: Router,
              private elementRef: ElementRef,
              private authService:AuthServiceService,
              private tokenStorage:TokenStorageService,


              )
  {  }
  ngOnInit(): void {
    this.showsuccessmessage = false;
    this.showerrormessage = false;
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    } );
  }
  onSubmit() {

    if (this.formService.formGroupLogin.valid) {
      console.log(this.formService.email.value);
      this.login.email = this.formService.email.value;
      this.login.password = this.formService.password.value;
      if(this.formService.isPatient.value){
        this.login.role = "PATIENT";
      }else{
        this.login.role = "DOCTOR";
      }
      console.log(this.login);
      this.authService.login(this.login).subscribe(
        res => {
          console.log(res);
         this.showerrormessage = false;
         this.showsuccessmessage = true;
         console.log("success is => "+this.showsuccessmessage);
         setTimeout(() => {
           this.showsuccessmessage = false;
          this.router.navigate(["home/dashboard"])
         },1000);

          // save token in local storage
          this.tokenStorage.savedata(res);
          this.onClear();
       },
        err => {
          console.log(err);
        this.showsuccessmessage = false;
        this.showerrormessage = true;
        console.log("error => "+this.showerrormessage);
        setTimeout(() =>
          this.showerrormessage = false, 2000);
        }
      );

    }
    else {
      this.validateAllFormFields(this.formService.formGroupLogin);
     }
  }

  onClear() {
    this.formService.formGroupLogin.reset();
  }

  togglePasswordVisibility() {
    const passwordInput = this.elementRef.nativeElement.querySelector('#password');
    passwordInput.type = this.isPasswordVisible ? 'password' : 'text';
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}



