import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../Services/Security/token-storage.service";
import {Router} from "@angular/router";
import {DorctorService} from "../../Services/dorctor.service";
import {Doctor} from "../../Models/Doctor/doctor";
import {PatientService} from "../../Services/patient.service";
import {Patient} from "../../Models/Patient/patient";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  doctor= new Doctor();
  patient = new Patient();
  nomDocPatient : any;
  prenomDocPatient : any;

  nom : any;
  prenom :any;
  speciality : any;
  ifRDFGraph = false;
   ROLE = this.tokenStorage.payload(this.tokenStorage.getToken()).role;
   id = this.tokenStorage.payload(this.tokenStorage.getToken()).user_id;
// Add a variable to control the display of the modal
  isShowModal: boolean = false;

// Function to trigger the confirmation modal

  constructor(private tokenStorage : TokenStorageService,
              private router : Router,
              private doctorService: DorctorService,
              private patientService: PatientService
  ) { }
  clearData() {
    this.isShowModal = false;
    // Add code to clear any necessary data here
  }
  openConfirmationModal() {
    console.log("open modal");
    this.isShowModal = true;
    console.log(this.isShowModal);
  }
  ngOnInit(): void {
    if(this.ROLE === 'DOCTOR'){
      this.router.navigate(['home/dashboard']);
      this.doctorService.getDoctorById(this.id).subscribe(
        (data) => {
          this.doctor = data;
          this.nom = this.doctor.nom;
          this.prenom = this.doctor.prenom;
          this.speciality = this.doctor.specialite;
/*          this.nom = data.Nom;
          this.prenom = data.Prénom;
          this.speciality = data.Spécialité;*/

          console.log("this is value of doctor : ",this.doctor);
          console.log(this.nom);
          console.log(this.prenom);
          console.log(this.speciality);
        });
    }
    else {

      this.router.navigate(['home/dashboard']);
      this.patientService.getPatientById(this.id).subscribe(
        (data) => {
          console.log("this is to console patient = :",data);
            // @ts-ignore
          this.patient = data;

          this.nom = this.patient.nom;
          this.prenom = this.patient.prenom;

          console.log(this.nom);
          console.log(this.prenom);

          console.log("this is value of  patient = :",this.patient);

            this.doctorService.getDoctorById(this.patient.doc_id).subscribe(
              (data) => {
                console.log("this is to console patient => your doctor is :",data);
                this.nomDocPatient = data.nom;
                this.prenomDocPatient = data.prenom;
                console.log(this.nomDocPatient);
                console.log(this.prenomDocPatient);
              });


        });
    }



  }


  Removedoctor() {
    console.log("remove doctor");
    this.doctorService.deleteDoctorPatient(this.id).subscribe(
      (data) => {
        console.log("this is to console :",data);
      });
    this.isShowModal = false;
  }


  isSearchEnabled() {
    const currentPath = this.router.url;
    return currentPath === '/home/listPatientNotAssociate';
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    console.log("logout");
  }
}
