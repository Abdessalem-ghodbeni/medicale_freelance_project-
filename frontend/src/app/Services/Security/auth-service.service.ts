import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Login} from "../../Models/Login/login";

const url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }


  login(l:Login){
    return this.http.post('http://localhost:5000/login',l);
  }


}
