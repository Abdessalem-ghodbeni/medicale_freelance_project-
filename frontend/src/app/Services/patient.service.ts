import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../Models/Patient/patient";
const url = 'http://localhost:5000';
@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(private  http:HttpClient) {
  }


  getPatientsByDoctorId(){
    return this.http.get(url+'/doctor/patients');
  }

  getNoAssignedPatients(){
    return this.http.get(url+'/doctor/free/patients');
  }
  getPatientById(id:any){
    return this.http.get(url+'/patients/'+id);
  }

  createPatient(patient:Patient){
    return this.http.post(url+'/patients',patient);
  }

  associerDoctorToPatient(id:any){
    return this.http.put(url+'/patients/doctor/'+id,null);
  }

}
