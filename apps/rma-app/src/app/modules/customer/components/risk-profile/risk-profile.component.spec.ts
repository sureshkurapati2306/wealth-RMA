import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RiskProfileComponent } from './risk-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MockCustomerProfile } from '@cimb/mint-office';
import { MockRiskProfileInquiry } from '../../../transaction/mock/fund-details.mock';
import { By } from '@angular/platform-browser';

describe('RiskProfileComponent', () => {
  let component: RiskProfileComponent;
  let fixture: ComponentFixture<RiskProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskProfileComponent ],
      imports:[
          CommonModule,
          MatCardModule,
          MatDividerModule,
          MatIconModule,
          BrowserAnimationsModule,
          MatDialogModule,
          RouterTestingModule,
          StoreModule.forRoot({}),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({cifNumber: '123'})
          }
      }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileComponent);
    component = fixture.componentInstance;
    component.riskProfile$ = MockRiskProfileInquiry;
    component.customerProfile$ = MockCustomerProfile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open alert box', () => {
    const spy = jest.spyOn(component.dialog, 'open');
    component.updateConfirmation(MockCustomerProfile);
    expect(spy).toHaveBeenCalled();
  });
  it('should go to verifyPopUp()', () => {
    component.verifyPopUp();
  });
  it('should go to goToRiskProfilePage()', () => {
    void component.goToRiskProfilePage();
  });
  it('should go to denyPopUp()', () => {
     component.denyPopUp();
  });

  it('if license is expired then update button should be disabled', () => {
    component.customerProfile$ = {
        ...MockCustomerProfile,
        licenseValidity: false,
    };
    component.riskProfile$ = MockRiskProfileInquiry;
    component.isProfileExpired$ = false;
    component.isUserBlock$ = false;

    fixture.detectChanges();

    const updateButton = fixture.debugElement.query(By.css('.riskprofile button'));
    expect(updateButton).not.toBe(null);

    expect((updateButton.nativeElement as HTMLButtonElement).disabled).toBeTruthy();
  });

  it('if casa status is not valid then update button should be disabled', () => {
    component.customerProfile$ = {
        ...MockCustomerProfile,
        licenseValidity: true,
        casaStatus: 'F',
    };
    component.riskProfile$ = MockRiskProfileInquiry;
    component.isProfileExpired$ = false;
    component.isUserBlock$ = false;

    fixture.detectChanges();

    const updateButton = fixture.debugElement.query(By.css('.riskprofile button'));
    expect(updateButton).not.toBe(null);

    expect((updateButton.nativeElement as HTMLButtonElement).disabled).toBeTruthy();
  })
});
