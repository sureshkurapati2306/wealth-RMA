import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from 'apps/rma-app/src/environments/environment';
import { of } from 'rxjs';
import { MockCustomer } from '../../../customer/mock/customer-state.mock';
import { MockUpdateRiskProfileQuestionnaireResponse } from '../../mock/risk-profile-summary-spec.mock';
import { RiskProfileService } from '../../services/risk-profile.service';
import { RiskProfileEditComponent } from './risk-profile-edit.component';

describe('RiskProfileEditComponent', () => {
  let component: RiskProfileEditComponent;
  let fixture: ComponentFixture<RiskProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserAnimationsModule, RouterTestingModule, MatDialogModule, HttpClientModule, StoreModule.forRoot({})],
      providers: [
        RiskProfileService,
        provideMockStore(),
        {provide: 'environment', useValue: environment},
        {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                transactionId: 37,
                cifNumber: '123',
                isEdit: false
              }),
              parent: {
                data: of({
                  cifNumber: '123',
                  transactionId: 37
                })
              }
            }
        }
      ],
      declarations: [ RiskProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileEditComponent);
    component = fixture.componentInstance;
    component.customer$ = of(MockCustomer[0]);
    component.cifNumber = {cifNumber: "10280000511312"};
    component.updateRiskProfileQuestionnaire$ = of(MockUpdateRiskProfileQuestionnaireResponse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDialog', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    component.openDialog(true);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call riskProfileFormData', () => {
    const formData: FormGroup = new FormGroup({});
    component.riskProfileFormData(formData);
    expect(component.enableUpdateBtn).toBeTruthy();
  });

  it('should close the dialog', (done) => {
    const dialogSpy = jest.spyOn(component, 'openDialog').mockReturnValue(of('Yes, Return to Customer Profile'));
    component.onCancel();
    component.openDialog(true).subscribe(res => {
      expect(res).toBe('Yes, Return to Customer Profile');
      expect(dialogSpy).toHaveBeenCalled();
      done()
    });
  });

  it('should go to createRPQTnx', (done) => {
    const dialogSpy = jest.spyOn(component, 'openDialog').mockReturnValue(of('Yes, I confirm'));
    component.cifNumber = {
        cifNumber: "123",
        isEdit: true,
        transactionId: "123"
    }
    component.createRPQTnx();
    component.openDialog(false).subscribe(res => {
      expect(res).toBe('Yes, I confirm');
      expect(dialogSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should to call beforeUnload', () => {
    const event = window.dispatchEvent(new Event('beforeunload'));
    component.beforeUnload({} as BeforeUnloadEvent);
  });

  it('should to call openDirtyCheckPopup', () => {
    component.openDirtyCheckPopup();
    component.onCancel();

    expect(component.openDirtyCheckPopup()).toBeUndefined();
  })

  it('should to call dirtyCheckDialog', () => {
    const mockFunction = jest.spyOn(component, 'dirtyCheckDialog').mockReturnValue(of(false));
    component.dirtyCheckDialog();
    component.openDirtyCheckPopup();

    component.dirtyCheckDialog().subscribe(res => {
      expect(res).toBeFalsy();
      expect(component.openDirtyCheckPopup()).toBeUndefined();
      expect(mockFunction).toHaveBeenCalled();
    });
  });

});
