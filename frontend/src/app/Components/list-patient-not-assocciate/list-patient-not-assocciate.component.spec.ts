import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientNotAssocciateComponent } from './list-patient-not-assocciate.component';

describe('ListPatientNotAssocciateComponent', () => {
  let component: ListPatientNotAssocciateComponent;
  let fixture: ComponentFixture<ListPatientNotAssocciateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPatientNotAssocciateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatientNotAssocciateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
