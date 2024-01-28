import { Component, OnInit } from '@angular/core';
import {FormControlerService} from "../../Services/form-controler.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../Services/Security/token-storage.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Patient} from "../../Models/Patient/patient";
import {PatientService} from "../../Services/patient.service";
import {DorctorService} from "../../Services/dorctor.service";

@Component({
  selector: 'app-patient-profil-setting',
  templateUrl: './patient-profil-setting.component.html',
  styleUrls: ['./patient-profil-setting.component.css']
})
export class PatientProfilSettingComponent implements OnInit {


  patient = new Patient();
  patientUpdate = new Patient();

  ROLE = this.tokenStorage.payload(this.tokenStorage.getToken()).role;
  id = this.tokenStorage.payload(this.tokenStorage.getToken()).user_id;
  showsuccessmessage: boolean;
  showerrormessage: boolean;

  constructor(public formService :FormControlerService,
              private router:Router,
              private patientService: PatientService,
              private tokenStorage:TokenStorageService,
              private doctorService :DorctorService) { }

  ngOnInit(): void {
    this.showerrormessage = false;
    this.showsuccessmessage = false;

    this.patientService.getPatientById(this.id).subscribe(
      (data) => {
        console.log("this is to console patient data:",data);
        // @ts-ignore
        this.patient = data;
        console.log("this is value of patient objet: ",this.patient);
        this.formService.formGroupPatient.patchValue({
          adresse: this.patient.adresse,
          age: this.patient.age,
          emailPatient: this.patient.email,
          nom: this.patient.nom,
          prenom: this.patient.prenom,
          tel: this.patient.telephone,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {

    if(this.formService.formGroupPatient.valid){
       console.log(this.formService.formGroupPatient.value);

      this.patientUpdate.nom=this.formService.nom.value;
      this.patientUpdate.prenom=this.formService.prenom.value;
      this.patientUpdate.email=this.formService.emailPatient.value;
      this.patientUpdate.telephone=this.formService.tel.value;
      this.patientUpdate.adresse=this.formService.adresse.value;
      this.patientUpdate.age=this.formService.age.value;


      console.log(this.patientUpdate);
      this.doctorService.updateDoctor(this.patientUpdate).subscribe(
        (data) => {
          console.log(data);
          this.formService.formGroupPatient.reset();
          this.showsuccessmessage = true;
          setTimeout(() => {
            this.showsuccessmessage = false;
            this.router.navigate(["/home/dashboard"]);
            this.reloadPage();
          },2000);
        },
        error => {
          console.log(error);
          this.showerrormessage = true;
          setTimeout(() => {
            this.showerrormessage = false;
          },2000);
        }
      );

    }else {

      this.validateAllFormFields(this.formService.formGroupPatient);
    }

  }

  back() {
    this.formService.formGroupProfil.reset();
    this.router.navigate(['/home/dashboard']);

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

  reloadPage() {
    window.location.reload();
    console.log("reload page...");
  }
}


