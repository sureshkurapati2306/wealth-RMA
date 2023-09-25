import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CanDeactivateGuard } from './can-deactivate.gaurd';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'apps/rma-app/src/environments/environment';
import { NewApplicationComponent } from '../../new-investment/components/new-application/new-application.component';
import { RiskProfileEditComponent } from '../../risk-profile/components/risk-profile-edit/risk-profile-edit.component';
import { RiskProfileService } from '../../risk-profile/services/risk-profile.service';
import { SnackbarService } from '../../transaction/services/snack-bar.service';
import { TransactionService } from '../../transaction/services/transaction.service';
import { TransactionComponent } from '../../transaction/transaction.component';
import { MockTransactionService, MockSnackBarService } from '../../transaction/transaction.component.spec';


describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;

  let actions$: Observable<any>;
  let store: MockStore<any>;

  let mockComponent:TransactionComponent | NewApplicationComponent | RiskProfileEditComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule

      ],
      declarations: [
      ],
      providers: [
        CanDeactivateGuard,
        RiskProfileService,
        ChangeDetectorRef,
        TransactionComponent,
        NewApplicationComponent,
        RiskProfileEditComponent,
        { provide: 'environment', useValue: environment },
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: SnackbarService, useClass: MockSnackBarService },

        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} })
      ]
    }),
      guard = TestBed.inject(CanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call canDeactivate for TransactionComponent- if false', () => {

    mockComponent = TestBed.get(TransactionComponent) as TransactionComponent;

    jest.spyOn(mockComponent, 'canDeactivate').mockReturnValue(false);

    expect(guard.canDeactivate(mockComponent)).toBeTruthy();

  });

  it('should call canDeactivate for NewApplicationComponent - if false', () => {

    mockComponent = TestBed.get(NewApplicationComponent) as NewApplicationComponent;

    jest.spyOn(mockComponent, 'canDeactivate').mockReturnValue(false);

    expect(guard.canDeactivate(mockComponent)).toBeTruthy();

  });

  it('should call canDeactivate for RiskProfileEditComponent- if false', () => {

    mockComponent = TestBed.get(RiskProfileEditComponent) as RiskProfileEditComponent;

    jest.spyOn(mockComponent, 'canDeactivate').mockReturnValue(false);

    expect(guard.canDeactivate(mockComponent)).toBeTruthy();

  });

  it('should call canDeactivate for RiskProfileEditComponent- if true', () => {

    mockComponent = TestBed.get(RiskProfileEditComponent) as RiskProfileEditComponent;

    jest.spyOn(mockComponent, 'canDeactivate').mockReturnValue(true);
    jest.spyOn(mockComponent, 'dirtyCheckDialog').mockReturnValue(of(true));

    expect(mockComponent.dirtyCheckDialog()).toBeTruthy();

    expect(guard.canDeactivate(mockComponent)).toBeTruthy();

  });

});
