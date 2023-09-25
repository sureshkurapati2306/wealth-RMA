import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MockFundDetailData } from '../../mock/fund-details.mock';

import { FundInvestmentDetailComponent } from './fund-investment-detail.component';

describe('FundInvestmentDetailComponent', () => {
  let component: FundInvestmentDetailComponent;
  let fixture: ComponentFixture<FundInvestmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundInvestmentDetailComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundInvestmentDetailComponent);
    component = fixture.componentInstance;
    component.fundDetails = MockFundDetailData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
