import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataSet, Network } from 'vis-network/standalone';
import { GraphApiService } from '../../Services/graph-api.service';
import { ActivatedRoute } from '@angular/router';
import { NewNode } from '../../Models/new-node';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer', { static: true }) graphContainer: ElementRef;
  @ViewChild('NewgraphContainer', { static: true })
  NewgraphContainer: ElementRef;
  @ViewChild('graphLoading', { static: true }) graphLoading: ElementRef;

  showExcelSummarize: boolean = false;
  showsuccessmessage: boolean;
  showerrormessage: boolean;
  selectedOption: string = '';
  showGraph: boolean = true;
  showNewGraphFilter: boolean = false;
  showGraphLoading: boolean = false;
  showResult: boolean = false;
  valueResult: any;
  ResultHaveCancer: string = '';
  showResultHaveCancer: boolean = false;
  resultatapiscan: any;
  resultatapiscanOneFile: any[] = []; // Initialiser avec un tableau vide
  statusApi: any;
  show: boolean = false;
  loading = false; // Variable to track API execution state
  apiData: any[][] = [];
  listSummaries: any[] = [];
  filterNumericSummaries: any[] = [];
  selectAprocheNumericSummarize: string = '';
  listTopicMultipe: any[] = [];
  resultF: any;
  resultatFilter: any[] = [];
  ordonanceFilter: any;
  algoTrainingScan: any;
  file_path: any;
  year: any;
  monthCount: number = 1;
  monthValues: string[][] = [[]];
  nodeNameSearched: string = '';
  typeCount: number = 1;
  typesValues: string[][] = [[]];
  showbtnSeeINformation: boolean = false;
  showFileinput: boolean = false;
  showvalueinput: boolean = false;
  /* variable du modal proprities*/
  nodeSelectedInformation: any = {};
  NewGrapheUrlSelectedInformation: any = {};
  NewGrapheDateSelectedInformation: any = {};
  dateSelectedInformation: any = {};
  valueSelectedInformation: any = {};
  nameSelectedInformation: any = {};
  typeSelectedInformation: string = '';
  urlSelectedInformation: string = '';
  /*end variable du modal proprities*/
  sourceNodeId: any;
  target: any;
  //les types du nouveau noeud
  selectedType: any;
  valeurMesurer: string = '';
  file: File | null = null;
  patientId: string = '';
  date: any;
  text: string = '';
  newNode: NewNode = new NewNode();
  //les variables pour le modal
  isShowModal: boolean = false;
  isEmpty: boolean = true;
  showAddAnalyseInNewGraph: boolean = true;
  /*  @Input() id: number;*/
  isButtonShow: boolean = false;
  listNodesNames: any[] = [];
  listRelationshipeNames: any[] = [];
  labelColors: { [key: string]: string } = {};
  showResultSummarize: boolean = false;
  container: any;
  originalcontainer: any;
  graphLoadingContainer: any;
  seacrchtype: string = '';
  typeExcelSummarize: string = '';
  showSelectInModalChooseAlgorithm: boolean;
  patientNAME: string = '';
  mesureOf: string = '';
  query_key: string = '';
  listQueryNames: string[];
  queryKeyExiste: boolean = false;
  btnShowOriginGraph: boolean = false;
  selectedNodeName: string = '';
  selectedRelationName: string = '';
  typeSelectedforFiler = '';
  typeOrdonance: string = '';
  typeSearch: string = '';
  valueforexcelgraph: any;

  constructor(
    private graphApiService: GraphApiService,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.originalcontainer = this.graphContainer.nativeElement;
    this.container = this.NewgraphContainer.nativeElement;
    this.graphLoadingContainer = this.graphLoading.nativeElement;
  }
  openNewAnalysisModal() {
    if (
      this.sourceNodeId === '' ||
      this.sourceNodeId === undefined ||
      this.sourceNodeId === null
    ) {
      this.isEmpty = true;
      this.isShowModal = false;
    } else {
      this.isShowModal = true;
      this.isEmpty = false;
    }
  }
  openNPropertiesModal() {
    if (
      this.typeSelectedInformation === 'file' ||
      this.typeSelectedInformation === 'image' ||
      this.typeSelectedInformation === 'video'
    ) {
      this.showFileinput = true;
      this.showvalueinput = false;
    } else {
      this.showFileinput = false;
      this.urlSelectedInformation = '';
      this.showvalueinput = true;
    }
  }
  onTypeChange() {
    if (this.selectedType === '1') {
      this.newNode.type = 'numeric';
    } else if (this.selectedType === '2') {
      this.newNode.type = 'string';
    } else if (this.selectedType === '3') {
      this.newNode.type = 'image';
    } else if (this.selectedType === '4') {
      this.newNode.type = 'video';
    } else if (this.selectedType === '5') {
      this.newNode.type = 'file';
    }
    this.newNode.fileName = '';
    this.newNode.file = null;
  }
  onInputChange(event: any) {
    const file = event.target.files[0];
    this.newNode.file = file;
    // Set the file type and file name properties
    if (file) {
      const fileNameWithExtension = file.name;
      console.log('this is the name of the file : ' + fileNameWithExtension);
      this.newNode.fileName = fileNameWithExtension;
    }
  }
  nodeNamesSelected(event: any) {
    this.selectedNodeName = event;
    this.newNode.nodeName = this.selectedNodeName;
    this.nodeNameSearched = this.selectedNodeName;
    console.log(
      'this is the name of the searched node with espace : ' +
        this.nodeNameSearched
    );
    this.nodeNameSearched.replace(/\s/g, '');
    console.log(
      'this is the name of the searched node without epace : ' +
        this.nodeNameSearched
    );
  }
  relationNameSelected(event: any) {
    // Retrieve the selected relationship name from the event and assign it to the NewNode object
    this.selectedRelationName = event;
    this.newNode.relationshipName = this.selectedRelationName;
  }
  removeExtraFade() {
    let fade = document.getElementsByClassName('fade show');
    for (let i = 0; i < fade.length; i++) {
      while (fade.length > 1) {
        fade[i].remove();
      }
    }
  }
  ngOnInit() {
    this.showsuccessmessage = false;
    this.showerrormessage = false;
    this.graphApiService.GetNodeNames().subscribe(
      (apiResponse) => {
        this.listNodesNames = apiResponse;
        // Assign label colors dynamically for all node names
        for (const nodeName of this.listNodesNames) {
          // Generate a random color for each node name
          const color = this.getRandomColor();
          this.labelColors[nodeName.replace(/\s/g, '')] = color;
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    this.graphApiService.GetrelationNames().subscribe(
      (apiResponse) => {
        this.listRelationshipeNames = apiResponse;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
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
        const options = {
          autoResize: true,
          nodes: {
            shape: 'circle',
            size: 100,
            font: {
              size: 12,
              color: '#000000',
            },
          },
          edges: {
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
              },
            },
            font: {
              size: 12,
              color: '#000000',
              align: 'horizontal', // align the labels horizontally
            },
            labelHighlightBold: false, // do not make the label bold on highlight
          },
        };
        nodes.forEach((node) => {
          this.isEmpty = true;


          try {
            // @ts-ignore
            const value = node.properties.file;
            if (value != null && value != undefined) {
              const lastDot = value.lastIndexOf('.');
              const nodeExtension = value.substring(lastDot);
              console.log('************** value of node:' + nodeExtension);

              if (
                nodeExtension === '.xlsx' ||
                nodeExtension === '.xls' ||
                nodeExtension === '.csv'
              ) {
                // @ts-ignore
                node.color = '#2B580C';
                // @ts-ignore
                node.shape = 'icon';
                // @ts-ignore
                node.size = 100;
                // @ts-ignore
                node.icon = {
                  face: 'FontAwesome',
                  code: '\uf1c3',
                  size: 50,
                  color: '#000000',
                };
           
              }
            }
            // @ts-ignore
            const label = node.labels[0];
            if (
              label === 'Patient' ||
              label === 'patient' ||
              label === 'PATIENT'
            ) {
              // @ts-ignore
              node.color = '#FF0000';
              // @ts-ignore
              node.label = label;
              // @ts-ignore
              node.shape = 'box';
              // @ts-ignore
              node.size = 100;
            }
            if (label && typeof label === 'string' && this.labelColors[label]) {
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

        const data = { nodes, edges };
        console.log(data);
        // @ts-ignore
        const network = new Network(this.originalcontainer, data, options);
        network.on('selectNode', (event) => {
          const nodeId = event.nodes[0];
          const selectedNode = nodes.get(nodeId);
          this.sourceNodeId = nodeId;
          this.isButtonShow = true;
          console.log('Node selected: ', selectedNode);
          this.nodeSelectedInformation = selectedNode;
          console.log(
            'information of node :' + this.sourceNodeId + ' : => ',
            this.nodeSelectedInformation
          );
          console.log('node id : ' + this.nodeSelectedInformation.id);
          console.log('label:' + this.nodeSelectedInformation.label);
          console.log(
            'patient id : ' + this.nodeSelectedInformation.properties.patient_id
          );
          console.log('date : ' + this.nodeSelectedInformation.properties.date);
          console.log('file :' + this.nodeSelectedInformation.properties.file);
          console.log(
            'url file :' + this.nodeSelectedInformation.properties.url
          );
          console.log('type : ' + this.nodeSelectedInformation.properties.type);
          console.log(
            'value :' + this.nodeSelectedInformation.properties.value
          );
          this.dateSelectedInformation =
            this.nodeSelectedInformation.properties.date;
          this.valueSelectedInformation =
            this.nodeSelectedInformation.properties.value;
          this.listSummaries.push(this.valueSelectedInformation);
          this.nameSelectedInformation = this.nodeSelectedInformation.label;
          this.typeSelectedInformation =
            this.nodeSelectedInformation.properties.type;
          this.urlSelectedInformation =
            this.nodeSelectedInformation.properties.url;
          console.log(
            'this the value of attribute typeFileNode:' +
              this.typeSelectedInformation
          );
          console.log(this.nameSelectedInformation);
          // @ts-ignore
          this.newNode.source_nodeName = selectedNode.labels[0];
          this.newNode.source = this.sourceNodeId;
          this.newNode.patient_id = this.patientId;
          console.log('Selected Node id :', this.sourceNodeId);

          this.summarises();

          // console.log('Selected Node name :', selectedNode.properties.labels[0]);
        });
        network.on('deselectNode', () => {
          this.sourceNodeId = null;
          this.isButtonShow = false;
          console.log('Node deselected');
        });
      });
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
  clearData() {
    this.selectedType = '';
    this.sourceNodeId = '';
    this.valeurMesurer = '';
    this.date = '';
    this.newNode = new NewNode();
    this.isShowModal = false;
    this.isEmpty = true;
  }
  saveData() {
    this.newNode.value = this.valeurMesurer;
    this.newNode.date = this.date;
    console.log(this.newNode);
    const formData = new FormData();
    formData.append('file', this.newNode.file);
    formData.append('type', this.newNode.type);
    formData.append('value', this.newNode.value);
    formData.append('patient_id', this.newNode.patient_id);
    formData.append('date', this.newNode.date);
    formData.append('fileName', this.newNode.fileName);
    formData.append('nodeName', this.newNode.nodeName);
    formData.append('source', this.newNode.source);
    formData.append('relationshipName', this.newNode.relationshipName);
    formData.append('source_nodeName', this.newNode.source_nodeName);

    console.log(formData);

    this.graphApiService.addNode(formData).subscribe(
      (apiResponse) => {
        console.log(apiResponse);
        this.clearData();
        this.initializeData();
        this.showsuccessmessage = true;
        setTimeout(() => {
          this.sourceNodeId = null;
          this.isButtonShow = false;
        }, 2000);
        this.graphApiService
          .getGraphData(this.patientId)
          .subscribe((apiResponse) => {
            console.log(apiResponse);
            this.initializeData();
            this.CancelFilter();
            this.ngOnInit();
          });
      },
      (error) => {
        console.log('Error:', error);
        this.showerrormessage = true;
        setTimeout(() => {
          this.showerrormessage = false;
        }, 2000);
      }
    );
  }
  //confirmed
  ApplyFilter() {
    this.loading = false;
    this.queryKeyExiste = false;
    let monthParams = '&month=' + this.monthValues.join('&month=');
    let nodeParams = this.nodeNameSearched.replace(/\s/g, '');
    this.query_key =
      'FilterPatient' +
      this.patientId +
      'WithYear' +
      this.year +
      'AndMonth' +
      this.monthValues +
      'AndSearchedNode' +
      this.nodeNameSearched;
    console.log('this is the query key :' + this.query_key);

    let sansEspace = this.query_key.replace(/\s/g, '');
    console.log('this is variable sans espace :' + sansEspace);
    let sansVirgule = sansEspace.replace(',', 'AndMonth');
    console.log('this is variable sans virgule :' + sansVirgule);
    const queryClean = sansVirgule;
    console.log('this is the query key clean :' + queryClean);

    let filter1 =
      'patient_id=' +
      this.patientId +
      '&year=' +
      this.year +
      '&searched_node=' +
      nodeParams +
      monthParams +
      '&query_key=' +
      queryClean;
    console.log('this is the filter :' + filter1);
    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        console.log('this is the result of query names :' + apiResponse);
        this.listQueryNames = apiResponse;
        this.queryKeyExiste = this.listQueryNames.includes(queryClean);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
      console.log('is show graph loading :' + this.showGraphLoading);
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.GetNodeNames().subscribe(
        (apiResponse) => {
          this.listNodesNames = apiResponse;
          for (const nodeName of this.listNodesNames) {
            console.log('nodeName :' + nodeName);
            const color = this.getRandomColor();
            this.labelColors[nodeName.replace(/\s/g, '')] = color;
            console.log('node name :' + nodeName);
          }
        },
        (error) => {
          console.log('Error:', error);
        }
      );
      this.graphApiService.GetrelationNames().subscribe(
        (apiResponse) => {
          this.listRelationshipeNames = apiResponse;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
      this.graphApiService.filterGraphData(filter1).subscribe(
        (apiResponse) => {
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          const link = apiResponse.links;
          const nodes = apiResponse.nodes;
          this.newGraph(nodes, link);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
  addMonth() {
    this.monthCount++;
    // console.log("this is the month count :"+this.monthCount);
    this.monthValues.push([]);
    console.log('this is the month values :' + this.monthValues);
  }
  getMonthCountArray() {
    let x = Array(this.monthCount)
      .fill(0)
      .map((x, i) => i + 1);
    //console.log("this is the array of month count :"+x);
    return x;
  }
  toggleGraphFilter(
    grapheOriginal: boolean,
    grapheFiltrer: boolean,
    grapheLoading: boolean
  ) {
    this.showNewGraphFilter = grapheFiltrer;
    this.showGraph = grapheOriginal;
    this.showGraphLoading = grapheLoading;
  }
  //confirmed
  ApplyFilterOdronnance() {
    this.loading = false;
    this.queryKeyExiste = false;
    this.query_key =
      'GetdrugsForPatient' + this.patientId + 'Disease' + this.ordonanceFilter;
    console.log('this is the query key :' + this.query_key);

    let filter2 =
      'patient_id=' +
      this.patientId +
      '&disease=' +
      this.ordonanceFilter +
      '&query_key=' +
      this.query_key;
    console.log('this is the filter par ordonnance  :' + filter2);
    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        console.log('this is the result of query names :' + apiResponse);
        this.listQueryNames = apiResponse;
        this.queryKeyExiste = this.listQueryNames.includes(this.query_key);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
          console.log('Meeeed', this.showNewGraphFilter);
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
      console.log('is show graph loading :' + this.showGraphLoading);
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.filterOrdonnanceData(filter2).subscribe(
        (apiResponse) => {
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          console.log(apiResponse);
          let node = apiResponse.nodes;
          let links = apiResponse.links;
          this.newGraph(node, links);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
  ordonance(value: any) {
    this.ordonanceFilter = value;
    console.log('this is the ordonance filter value :' + this.ordonanceFilter);
  }
  listAlgo(value: any) {
    this.algoTrainingScan = value;
    console.log(
      'this is the value of algorithm selected :' + this.algoTrainingScan
    );
  }
  // confirmed
  ScanAllFiles() {
    this.valueResult = 1;
    console.log(
      'the variable value result :' + this.valueResult + ' = scan all files'
    );
    this.query_key =
      'ScanAllFilesForPatient' +
      this.patientId +
      'WithAlgo' +
      this.algoTrainingScan;
    let scanAllFiles =
      'algo=' +
      this.algoTrainingScan +
      '&patient_id=' +
      this.patientId +
      '&query_key=' +
      this.query_key;
    console.log(
      'this is the value of scan filter of all files :' + scanAllFiles
    );

    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        console.log('this is the result of query names :' + apiResponse);
        this.listQueryNames = apiResponse;
        this.queryKeyExiste = this.listQueryNames.includes(this.query_key);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.ScanAllFiles(scanAllFiles).subscribe(
        (apiResponse) => {
          console.log(
            'this is result api all files scan' + JSON.stringify(apiResponse)
          );
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          let node = apiResponse.nodes;
          let links = apiResponse.links;
          this.newGraph(node, links);
        },
        (error) => {
          console.log('Error:', error.status);
          this.statusApi = error.status;
          this.loading = false;
          this.show = true;
        }
      );
    }
  }
  //confirmed
  haveCancer() {
    this.valueResult = 2;
    console.log(
      'the variable value result :' +
        this.valueResult +
        ' = check if patient have cancer'
    );

    this.loading = false;
    this.queryKeyExiste = false;

    this.query_key =
      'GetCancerForPatient' +
      this.patientId +
      'AndImage' +
      this.valueSelectedInformation;
    console.log('this is the query key :' + this.query_key);
    const cleanQueryKey = this.query_key.replace('.', '');
    console.log('this is the query key without dot :' + cleanQueryKey);

    let filterHaveCancer =
      'image_path=' +
      this.valueSelectedInformation +
      '&patient_id=' +
      this.patientId +
      '&query_key=' +
      cleanQueryKey;
    console.log('this is the filter par image path :' + filterHaveCancer);

    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        console.log('this is the result of query names :' + apiResponse);
        this.listQueryNames = apiResponse;
        this.queryKeyExiste = this.listQueryNames.includes(cleanQueryKey);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
          this.showResult = false;
          this.showGraph = false;
          this.showGraphLoading = true;
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
    } else {
      this.showResult = true;
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.haveCancer(filterHaveCancer).subscribe(
        (apiResponse) => {
          console.log(apiResponse);
          this.loading = false;
          this.toggleGraphFilter(true, false, false);
          this.btnShowOriginGraph = false;
          this.ResultHaveCancer = apiResponse;
          console.log(
            'this is the value of ResultHaveCancer after cancel:' +
              this.ResultHaveCancer
          );
        },
        (error) => {
          console.log('Error:', error);
          this.ResultHaveCancer = error.error.text;
          this.loading = false;
          console.log(
            'resutat have cancer from error console:' + this.ResultHaveCancer
          );
        }
      );
    }
  }
  //confirmed
  ScanOneFile() {
    this.valueResult = 3;
    this.loading = false;
    this.queryKeyExiste = false;

    console.log(
      'the variable value result :' + this.valueResult + ' = scan one file'
    );
    this.file_path = this.valueSelectedInformation;

    if (this.algoTrainingScan === 'LDA') {
      this.query_key = 'TopicsWithLDAFor' + this.file_path;
      console.log('this is the value of query key :' + this.query_key);
    } else if (this.algoTrainingScan === 'HLDA') {
      this.query_key = 'TopicsWithHLDAFor' + this.file_path;
      console.log('this is the value of query key :' + this.query_key);
    } else if (this.algoTrainingScan === 'NMF') {
      this.query_key = 'TopicsWithNMFFor' + this.file_path;
      console.log('this is the value of query key :' + this.query_key);
    }
    let scanOneFile =
      'file_path=' +
      this.file_path +
      '&patient_id=' +
      this.patientId +
      '&algo=' +
      this.algoTrainingScan +
      '&query_key=' +
      this.query_key +
      '&url=' +
      this.urlSelectedInformation;

    console.log('this is the value of scan filter of one file :' + scanOneFile);
    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        console.log('this is the result of query names :' + apiResponse);
        this.listQueryNames = apiResponse; // [1,0,0,0,0]
        this.queryKeyExiste = this.listQueryNames.includes(this.query_key);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
          this.showGraphLoading = true;
        } else {
          this.toggleGraphFilter(false, false, true);
          this.showGraphLoading = true;
          console.log(
            'is show graph loading (dgraph container loading) : ' +
              this.showGraphLoading
          );
          this.loading = true;
          console.log('is loading :' + this.loading);
          this.graphApiService.GetNodeNames().subscribe(
            (apiResponse) => {
              this.listNodesNames = apiResponse;
              for (const nodeName of this.listNodesNames) {
                console.log('nodeName :' + nodeName);
                // Generate a random color for each node name
                const color = this.getRandomColor();
                this.labelColors[nodeName.replace(/\s/g, '')] = color;
                console.log('node name :' + nodeName);
              }
            },
            (error) => {
              console.log('Error:', error);
            }
          );
          this.graphApiService.GetrelationNames().subscribe(
            (apiResponse) => {
              this.listRelationshipeNames = apiResponse;
            },
            (error) => {
              console.log('Error:', error);
            }
          );

          this.graphApiService.ScanOneFile(scanOneFile).subscribe(
            (apiResponse) => {
              console.log(JSON.stringify(apiResponse));
              this.loading = false;
              this.apiData = apiResponse;
              this.loading = false;
              this.toggleGraphFilter(false, true, false);
              const node = apiResponse.nodes;
              const links = apiResponse.links;
              this.newGraph(node, links);
            },
            (error) => {
              console.log('Error:', error.status);
              this.statusApi = error.status;
              this.loading = false;
              this.show = true;
            }
          );
        }

        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  initializeData() {
    this.showExcelSummarize = false;
    this.valueResult = null;
    this.ResultHaveCancer = '';
    this.showResultHaveCancer = false;
    this.monthCount = 1;
    this.monthValues = [[]];
    this.nodeNameSearched = '';
    this.year = '';
    this.ordonanceFilter = '';
    this.algoTrainingScan = '';
    this.file_path = '';
    this.showResult = false;
    this.resultatapiscanOneFile = [];
    this.isButtonShow = false;
    this.statusApi = 0;
    this.resultatapiscan = [];
    this.show = false;
    this.loading = false;
    this.apiData = [];
    this.listSummaries = [];
    this.filterNumericSummaries = [];
    this.selectAprocheNumericSummarize = '';
    this.listTopicMultipe = [];
    this.nodeNameSearched = '';
    this.showFileinput = false;
    this.showvalueinput = false;
    this.nodeSelectedInformation = {};
    this.dateSelectedInformation = {};
    this.valueSelectedInformation = {};
    this.nameSelectedInformation = {};
    this.typeSelectedInformation = '';
    this.urlSelectedInformation = '';
    this.sourceNodeId = null;
    this.target = null;
    this.selectedType = '';
    this.isShowModal = false;
    this.isEmpty = true;
    this.isButtonShow = false;
    this.showResultSummarize = false;
    this.seacrchtype = '';
    this.resultatFilter = [];
    this.resultF = null;
    this.showAddAnalyseInNewGraph = true;
    this.showsuccessmessage = false;
    this.showerrormessage = false;
    this.typeExcelSummarize = '';
    this.showSelectInModalChooseAlgorithm = false;
    this.patientNAME = '';
    this.mesureOf = '';
    this.typeCount = 1;
    this.typesValues = [[]];
    this.query_key = '';
    this.showGraphLoading = false;
    this.queryKeyExiste = false;
    this.btnShowOriginGraph = false;
    this.selectedNodeName = '';
    this.selectedRelationName = '';
    this.typeSelectedforFiler = '';
    this.typeOrdonance = '';
    this.typeSearch = '';
  }
  CancelFilter() {
    if (this.showGraph == false && this.showNewGraphFilter == true) {
      this.initializeData();
      this.ngOnInit();
      this.toggleGraphFilter(true, false, false);
    }
    this.showbtnSeeINformation = false;
  }
  //confirmed
  ExcelSummarize() {
    this.queryKeyExiste = false;
    this.loading = false;
    console.log(
      'the variable value result :' + this.valueResult + ' = Excel Summarize'
    );
    this.query_key =
      'ExcelSummarizeFor' + this.file_path + 'With' + this.typeExcelSummarize;
    console.log('the query key :' + this.query_key);

    let filterExcelSummarize =
      'file_path=' +
      this.valueSelectedInformation +
      '&patient_id=' +
      this.patientId +
      '&aggregateFN=' +
      this.typeExcelSummarize +
      '&query_key=' +
      this.query_key;
    console.log('value :' + this.valueSelectedInformation);

    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        console.log('this is the result of query names :' + apiResponse);
        this.listQueryNames = apiResponse;
        this.queryKeyExiste = this.listQueryNames.includes(this.query_key);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
      console.log('is show graph loading :' + this.showGraphLoading);
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.ExcelSummarize(filterExcelSummarize).subscribe(
        (apiResponse) => {
          console.log(apiResponse);
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          const link = apiResponse.links;
          const nodes = apiResponse.nodes;
          this.showExcelSummarize = true;
          this.newGraph(nodes, link);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
  summarises() {
    if (
      this.typeSelectedInformation !== 'numeric' &&
      this.typeSelectedInformation !== 'string' &&
      this.nameSelectedInformation !== 'Patient'
    ) {
      const file = this.valueSelectedInformation;
      const extension = '.pdf';
      const lastDot = file.lastIndexOf('.');
      const fileExtension = file.substring(lastDot);
      console.log('this is the value of file extension :' + fileExtension);

      if (fileExtension === extension) {
        const summarizeObj = {
          value: this.valueSelectedInformation,
          url: this.urlSelectedInformation,
        };
        this.filterNumericSummaries.push(summarizeObj);
        console.log(
          'this is the value of filter numeric summaries :' +
            JSON.stringify(this.filterNumericSummaries)
        );
      }
    }
    console.log(
      'this is the list  :' + JSON.stringify(this.filterNumericSummaries)
    );
  }
  listAlgAbstractive(value: any) {
    this.selectAprocheNumericSummarize = value;
    console.log(
      'this is the value of algorithm selected :' +
        this.selectAprocheNumericSummarize
    );
  }
  // confirmed :abstractive summarize "TREE_BASED......"
  SummarizeNumeric() {
    this.valueResult = 6;
    this.queryKeyExiste = false;
    this.loading = false;
    const files = JSON.parse(JSON.stringify(this.filterNumericSummaries));
    console.log('files are :' + files);
    const values = files.map((item) => item.value);
    console.log('values are :' + values);
    this.query_key =
      'ExtractAbstractiveSummarizeForPatient' +
      this.patientId +
      'With' +
      this.selectAprocheNumericSummarize +
      'ForFiles' +
      values;
    console.log('the query key :' + this.query_key);
    const cleanQueryKey = this.query_key.replace(',', '');
    console.log('clean query key :' + cleanQueryKey);

    let filterSummarizeNumeric = {
      patient_id: this.patientId,
      file_paths: this.filterNumericSummaries,
      aproach: this.selectAprocheNumericSummarize,
      query_key: cleanQueryKey,
    };
    console.log(
      'this is the value of filter summarize numeric :' +
        JSON.stringify(filterSummarizeNumeric)
    );
    this.graphApiService.queryNames(this.patientId).subscribe((apiResponse) => {
      console.log('this is the result of query names :' + apiResponse);
      this.listQueryNames = apiResponse;
      this.queryKeyExiste = this.listQueryNames.includes(cleanQueryKey);
      if (this.queryKeyExiste) {
        this.showNewGraphFilter = false;
      }
      console.log('Is query exist :' + this.queryKeyExiste);
    });
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService
        .SummarizeMultipleFile(filterSummarizeNumeric)
        .subscribe(
          (apiResponse) => {
            this.loading = false;
            this.toggleGraphFilter(false, true, false);
            let node = apiResponse.nodes;
            let links = apiResponse.links;
            this.newGraph(node, links);
          },
          (error) => {
            console.log('Error:', error);
          }
        );
    }
  }
  newGraph(node: any, links: any): any {
    this.isButtonShow = false;

    const options = {
      autoResize: true,
      nodes: {
        shape: 'circle',
        size: 100,
        font: {
          size: 12,
          color: '#000000',
        },
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5,
          },
        },
        font: {
          size: 12,
          color: '#000000',
          align: 'horizontal', // align the labels horizontally
        },
        labelHighlightBold: false, // do not make the label bold on highlight
      },
    };
    this.graphApiService.GetNodeNames().subscribe(
      (apiResponse) => {
        this.listNodesNames = apiResponse;
        // Assign label colors dynamically for all node names
        for (const nodeName of this.listNodesNames) {
          console.log('nodeName :' + nodeName);
          // Generate a random color for each node name
          const color = this.getRandomColor();
          this.labelColors[nodeName.replace(/\s/g, '')] = color;
          console.log('node name :' + nodeName);
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    this.graphApiService.GetrelationNames().subscribe(
      (apiResponse) => {
        this.listRelationshipeNames = apiResponse;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    const nodes = new DataSet(node);
    const edges = new DataSet(
      links.map((link) => ({
        ...link,
        from: link.source,
        to: link.target,
        label: link.type,
      }))
    );
    nodes.forEach((node) => {
      this.isEmpty = true;
      try {
        // @ts-ignore
        const label = node.labels[0];
        if (label === 'Patient' || label === 'Patient' || label === 'PATIENT') {
          // @ts-ignore
          node.color = '#FF0000';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'box';
          // @ts-ignore
          node.size = 100;
        } else if (label === 'Document') {
          // @ts-ignore
          node.color = '#34c3eb';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        } else if (label === 'PRESCRIPTION') {
          // @ts-ignore
          node.color = '#EBE76C';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        } else if (label === 'DRUG') {
          // @ts-ignore
          node.color = '#62d952';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        } else if (label === 'Results') {
          // @ts-ignore
          node.color = '#25a86b';
          // @ts-ignore
          node.label = label;
          // @ts-ignore
          node.shape = 'circle';
          // @ts-ignore
          node.size = 100;
        }
        if (label && typeof label === 'string' && this.labelColors[label]) {
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
    const Newdata = { nodes, edges };
    const network = new Network(this.container, Newdata, options);
    network.on('selectNode', (event) => {
      const nodeId = event.nodes[0];
      const selectedNode = nodes.get(nodeId);
      this.sourceNodeId = nodeId;
      this.isButtonShow = true;
      console.log('Node selected: ', selectedNode);
      this.nodeSelectedInformation = selectedNode;
      console.log('nodeSelectedInformation : ', this.nodeSelectedInformation);

      this.dateSelectedInformation =
        this.nodeSelectedInformation.properties.date;
      console.log('dateeeeeeeeeeee', this.dateSelectedInformation);
      this.NewGrapheDateSelectedInformation =
        this.nodeSelectedInformation.properties.date;
      //value excel
      this.valueSelectedInformation =
        this.nodeSelectedInformation.properties.value;
      console.log('valueeeeeeeeeeee', this.valueSelectedInformation);
      this.graphApiService.table.next(this.valueSelectedInformation);
      this.valueforexcelgraph = this.nodeSelectedInformation.properties.value;
      console.log('valueeeeeeeeeeee', this.valueSelectedInformation);
      this.listSummaries.push(this.valueSelectedInformation);
      this.nameSelectedInformation = this.nodeSelectedInformation.label;
      console.log('nameeeeeeeeeeee', this.nameSelectedInformation);
      this.typeSelectedInformation =
        this.nodeSelectedInformation.properties.type;
      console.log('typeeeeeeeeeeee', this.typeSelectedInformation);
      this.urlSelectedInformation = this.nodeSelectedInformation.properties.url;
      console.log('urllllllllll', this.urlSelectedInformation);
      this.NewGrapheUrlSelectedInformation =
        this.nodeSelectedInformation.properties.url;
      console.log('urllllllllll neeww ', this.NewGrapheUrlSelectedInformation);
      this.resultF = this.nodeSelectedInformation.properties.results;
      console.log('resultF', this.resultF);
      if (
        this.nameSelectedInformation === 'Results' &&
        this.nodeSelectedInformation.properties.results
      ) {
        this.resultatFilter = JSON.parse(this.resultF);
        console.log('resultatFilter', this.resultatFilter);
      }
      // if(this.valueResult===6 && this.nameSelectedInformation=== 'Results' && this.selectAprocheNumericSummarize==='TREE_BASED'){
      //   this.resultatFilter = Object.values(this.resultF);
      //   console.log('resultatFilter abstractive ',this.resultatFilter);
      // }
      //patient excel
      this.patientNAME = this.nodeSelectedInformation.properties.patient;
      this.mesureOf = this.nodeSelectedInformation.properties.mesureOf;
      console.log('patientNAME :', this.patientNAME);
      console.log('mesureOf :', this.mesureOf);
      console.log('Selected Node id :', this.sourceNodeId);
    });
    network.on('deselectNode', () => {
      this.sourceNodeId = null;
      this.isButtonShow = false;
      console.log('Node deselected');
    });
    // return  Newdata;
  }
  //confirmed :extractive Summarize "LDA, HLDA,NMF"
  topicMultiple() {
    this.valueResult = 7;
    this.queryKeyExiste = false;
    this.loading = false;
    const files = JSON.parse(JSON.stringify(this.filterNumericSummaries));
    console.log('files are :' + files);
    const values = files.map((item) => item.value);
    console.log('values are :' + values);
    this.query_key =
      'ExtractExtractiveSummarizeForPatient' +
      this.patientId +
      'With' +
      this.algoTrainingScan +
      'ForFiles' +
      values;
    console.log('the query key :' + this.query_key);
    const cleanQueryKey = this.query_key.replace(',', '');
    console.log('clean query key :' + cleanQueryKey);

    const filter = {
      patient_id: this.patientId,
      file_paths: this.filterNumericSummaries,
      algo: this.algoTrainingScan,
      query_key: cleanQueryKey,
    };
    console.log('this is the filter :' + JSON.stringify(filter));

    this.graphApiService.queryNames(this.patientId).subscribe((apiResponse) => {
      console.log('this is the result of query names :' + apiResponse);
      this.listQueryNames = apiResponse;
      this.queryKeyExiste = this.listQueryNames.includes(cleanQueryKey);
      if (this.queryKeyExiste) {
        this.showNewGraphFilter = false;
      }
      console.log('Is query exist :' + this.queryKeyExiste);
    });

    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.topicMultiple(filter).subscribe(
        (apiResponse) => {
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          let node = apiResponse.nodes;
          let links = apiResponse.links;
          this.newGraph(node, links);
        },
        (error) => {
          console.log('Error:', error);
          this.loading = false;
          this.toggleGraphFilter(false, false, true);
          this.statusApi = error.status;
          this.show = true;
        }
      );
    }
  }
  //confirmed :one type +multiple month
  filterType() {
    this.loading = false;
    this.queryKeyExiste = false;

    let monthParams = '&month=' + this.monthValues.join('&month=');
    console.log('this is the value of month params :' + monthParams);

    this.query_key =
      'FilterTypeForPatient' +
      this.patientId +
      'WithType' +
      this.seacrchtype +
      'AndYear' +
      this.year +
      'AndMonth' +
      this.monthValues;
    console.log('this is the query key :' + this.query_key);
    const queryClean = this.query_key.replace(',', '');
    console.log('this is variable sans virgule :' + queryClean);

    const filterType =
      'patient_id=' +
      this.patientId +
      '&type=' +
      this.seacrchtype +
      '&query_key=' +
      queryClean +
      '&year=' +
      this.year +
      monthParams;
    console.log('this is the filter :' + filterType);

    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        this.listNodesNames = apiResponse;
        console.log(
          'this is the result of query names :' + this.listNodesNames
        );
        this.queryKeyExiste = this.listNodesNames.includes(queryClean);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );

    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.filterType(filterType).subscribe(
        (apiResponse) => {
          console.log(
            'this is the result of filter type :' + JSON.stringify(apiResponse)
          );
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          let node = apiResponse.nodes;
          let links = apiResponse.links;
          this.newGraph(node, links);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
  selectType(value: any) {
    this.seacrchtype = value;
    console.log('this is the value of search type :' + this.seacrchtype);
  }

  showExcelChooseAlgo() {
    this.showSelectInModalChooseAlgorithm = true;
    console.log(
      'showSelectInModalChooseAlgorithm :' +
        this.showSelectInModalChooseAlgorithm
    );
  }
  listTypeSummarize(value: any) {
    this.typeExcelSummarize = value;
    console.log(
      'this is the value of type excel summarize :' + this.typeExcelSummarize
    );
  }
  showAlgorithmModaleExtractiveAndAbstractive() {
    this.showSelectInModalChooseAlgorithm = false;
  }
  showModale() {
    console.log('show modale before :' + this.showSelectInModalChooseAlgorithm);
    this.showSelectInModalChooseAlgorithm =
      !this.showSelectInModalChooseAlgorithm;
    console.log('show modale after :' + this.showSelectInModalChooseAlgorithm);
  }
  //confirmed :multiple type +multiple month
  displayFilter() {
    this.loading = false;
    this.queryKeyExiste = false;

    let monthParams = '&month=' + this.monthValues.join('&month=');
    console.log('this is the value of month params :' + monthParams);

    let typesParams = '&type=' + this.typesValues.join('&type=');
    console.log('this is the value of types params :' + typesParams);

    this.query_key =
      'FilterTypeForPatient' +
      this.patientId +
      'WithType' +
      typesParams +
      'AndYear' +
      this.year +
      'AndMonth' +
      monthParams;
    console.log('this is the query key :' + this.query_key);

    const queryClean = this.query_key.replace(/[&=]/g, '');
    console.log('this is query clean final :' + queryClean);

    const filter =
      'patient_id=' +
      this.patientId +
      '&year=' +
      this.year +
      monthParams +
      typesParams +
      '&query_key=' +
      queryClean;
    console.log('this is the display filter :' + filter);

    this.graphApiService.queryNames(this.patientId).subscribe(
      (apiResponse) => {
        this.listNodesNames = apiResponse;
        console.log(
          'this is the result of query names :' + this.listNodesNames
        );
        this.queryKeyExiste = this.listNodesNames.includes(queryClean);
        if (this.queryKeyExiste) {
          this.showNewGraphFilter = false;
        }
        console.log('Is query exist :' + this.queryKeyExiste);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
    if (this.queryKeyExiste) {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = false;
    } else {
      this.toggleGraphFilter(false, false, true);
      this.showGraphLoading = true;
      this.loading = true;
      this.graphApiService.displayFilter(filter).subscribe(
        (apiResponse) => {
          this.loading = false;
          this.toggleGraphFilter(false, true, false);
          let node = apiResponse.nodes;
          let links = apiResponse.links;
          this.newGraph(node, links);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }

  addType() {
    this.typeCount++;
    this.typesValues.push([]);
    console.log('this is the types values :' + this.typesValues);
  }
  getTypeCountArray() {
    let x = Array(this.typeCount)
      .fill(0)
      .map((x, i) => i + 1);
    //console.log("this is the array of month count :"+x);
    return x;
  }
  protected readonly Object = Object;
}
