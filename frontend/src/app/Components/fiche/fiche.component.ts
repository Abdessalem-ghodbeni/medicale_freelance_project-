import { Component, OnInit } from '@angular/core';
import { FormControlerService } from "../../Services/form-controler.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AllApisService} from "../../Services/all-apis.service";
import {TokenStorageService} from "../../Services/Security/token-storage.service";
import {PatientService} from "../../Services/patient.service";
import {Patient} from "../../Models/Patient/patient";

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {

  ROLE = this.tokenService.payload(this.tokenService.getToken()).role;
  patient=new Patient();
  sexe: any ;
  isGenderSelected: boolean = false;
  showsuccessmessage: boolean;
  showerrormessage: boolean;


  constructor(public formService: FormControlerService,
                private tokenService :TokenStorageService,
                private router: Router,
                private fbPatient: FormBuilder,
                private patientService: PatientService) { }

  ngOnInit(): void {
    this.showerrormessage = false;
    this.showsuccessmessage = false;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.isGenderSelected) {
      console.log(this.sexe);
      this.patient.sexe = this.sexe;

    }else { console.log("Gender not selected");}

    if (this.formService.formGroupPatient.valid) {
      console.log("Valid form");
        this.patient.nom = this.formService.nom.value;
        this.patient.prenom = this.formService.prenom.value;
        this.patient.age = this.formService.age.value;
        this.patient.telephone = this.formService.tel.value;
        console.log("tel :"+this.patient.telephone);
        this.patient.adresse = this.formService.adresse.value;
        this.patient.email = this.formService.emailPatient.value;
       // this.patient.doc_id=this.ROLE;
        console.log(this.patient);
        console.log(this.patient.sexe +"this is the sexe selected");
        this.patientService.createPatient(this.patient).subscribe(
          (data) => {
            console.log(data);
            console.log(" all is working nice :)");
            this.showsuccessmessage = true;
            setTimeout(() => {
              this.showsuccessmessage = false;
              this.router.navigate(["home/dashboard"]);
            }, 2000);
            this.formService.formGroupPatient.reset();
          },
          (error) => {
            console.log(error);
            this.showerrormessage = true;
            setTimeout(() => this.showerrormessage = false, 2000);
          } );
      }
    else {
        this.validateAllFormFields(this.formService.formGroupPatient);
        console.log("Invalide form");
        console.log(this.formService.formGroupPatient.value);
    }
    }

    // end of onSubmit


  onCancel() {
    this.formService.formGroupPatient.reset();
    this.router.navigate(["home/dashboard"]);
  }


}
