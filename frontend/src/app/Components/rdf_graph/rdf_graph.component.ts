import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphApiService } from 'src/app/Services/graph-api.service';
import { DataSet, Network } from 'vis-network/standalone';

@Component({
  selector: 'app-rdf_graph',
  templateUrl: './rdf_graph.component.html',
  styleUrls: ['./rdf_graph.component.css'],
})
export class Rdf_graphComponent implements OnInit {
  patientId: any;
  result: any;
  triples: any[] = [];
  constructor(
    private graphApiService: GraphApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.patientId = id;

      this.graphApiService.getGraphData(id).subscribe((apiResponse) => {
        const nodes = new DataSet(apiResponse.nodes);
        const edges = new DataSet(
          apiResponse.links.map((link) => ({
            ...link,
            from: link.source,
            to: link.target,
            label: link.type,
          }))
        );

        this.graphApiService.getRDFGraph(apiResponse).subscribe((data) => {
          this.result = data;
        },(err)=>{
          this.result = err.error.text
          this.triples = this.result.split(' . ').map(triple => {
            const parts = triple.split(';').map(part => part.trim());
            return {
              subject: parts[0].replace('@prefix ns1:', ''),
              predicate: parts.slice(1).map(p => p.replace('ns1:', '')),
              object: parts.slice(2)
            };
          });
        });
      });
    });
  }
}
