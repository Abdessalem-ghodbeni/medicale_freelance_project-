import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfilSettingComponent } from './patient-profil-setting.component';

describe('PatientProfilSettingComponent', () => {
  let component: PatientProfilSettingComponent;
  let fixture: ComponentFixture<PatientProfilSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfilSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfilSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
