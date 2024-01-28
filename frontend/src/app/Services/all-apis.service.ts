import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../Models/Patient/patient";

const url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class AllApisService {

  constructor(private  http:HttpClient) {

  }

  newPatient(p:Patient){
    return this.http.post(url+'/patients',p);
  }
  // newUser(u:UserModule){
  //   return this.http.post(url+'/users',u);
  // }
  deletePatient(id:number){
    return this.http.delete(url+'/patients/'+id);
  }

}
