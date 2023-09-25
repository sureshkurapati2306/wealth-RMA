import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderSummarySwitchComponent } from './order-summary-switch.component';

describe('CustomerDetailsComponent', () => {
  let component: OrderSummarySwitchComponent;
  let fixture: ComponentFixture<OrderSummarySwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSummarySwitchComponent ],
      imports: [
          CommonModule,
          MatExpansionModule,
          MatDividerModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatTooltipModule,
          BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummarySwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
