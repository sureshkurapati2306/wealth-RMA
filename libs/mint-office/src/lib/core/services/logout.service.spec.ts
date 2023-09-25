import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogMessageComponent } from '@cimb/mint-office';
import { of, throwError } from 'rxjs';
import { TransactionLogoutService } from './logout.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IDraftTransactionResponse } from 'apps/rma-app/src/app/modules/transaction/+state/transaction.models';

const mockDraftTransactionResponse: IDraftTransactionResponse = {
    "status": "200",
    "message": "Transaction created successfully",
    "trxId": "31",
    "transactionRefId": "TRX-Wed Aug 10 11:39:43 MYT 2022",
    "transactionCreateDate": "2022-08-10 11:39:43",
    "draftExpiryDate": "2022-08-15 11:39:43"
}

describe('TransactionLogoutService', () => {
  let component: TransactionLogoutService;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ DialogMessageComponent ],
      imports: [BrowserAnimationsModule, MatDialogModule, RouterTestingModule],
    }),
    component = TestBed.inject(TransactionLogoutService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open draftTransactionLogoutPopup', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    component.draftTransactionLogoutPopup();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should open normalLogoutPopup', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    component.normalLogoutPopup();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call transactionHandler if isDraftApplicationOpen true', () => {
    jest.spyOn(component, 'draftTransactionLogoutPopup').mockReturnValue(of('Cancel'));

    const draftTransactionLogoutPopupSpy = jest.spyOn(component, 'draftTransactionLogoutPopup')
    const spy = jest.spyOn(component, 'transactionHandler');
    component.isDraftApplicationOpen = true;
    component.logout();

    expect(spy).toHaveBeenCalled();
    expect(draftTransactionLogoutPopupSpy).toHaveBeenCalled();

  });


  it('should call transactionHandler if isDraftApplicationOpen false', () => {
    const normalLogoutPopupSpy = jest.spyOn(component, 'normalLogoutPopup').mockReturnValue(of(''));
    component.isDraftApplicationOpen = false;
    component.logout();

    expect(normalLogoutPopupSpy).toHaveBeenCalled();

  });

  it('should call transactionHandler', (done) => {
    jest.spyOn(component, 'draftTransactionLogoutPopup').mockReturnValue(of('Cancel'));

    component.transactionHandler().subscribe(res => {
      expect(res).toBe('Cancel');
      done()
    });
  });

  it('should call transactionHandler for valid response', (done) => {
    jest.spyOn(component, 'draftTransactionLogoutPopup').mockReturnValue(of('Save Draft and Logout'));
    component.savedtransactionCallback = () => {
      return of(mockDraftTransactionResponse)
    }
    component.transactionHandler().subscribe(res => {
      expect(res).toBe('Continue');
      done()
    });
  });

  it('should call transactionHandler for invalid response', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'no data found',
      status: 404
    });

    jest.spyOn(component, 'draftTransactionLogoutPopup').mockReturnValue(of('Save Draft and Logout'));
    component.savedtransactionCallback = () => {
      return throwError(errorResponse);
    }
    component.transactionHandler().subscribe(
      () => { done.fail('') },
      (error: HttpErrorResponse) => {
        expect(error.error).toBe('no data found');
        expect(error.status).toBe(404);
        done();
      });
    });
  });
