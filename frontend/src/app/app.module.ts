import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FicheComponent } from './Components/fiche/fiche.component';
import { ListPatientComponent } from './Components/list-patient/list-patient.component';
import { AllSettingsComponent } from './Components/all-settings/all-settings.component';
import { GraphComponent } from './Components/graph/graph.component';
import {authInterceptorProviders} from "./Services/Security/Helper/auth-intercepter.service";
import { ListPatientNotAssocciateComponent } from './Components/list-patient-not-assocciate/list-patient-not-assocciate.component';
import { PatientProfilSettingComponent } from './Components/patient-profil-setting/patient-profil-setting.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { GraphSummaryPatientComponent } from './Components/graph-summary-patient/graph-summary-patient.component';
import { LinechartComponent } from './Components/linechart/linechart.component';
import {Rdf_graphComponent} from "./Components/rdf_graph/rdf_graph.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FicheComponent,
    ListPatientComponent,
    AllSettingsComponent,
    GraphComponent,
    ListPatientNotAssocciateComponent,
    PatientProfilSettingComponent,
    DashboardComponent,
    GraphSummaryPatientComponent,
    LinechartComponent,
    Rdf_graphComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
