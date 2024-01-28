import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NewNode} from "../Models/new-node";

@Injectable({
  providedIn: 'root'
})
export class GraphApiService {
  private apiUrl = 'http://localhost:5000'; // API endpoint URL

  constructor(private http: HttpClient) {
  }
  displayFilter(filter:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/display/type?'+filter);
  }


  public filterGraphData(filter:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/xray_images?'+filter);
  }

  public filterOrdonnanceData(filter:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/getdrugs?'+filter);
  }

  public getGraphData(id): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/get_graph/'+id);
  }
public addNode(node): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/create_node',node);
  }

  public GetNodeNames(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/nodesNames');

  }

  public GetrelationNames(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/relationshipNames');

  }
  public ScanAllFiles(filter:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/topic/all?'+filter);

  }
  public ScanOneFile(filter:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/topic/one?'+filter);

  }
  public topicMultiple(filter:any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/topic/multiple',filter);

  }
  public haveCancer(filter:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/havecancer?'+filter);
  }
  public ExcelSummarize(filter:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/Excell/summarize?'+filter);
  }
  public SummarizeMultipleFile(filter:any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/abstractive/summarize',filter);
  }
  public filterType(filter:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/filter/type?'+filter);
  }
  public patientGraphSummary(filter:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/patient/graphSummary?patient_id='+filter);
  }
  public queryNames(patientId:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/Summary/queryNames?patient_id='+patientId);
  }
  public ApitGS(url:any): Observable<any> {
    return this.http.get<any>('http://localhost:5000'+url);
  }

  public getRDFGraph(graph) : Observable<any> {
    return this.http.post<any>(this.apiUrl+'/patient/transformToRDF',graph,{ observe: 'response' }); 
  }

  table = new BehaviorSubject(null);
  get table$(): Observable<any> {
    return this.table.asObservable();
  }
}
