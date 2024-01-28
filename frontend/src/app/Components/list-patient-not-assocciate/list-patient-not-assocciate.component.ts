import { Component, OnInit } from '@angular/core';
import { Patient } from "../../Models/Patient/patient";
import { PatientService } from "../../Services/patient.service";
import { TokenStorageService } from "../../Services/Security/token-storage.service";

@Component({
  selector: 'app-list-patient-not-assocciate',
  templateUrl: './list-patient-not-assocciate.component.html',
  styleUrls: ['./list-patient-not-assocciate.component.css']
})
export class ListPatientNotAssocciateComponent implements OnInit {
  listPatient: Patient[] = [];

  id = this.tokenStorage.payload(this.tokenStorage.getToken()).user_id;

  constructor(
    private patientService: PatientService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.patientService.getNoAssignedPatients().subscribe((data) => {
      this.listPatient = data as Patient[];
      console.log(this.listPatient);
    }, (err) => {
      console.log(err);
    });
  }

  associatePatient(patient: Patient) {
    const patientId = patient.id; // Récupérer l'ID du patient sélectionné
    console.log("patient id : "+patientId);
    this.patientService.associerDoctorToPatient(patientId).subscribe((data) => {
      console.log(data);
      console.log("Patient associé");
      this.ngOnInit(); // Recharger la liste après l'association

    }, (err) => {
      console.log(err);
      console.log("Patient non associé");
    });
  }
}
