import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSummaryPatientComponent } from './graph-summary-patient.component';

describe('GraphSummaryPatientComponent', () => {
  let component: GraphSummaryPatientComponent;
  let fixture: ComponentFixture<GraphSummaryPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSummaryPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSummaryPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
