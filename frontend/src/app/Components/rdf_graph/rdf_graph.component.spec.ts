/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Rdf_graphComponent } from './rdf_graph.component';

describe('Rdf_graphComponent', () => {
  let component: Rdf_graphComponent;
  let fixture: ComponentFixture<Rdf_graphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Rdf_graphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rdf_graphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
