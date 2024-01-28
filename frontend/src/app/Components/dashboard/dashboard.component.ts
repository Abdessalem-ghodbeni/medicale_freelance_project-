import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../Services/Security/token-storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ROLE = this.tokenStorage.payload(this.tokenStorage.getToken()).role;
  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
  }

}
