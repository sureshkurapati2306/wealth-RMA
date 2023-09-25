import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { RiskProfileDetailComponent } from './risk-profile-detail.component';
import { MockIRiskProfileDataResponse } from '../../mock/risk-profile-spec.mock';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RiskProfileDetailComponent', () => {
  let component: RiskProfileDetailComponent;
  let fixture: ComponentFixture<RiskProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RiskProfileDetailComponent,
    ],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the questionaire questions from json fields', (done) => {
    component.riskProfile$ = of(MockIRiskProfileDataResponse);
    component.getQuestioniore().subscribe(res => {
        expect(res.length).toBe(1);
        done();
    })
  })

  it('should go to gotoCustomerProfile()', () => {
    component.gotoCustomerProfile();
  });

  it('should call denyPopUp', () => {
    const dialogSpy = jest.spyOn(component, 'denyPopUp');
    component.denyPopUp();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call verifyPopUp', () => {
    const dialogSpy = jest.spyOn(component, 'verifyPopUp');
    component.verifyPopUp();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call updateConfirmation if rpqApprovalStatus is N', () => {
    const mockData = {
      rpqApprovalStatus: 'N',
      inSanctionCountry: 'Y'
    }
    component.updateConfirmation(mockData);
    component.denyPopUp();

  });

  it('should call updateConfirmation if rpqApprovalStatus is not N', () => {
    const mockData = {
      rpqApprovalStatus: 'Y',
      inSanctionCountry: 'Y'
    }
    component.updateConfirmation(mockData);
    component.verifyPopUp();

  });

});
