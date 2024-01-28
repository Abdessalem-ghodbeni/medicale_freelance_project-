import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GraphApiService} from "../../Services/graph-api.service";
import {DataSet, Network} from "vis-network/standalone";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-graph-summary-patient',
  templateUrl: './graph-summary-patient.component.html',
  styleUrls: ['./graph-summary-patient.component.css']
})
export class GraphSummaryPatientComponent implements OnInit {
  @ViewChild('graphContainer', { static: true }) graphContainer: ElementRef;
  @ViewChild('NewgraphContainer', { static: true }) NewgraphContainer: ElementRef;


  originalcontainer : any;
  patientId: string = '';
  loading :boolean;
  isShowModal:boolean=false;
  isButtonShow:boolean=false;
  isEmpty:boolean=true;
  showBtn:boolean;

  urlApi:string='';//DrugsResults && FilterResults && DisplayResults
  nodeSelectedInformation:any;
  isSelectedNodeGSOrVersion:boolean;
  show=false;


  /* node properties */

  idNode: any;
  nameNode: string = '';

  sipmleResult:string=''; //Results node && IMAGE
  ResultApiToDo:string='';//FilterResults   &&DrugsResults && DisplayResults
  date: string = '';//"PRESCRIPTION" node && Results node
  file:string='';//"PRESCRIPTION"  node
  url:string='';//"PRESCRIPTION" && Document node
  value:string='';//"PRESCRIPTION" node && Results node
  name:string='';//drugs node
  filePath:string='';//"Document" node
  key:string='';//Query node
  queryName:string='';//Query node
  type:string='';//Query node
  mesureOf:string='';//Result node
  aggregateFN:string='';//Result node
  SelectedfiltredNode:any = null;

  /* other*/
  listNodesNames: any;
  labelColors: { [key: string]: string } = {};
  listRelationshipeNames: any;
  container: any;
  showGraph:boolean=true;
  showNewGraphFilter:boolean=false;
  sipmleResultJson: any [] = [];
  typealgo : string = '';
  constructor(private graphApiService: GraphApiService,
              private route: ActivatedRoute) { }
  ngAfterViewInit(): void {
    this.originalcontainer= this.graphContainer.nativeElement;
    this.container = this.NewgraphContainer.nativeElement;

  }
  ngOnInit() {
    this.isSelectedNodeGSOrVersion=false;
    this.loading=true;
    this.showNewGraphFilter=false;
    this.isButtonShow = false;

    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      console.log('patientId : ', this.patientId);
      this.graphApiService.patientGraphSummary(this.patientId).subscribe(apiResponse => {
        console.log('apiResponse : ', apiResponse);
          const nodes = new DataSet(apiResponse.nodes);
          const edges = new DataSet(apiResponse.links.map(link => ({
            ...link,
            from: link.source,
            to: link.target,
            label: link.type
          })));
          const options = {
            autoResize: true,
            nodes: {
              shape: 'circle',
              size: 100,
              font: {
                size: 12,
                color: '#000000'
              },
            },
            edges: {
              arrows: {
                to: {
                  enabled: true,
                  scaleFactor: 0.5
                }
              },
              font: {
                size: 12,
                color: '#000000',
                align: 'horizontal' // align the labels horizontally
              },
              labelHighlightBold: false // do not make the label bold on highlight
            }

          };
          nodes.forEach(node => {
            try {

              // @ts-ignore
              const label = node.labels[0];
              if (label === 'Patient' || label === 'PATIENT') {
                // @ts-ignore
                node.color = '#FF0000';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'box';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'PRESCRIPTION'){
                // @ts-ignore
                node.color = '#9ED2BE';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'DRUG'){
                // @ts-ignore
                node.color = '#C8E4B2';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'DrugsResults'){
                // @ts-ignore
                node.color = '#FFD9B7';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'Document'){
                // @ts-ignore
                node.color = '#FFD0D0';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'Results'){
                // @ts-ignore
                node.color = '#3AA6B9';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'IMAGE'){
                // @ts-ignore
                node.color = '#D0F5BE';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'FilterResults'){
                // @ts-ignore
                node.color = '#FF9B9B';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'DisplayResults'){
                // @ts-ignore
                node.color = '#9E9FA5';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'GS'){
                // @ts-ignore
                node.color = '#F2EE9D';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if(label === 'Version'){
                // @ts-ignore
                node.color = '#F0997D';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
              if (label === 'Query' ) {
                // @ts-ignore
                node.color = '#9DC08B';
                // @ts-ignore
                node.label = label;
                // @ts-ignore
                node.shape = 'circle';
                // @ts-ignore
                node.size = 100;
              }
            } catch (error) {
              console.log('Error:', error);
            }
          });
          const data = {nodes, edges};
          console.log(data);
          // @ts-ignore
          const network = new Network(this.originalcontainer, data, options);
          this.loading=false;
        network.on('selectNode', event => {
            const nodeId = event.nodes[0];
            const selectedNode = nodes.get(nodeId);
            console.log('Selected Node :', selectedNode);
          this.nodeSelectedInformation = selectedNode;
          console.log('nodeSelectedInformation : ',this.nodeSelectedInformation);

          this.isButtonShow = true;
          this.nameNode=this.nodeSelectedInformation.label;
          //show modal
          this.isShowModal = true;
          this.isEmpty=false;
          if(this.nameNode==='PRESCRIPTION'){
            this.date=this.nodeSelectedInformation.properties.date;
            this.file=this.nodeSelectedInformation.properties.file;
            this.url=this.nodeSelectedInformation.properties.url;
            this.value=this.nodeSelectedInformation.properties.value;
          }
          if(this.nameNode==='DRUG'){
            this.name=this.nodeSelectedInformation.properties.name;
          }
          if(this.nameNode==='Document'){
            this.filePath=this.nodeSelectedInformation.properties.file_path;
            this.url=this.nodeSelectedInformation.properties.url;
          }
          if(this.nameNode==='IMAGE'){
            this.sipmleResult=this.nodeSelectedInformation.properties.results;
          }
          if(this.nameNode==='Results'){

            if(this.nodeSelectedInformation.properties.results !== undefined && this.nodeSelectedInformation.properties.results !== null){
              this.typealgo = this.nodeSelectedInformation.properties.algo;
              this.sipmleResult=this.nodeSelectedInformation.properties.results;
              this.sipmleResultJson=JSON.parse(this.sipmleResult);
              console.log(this.sipmleResultJson);
            }else{
              this.aggregateFN=this.nodeSelectedInformation.properties.aggregateFN;
              this.date=this.nodeSelectedInformation.properties.date;
              this.mesureOf=this.nodeSelectedInformation.properties.mesureOf;
              this.value=this.nodeSelectedInformation.properties.value;
            }

           /* this.sipmleResult=this.nodeSelectedInformation.properties.results;
            console.log('sipmleResult : ',this.sipmleResult);
            this.aggregateFN=this.nodeSelectedInformation.properties.aggregateFN;
            this.date=this.nodeSelectedInformation.properties.date;
            this.mesureOf=this.nodeSelectedInformation.properties.mesureOf;
            this.value=this.nodeSelectedInformation.properties.value;
            console.log('sipmleResult en Json : ',JSON.parse(this.sipmleResult));
            if(this.sipmleResult !== undefined)
            this.sipmleResultJson=JSON.parse(this.sipmleResult);*/

          }
          if(this.nameNode==='GS'|| this.nameNode==='Version'){
            this.isSelectedNodeGSOrVersion=true;
            this.isButtonShow=false;
            this.showBtn=false;
          }
          if(this.nameNode==='Query'){
            this.key=this.nodeSelectedInformation.properties.key;
            this.queryName=this.nodeSelectedInformation.properties.queryName;
            this.type=this.nodeSelectedInformation.properties.type;

          }
          if(this.nameNode==='FilterResults'|| this.nameNode==='DisplayResults'|| this.nameNode==='DrugsResults'){
            this.urlApi=this.nodeSelectedInformation.properties.results;
          }


        });
          network.on('deselectNode', () => {
            this.idNode = null;
            this.isButtonShow = false;
            this.nodeSelectedInformation = null;
            this.clearData();
            console.log('Node deselected');
          });
        }
      );
    });
  }
  clearData() {
    this.patientId= '';
    this.isShowModal=false;
    this.isButtonShow=false;
    this.isEmpty=true;
    this.urlApi='';//DrugsResults && FilterResults && DisplayResults
    this.nodeSelectedInformation=null;
    this.show=false;
    this.idNode=null;
    this.nameNode = '';
    this.sipmleResult=''; //Results node && IMAGE
    this.ResultApiToDo='';//FilterResults   &&DrugsResults && DisplayResults
    this.date = '';//"PRESCRIPTION" node && Results node
    this.file='';//"PRESCRIPTION"  node
    this.url='';//"PRESCRIPTION" && Document node
    this.value='';//"PRESCRIPTION" node && Results node
    this.name='';//drugs node
    this.filePath='';//"Document" node
    this.key='';//Query node
    this.queryName='';//Query node
    this.type='';//Query node
    this.mesureOf='';//Result node
    this.aggregateFN='';//Result node
    this.SelectedfiltredNode= null;
    this.listNodesNames = [];
    this.labelColors = {};
    this.listRelationshipeNames=[];
    this.showGraph=true;
    this.showNewGraphFilter=false;
    this.sipmleResultJson= [];
    this.typealgo= '';

  }
  newGraph(node: any, links: any):any {
    const options = {
      autoResize: true,
      nodes: {
        shape: 'circle',
        size: 100,
        font: {
          size: 12,
          color: '#000000'
        },
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        },
        font: {
          size: 12,
          color: '#000000',
          align: 'horizontal' // align the labels horizontally
        },
        labelHighlightBold: false // do not make the label bold on highlight
      }

    };
    const nodes = new DataSet(node);
    const edges = new DataSet(links.map(link => ({
      ...link,
      from: link.source,
      to: link.target,
      label: link.type
    })));
    nodes.forEach(node => {
      this.isEmpty = true;
      try {
        // @ts-ignore
        const label = node.labels[0];

        if (label === 'Patient') {
          // @ts-ignore
          node.color = '#FF0000';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'box';
          // @ts-ignore
          node.size = 100;
        }
        else if (label === 'Document'  )
        {
          // @ts-ignore
          node.color = '#34c3eb';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        }
        else if (label === 'Results' )
        {
          // @ts-ignore
          node.color = '#25a86b';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        }else if (label === 'DrugsResults' )
        {
          // @ts-ignore
          node.color = '#F0B86E';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        }
        if (label && typeof label === 'string' && this.labelColors[label] ) {
          // @ts-ignore
          node.color = this.labelColors[label];
          // @ts-ignore
          node.label = label;
          console.log('node.label : ', node);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    });
    const Newdata = {nodes, edges};
    const network = new Network(this.container, Newdata, options);
    network.on('selectNode', event => {
      const nodeId = event.nodes[0];
      const selectedNode = nodes.get(nodeId);
      this.idNode = nodeId;
      this.isButtonShow = true;
      console.log('Node selected: ', selectedNode);
      this.SelectedfiltredNode = selectedNode;
      console.log('nodeSelectedInformation : ', this.nodeSelectedInformation);
      this.date = this.SelectedfiltredNode.properties.date;
      console.log('dateeeeeeeeeeee',this.date);
      this.nameNode = this.SelectedfiltredNode.label;
      console.log('nameeeeeeeeeeee',this.nameNode);
      console.log('Selected Node id :', this.idNode);
    });
    network.on('deselectNode', () => {
      this.SelectedfiltredNode = null;
      this.idNode = null;
      this.isButtonShow = false;

      console.log('Node deselected');
    });
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  toggleGraphFilter() {
    this.showNewGraphFilter = !this.showNewGraphFilter;
    this.showGraph = !this.showGraph;
  }
  ExecuteApi(url) {
    this.show = true;
    this.graphApiService.GetNodeNames().subscribe(apiResponse => {
      this.listNodesNames = apiResponse;
      // Assign label colors dynamically for all node names
      for (const nodeName of this.listNodesNames) {
        const color = this.getRandomColor();
        this.labelColors[nodeName.replace(/\s/g, '')] = color;
      }
    }, error => {
      console.log('Error:', error);
    });
    this.graphApiService.GetrelationNames().subscribe(apiResponse => {
      this.listRelationshipeNames = apiResponse;
    }, error => {
      console.log('Error:', error);
    });

    this.graphApiService.ApitGS(url).subscribe(apiResponse => {
      console.log('ResultApiToDo : ',apiResponse);
      this.showGraph=false;
      this.showNewGraphFilter=true;
      this.isShowModal=false;
      this.isEmpty=false
      this.idNode = null;
      this.isSelectedNodeGSOrVersion =false;
      const nodes = apiResponse.nodes;
      const link = apiResponse.links;
      this.newGraph(nodes, link);
    } );

  }

  protected readonly Object = Object;

}

