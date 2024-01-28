import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DorctorService {
  private apiUrl = 'http://localhost:5000'; // API endpoint URL

  constructor(private http: HttpClient) { }

  //update doctor
  updateDoctor(doctor: any) {
    return this.http.put(this.apiUrl+"/users/update", doctor);
  }
  getDoctorById(id:any): Observable<any> {
    return this.http.get(this.apiUrl+/users/+id);
  }

  deleteDoctorPatient(id:any): Observable<any> {
    return this.http.delete(this.apiUrl+"/patients/doctor/"+id);
  }

}
