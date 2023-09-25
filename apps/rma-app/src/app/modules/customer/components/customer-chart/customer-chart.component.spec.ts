import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { GoogleChartsModule } from 'angular-google-charts';
import { CustomerChartComponent } from './customer-chart.component';

// need to disable here other-wise it is asking to make a complete object of google map which is not necessary
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

describe('CustomerChartComponent', () => {
  let component: CustomerChartComponent;
  let fixture: ComponentFixture<CustomerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerChartComponent ],
      imports:[
          CommonModule,
          MatDatepickerModule,
          MatNativeDateModule,
          GoogleChartsModule,
          BrowserAnimationsModule,
          StoreModule.forRoot({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
