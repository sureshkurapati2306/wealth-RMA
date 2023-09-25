import { CommonModule, DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CustomerChartComponent } from '../customer-chart/customer-chart.component';
import { TotalPortfolioComponent } from './total-portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CustomerInvestmentMock } from '../../mock/customer-state.mock';
import { of } from 'rxjs';

// Need to disable it here otherwise we need to create the complete Object for google map
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
window['google'] = {
    visualization:  {
        NumberFormat: class {
            constructor() {
                /* mock */
            }
        }
    },
} as  any;

describe('TotalPortfolioComponent', () => {
  let component: TotalPortfolioComponent;
  let fixture: ComponentFixture<TotalPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPortfolioComponent, CustomerChartComponent ],
      imports: [
            CommonModule,
            MatCardModule,
            MatDividerModule,
            BrowserAnimationsModule,
            StoreModule.forRoot({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPortfolioComponent);
    component = fixture.componentInstance;
    component.getTotalInvestment$ = of(CustomerInvestmentMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call transformDecimal for 0', () => {
    component.transformDecimal(0);
    const result = 0;

    expect(component.transformDecimal(0)).toBe(result)

  })

  it('should to call transformDecimal for null', () => {
    component.transformDecimal(null);
    const result = '-'

    expect(component.transformDecimal(null)).toBe(result)

  })

  it('should to call transformDecimal for default', () => {
    component.transformDecimal(108000);
    const result = new DecimalPipe('en-US').transform(108000, '1.2-2');

    expect(component.transformDecimal(108000)).toBe(result)

  })
});
