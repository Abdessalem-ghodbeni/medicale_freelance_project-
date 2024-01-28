import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlerService {

  constructor(private fb: FormBuilder, private fbPatient: FormBuilder,
              private fbProfil: FormBuilder) { }

  formGroupLogin = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    isPatient: new FormControl(false)
  });

  formGroupProfil = this.fbProfil.group({
    nomProfil: ['', Validators.required],
    prenomProfil: ['', Validators.required],
    emailProfil: ['', Validators.required],
    telProfil: ['', Validators.required],
    adresseProfil: ['', Validators.required],
    specialiteProfil: ['', Validators.required],

  });

  formGroupPatient = this.fbPatient.group({
    nom: ['', [
      Validators.required, Validators.minLength(3), Validators.maxLength(50)
    ]],
    prenom: ['', [
      Validators.required, Validators.minLength(3), Validators.maxLength(80)
    ]],
    age: ['', [
      Validators.required, Validators.pattern('[0-9]+$')
    ]],
    tel: ['', [
      Validators.required, Validators.pattern('[0-9]{8}')
    ]],
    adresse: ['', Validators.required],
    emailPatient: ['', Validators.required],
  });

  /* login controle */
  get email() {
    return this.formGroupLogin.get('email');
  }

  get password() {
    return this.formGroupLogin.get('password');
  }

  get isPatient() {
    return this.formGroupLogin.get('isPatient');
  }
  /* fin login controle */

  /* patient controle */
  get nom() {
    return this.formGroupPatient.get('nom');
  }

  get prenom() {
    return this.formGroupPatient.get('prenom');
  }
  get emailPatient() {
    return this.formGroupPatient.get('emailPatient');
  }

  get age() {
    return this.formGroupPatient.get('age');
  }


  get tel() {
    return this.formGroupPatient.get('tel');
  }

  get adresse() {
    return this.formGroupPatient.get('adresse');
  }
  /* fin patient controle */

  /*  profil controle */
  get nomProfil() {
    return this.formGroupProfil.get('nomProfil');
  }

  get prenomProfil() {
    return this.formGroupProfil.get('prenomProfil');
  }
  get emailProfil() {
    return this.formGroupProfil.get('emailProfil');
  }

  get phoneProfil() {
    return this.formGroupProfil.get('telProfil');
  }
  get adresseProfil() {
    return this.formGroupProfil.get('adresseProfil');
  }

  get specialiteProfil() {
    return this.formGroupProfil.get('specialiteProfil');
  }
/* fin profil controle */
}
