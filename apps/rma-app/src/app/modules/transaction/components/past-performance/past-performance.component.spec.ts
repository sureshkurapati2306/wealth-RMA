import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MockFundDetailData } from '../../mock/fund-details.mock';
import { PastPerformanceComponent } from './past-performance.component';
import { TransactionService } from './../../services/transaction.service';
import { IPastPerformanceResponse } from '../../+state/transaction.models';
import { of } from 'rxjs';
class MockTransactionService {
  getPastPerformance() { /* mock */ }
}

describe('PastPerformanceComponent', () => {
  let component: PastPerformanceComponent;
  let fixture: ComponentFixture<PastPerformanceComponent>;
let transactionService: TransactionService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastPerformanceComponent ],
      imports: [
        MatIconModule
        ],
        providers: [
        {
            provide: TransactionService,
            useClass: MockTransactionService,
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    transactionService = TestBed.inject(TransactionService);
    fixture = TestBed.createComponent(PastPerformanceComponent);
    component = fixture.componentInstance;
    component.fundDetails = MockFundDetailData;
    fixture.detectChanges();
  });

  it('should create', () => {
    jest.spyOn(transactionService, 'getPastPerformance').mockReturnValue(of([] as IPastPerformanceResponse[]))
    component.fundDetails = MockFundDetailData;
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });
});
