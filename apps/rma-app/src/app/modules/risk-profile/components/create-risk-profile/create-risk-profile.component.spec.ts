import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RpPortfolioQuestionOptionBolderPipe } from '@cimb/core';
import { MockRPQuestionnaireResponse } from "../../mock/rpq.mock";
import { CreateRiskProfileComponent } from './create-risk-profile.component';
import { SimpleChanges } from '@angular/core';

describe('CreateRiskProfileComponent', () => {
  let component: CreateRiskProfileComponent;
  let fixture: ComponentFixture<CreateRiskProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule
      ],
      declarations: [ CreateRiskProfileComponent, RpPortfolioQuestionOptionBolderPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRiskProfileComponent);
    component = fixture.componentInstance;
    component.riskProfileQuestionnaire = MockRPQuestionnaireResponse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initiateForm on ngOnChanges', () => {
    const spy = jest.spyOn(component, 'initiateForm');

    component.ngOnChanges({} as SimpleChanges);
    component.initiateForm();

    expect(spy).toHaveBeenCalled();
  });

  it('should to call activeSelectedValue', () => {
    component.answers = [];
    component.activeSelectedValue(1);
    
    expect(component.activeSelectedValue(1)).toBe(component.answers[0])
  })

});
