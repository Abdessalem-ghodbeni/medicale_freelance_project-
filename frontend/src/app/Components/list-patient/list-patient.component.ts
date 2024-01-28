import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PatientService} from "../../Services/patient.service";
import {Patient} from "../../Models/Patient/patient";

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {
  listPatient : Patient[] = [];
  constructor(private router:Router,
              private patientService : PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatientsByDoctorId().subscribe((data)=>{
      this.listPatient = data as Patient[];
      console.log(this.listPatient);
    },(err)=>{
      console.log(err);
    })
  }

  gotoGraphe(id: string) {
    this.router.navigateByUrl(`/home/graph/${id}`);
  }
  gotoGrapheSummarize(id: string) {
    this.router.navigateByUrl(`/home/graphSummary/${id}`);
  }

  gotoRDF(id: string) {
    this.router.navigateByUrl(`/home/rdf_graph/${id}`);
  }

}
