import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RiskProfileQuestionnaireComponent } from './risk-profile-questionnaire.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RiskProfileQuestionnaireComponent', () => {
  let component: RiskProfileQuestionnaireComponent;
  let fixture: ComponentFixture<RiskProfileQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskProfileQuestionnaireComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers:[]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
