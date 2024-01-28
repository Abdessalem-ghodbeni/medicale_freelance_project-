import { Component, OnInit } from '@angular/core';
import { FormControlerService } from '../../Services/form-controler.service';
import { Doctor } from '../../Models/Doctor/doctor';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DorctorService } from '../../Services/dorctor.service';
import { TokenStorageService } from '../../Services/Security/token-storage.service';

@Component({
  selector: 'app-all-settings',
  templateUrl: './all-settings.component.html',
  styleUrls: ['./all-settings.component.css'],
})
export class AllSettingsComponent implements OnInit {
  showsuccessmessage: boolean;
  showerrormessage: boolean;
  doctor = new Doctor();
  //docteur: object = {"Adresse":'',"Nom":'',"Prénom":'',"Spécialité":'',"Tel":'',"email":''};

  ROLE = this.tokenStorage.payload(this.tokenStorage.getToken()).role;
  id = this.tokenStorage.payload(this.tokenStorage.getToken()).user_id;

  constructor(
    public formService: FormControlerService,
    private router: Router,
    private doctorService: DorctorService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.showsuccessmessage = false;
    this.showerrormessage = false;

    this.doctorService.getDoctorById(this.id).subscribe(
      (data) => {
        console.log('this is to console :', data);
        this.doctor = data;
        console.log('this is value of doctor : ', this.doctor);
        this.formService.formGroupProfil.patchValue({
          nomProfil: this.doctor.nom,
          prenomProfil: this.doctor.prenom,
          emailProfil: this.doctor.email,
          telProfil: this.doctor.tel,
          adresseProfil: this.doctor.adresse,
          specialiteProfil: this.doctor.specialite,

          /*          nomProfil: data.Nom,
          prenomProfil: data.Prénom,
          emailProfil: data.email,
          telProfil: data.Tel,
          adresseProfil: data.Adresse,
          specialiteProfil: data.Spécialité,*/
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.formService.formGroupProfil.valid) {
      console.log('form valid');
      console.log(this.formService.formGroupProfil.value);
      this.doctor.nom = this.formService.nomProfil.value;
      this.doctor.prenom = this.formService.prenomProfil.value;
      this.doctor.email = this.formService.emailProfil.value;
      this.doctor.tel = this.formService.phoneProfil.value;
      this.doctor.adresse = this.formService.adresseProfil.value;
      this.doctor.specialite = this.formService.specialiteProfil.value;

      console.log('this is the valus of attribut sent to api ' + this.doctor);
      //onsole.log("json stringify "+user);

      this.doctorService.updateDoctor(this.doctor).subscribe(
        (data) => {
          console.log(data);
          console.log('all is working nice :) ');
          this.formService.formGroupProfil.reset();
          this.showsuccessmessage = true;
          setTimeout(() => {
            this.showsuccessmessage = false;
            this.router.navigate(['/home/dashboard']);
            this.reloadPage();
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.showerrormessage = true;
          setTimeout(() => (this.showerrormessage = false), 2000);
        }
      );
    } else {
      this.validateAllFormFields(this.formService.formGroupProfil);
    }
  }

  back() {
    this.formService.formGroupProfil.reset();
    this.router.navigate(['/home']);
  }
  reloadPage() {
    window.location.reload();
    console.log('reload page...');
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
