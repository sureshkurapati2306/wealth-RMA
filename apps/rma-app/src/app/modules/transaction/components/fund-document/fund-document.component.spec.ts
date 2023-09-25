import { SimpleChanges } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { of, throwError } from 'rxjs';
import { MockFundDetailData, MockFundSummuryDetail } from '../../mock/fund-details.mock';
import { SnackbarService } from '../../services/snack-bar.service';
import { TransactionService } from '../../services/transaction.service';
import { FundDocumentComponent } from './fund-document.component';
import { HttpErrorResponse } from '@angular/common/http';

class MockTransactionService {
    getFundDetailSummury() { /* mock */ }
    downloadDocument() { /* mock */ }
}

class MockSnackBarService {
    openSnackBar() { /* mock */ }
}

describe('FundDocumentComponent', () => {
  let component: FundDocumentComponent;
  let fixture: ComponentFixture<FundDocumentComponent>;
  let transactionService: TransactionService;
  let snackbarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundDocumentComponent ],
      imports: [
        MatIconModule,
        MatTooltipModule
      ],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: SnackbarService, useClass: MockSnackBarService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDocumentComponent);
    transactionService = TestBed.inject(TransactionService);
    snackbarService = TestBed.inject(SnackbarService);
    component = fixture.componentInstance;
    component.fundDetails = MockFundDetailData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFundDocument on change', () => {
    const spy = jest.spyOn(component, 'getFundDocument');
    jest.spyOn(transactionService, 'getFundDetailSummury').mockReturnValue(of(MockFundSummuryDetail));
    const changes: SimpleChanges = {
        fundDetails: {
            previousValue: null,
            currentValue: MockFundDetailData,
            firstChange: true,
            isFirstChange: () => { return true },
        }
    }

    component.ngOnChanges(changes);

    expect(spy).toHaveBeenCalledWith(MockFundDetailData);
  });

  it('should get all fund document', (done) => {
    jest.spyOn(transactionService, 'getFundDetailSummury').mockReturnValue(of(MockFundSummuryDetail));
    component.getFundDocument(MockFundDetailData).subscribe(res => {
        expect(res).toBe(MockFundSummuryDetail.fundDocument);
        done();
    })
  });

  it('should download the fund document', fakeAsync(() => {
    jest.spyOn(transactionService, 'downloadDocument').mockReturnValue(of(new Blob()));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();
    const spy = jest.spyOn(snackbarService, 'openSnackBar');

    component.downloadDocument(MockFundSummuryDetail.fundDocument[0]);

    flush();
    tick(1000);

    expect(spy).toHaveBeenCalled();
  }));

  it('should not download the fund document when error happen', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
        error: 'no fund doc found',
        status: 402
    });
    jest.spyOn(transactionService, 'downloadDocument').mockReturnValue(throwError(errorResponse));
    const spy = jest.spyOn(snackbarService, 'openSnackBar');

    component.downloadDocument(MockFundSummuryDetail.fundDocument[0]);
    tick(500);

    expect(spy).toHaveBeenCalledWith('Fund document failed to download. Please try again.', 'warning');
  }))

});
