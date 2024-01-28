import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {LoginComponent} from "./Components/login/login.component";
import {FicheComponent} from "./Components/fiche/fiche.component";
import {ListPatientComponent} from "./Components/list-patient/list-patient.component";
import {AllSettingsComponent} from "./Components/all-settings/all-settings.component";
import {GraphComponent} from "./Components/graph/graph.component";
import {
  ListPatientNotAssocciateComponent
} from "./Components/list-patient-not-assocciate/list-patient-not-assocciate.component";
import {PatientProfilSettingComponent} from "./Components/patient-profil-setting/patient-profil-setting.component";
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {GraphSummaryPatientComponent} from "./Components/graph-summary-patient/graph-summary-patient.component";
import { Rdf_graphComponent } from './Components/rdf_graph/rdf_graph.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login', component:LoginComponent },
  { path: 'home', component:HomeComponent, children:[
      { path: 'fiche', component:FicheComponent},
      { path: 'graph/:id', component:GraphComponent},
      { path: 'listPatient', component:ListPatientComponent},
      { path: 'listPatientNotAssociate', component:ListPatientNotAssocciateComponent},
      { path: 'Settings', component:AllSettingsComponent},
      { path: 'Settings/patient/:id', component:PatientProfilSettingComponent},
      { path: 'dashboard', component:DashboardComponent},
      { path: 'graphSummary/:id', component:GraphSummaryPatientComponent},
      { path: 'rdf_graph/:id', component:Rdf_graphComponent}


    ]},



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
