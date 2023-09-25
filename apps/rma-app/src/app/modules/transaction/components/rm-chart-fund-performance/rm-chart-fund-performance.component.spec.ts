import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RmChartFundPerformanceComponent } from './rm-chart-fund-performance.component';
import { TransactionService } from './../../services/transaction.service';
class MockTransactionService {
  getPerformanceChart() { /* mock */ }
}

describe('RmChartFundPerformanceComponent', () => {
  let component: RmChartFundPerformanceComponent;
  let fixture: ComponentFixture<RmChartFundPerformanceComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmChartFundPerformanceComponent ],
      imports:[],
      providers: [TransactionService,
      {
          provide: TransactionService,
          useClass: MockTransactionService,
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmChartFundPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
