import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TransactionSummaryComponent } from './transaction-summary.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockOrderSummaryData } from '../../mock/order-summary-spec.mock';
import { OrderSummaryApiService } from '../../services/order-summary.service';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { ApplicationStatus } from '@cimb/mint-office';


const mockOrderSummaryRouteData = {
  cifNumber: "10110000311802",
  transactionRefId:"S123",
  transactionId: "2345",
};

const mockSendRemainderData = {
  message: "string",
  data: "string",
  success: true
}
const Mockdate = "date";

const dialogeMock = {
    open: () => { /* mock */ }
}

describe('TransactionSummaryComponent', () => {
  let component: TransactionSummaryComponent;
  let fixture: ComponentFixture<TransactionSummaryComponent>;
  let service: TransactionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionSummaryComponent
      ],
      imports: [
          BrowserAnimationsModule,
          CommonModule,
          RouterTestingModule,
          HttpClientTestingModule,
          MatExpansionModule,
          MatDialogModule,
          MatDividerModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatTooltipModule,
          RouterTestingModule,
          StoreModule.forRoot({}),
      ],
      providers:[
        TransactionService,
        OrderSummaryApiService,
        {
            provide: MatDialog,
            useValue: dialogeMock,
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSummaryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TransactionService);
    component.orderSummaryData$ = of(MockOrderSummaryData);
    component.orderSummaryRouteData =  mockOrderSummaryRouteData;
    component.sendRemainderData$ = of(mockSendRemainderData);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call send email method', () => {
    const email = {trxRefId: 'S123'}
    component.sendingEmail()
  });

  it('should go to transaction page for rpExpiry false', () => {
    component.gotoTransactionPage(MockOrderSummaryData)
  });

  it('should transforn date', ()=>{
    component.transformDate(Mockdate);
    expect(component.transformDate(Mockdate)).toBe('date')
  });

  it('should open license expire popup', async() => {
    const trnsaction = MockOrderSummaryData;

    jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Okay')} as MatDialogRef<typeof component>)
    jest.spyOn(service, 'getTrxValidaityStatus').mockReturnValue(of({ statusCode: '9001' }));
    const spy = jest.spyOn(component, 'openLicenceExpiredDialogPopup');

    component.gotoTransactionPage(trnsaction);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
});

it('should open AML popup', async() => {
    const trnsaction = MockOrderSummaryData;

    jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Okay')} as MatDialogRef<typeof component>);
    jest.spyOn(service, 'getTrxValidaityStatus').mockReturnValue(of({ statusCode: '9002' }));
    const spy = jest.spyOn(component, 'openAmlOrCasaPopupForTrxSummary');

    component.gotoTransactionPage(trnsaction);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith();
})

it('should open casa account popup', async() => {
    const trnsaction = MockOrderSummaryData;

    jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Okay')} as MatDialogRef<typeof component>)
    jest.spyOn(service, 'getTrxValidaityStatus').mockReturnValue(of({ statusCode: '9003' }));
    const spy = jest.spyOn(component, 'openAmlOrCasaPopupForTrxSummary');

    component.gotoTransactionPage(trnsaction);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(true);
})
});
