import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderSummarySubscribeComponent } from './order-summary-subscribe.component';

describe('CustomerDetailsComponent', () => {
  let component: OrderSummarySubscribeComponent;
  let fixture: ComponentFixture<OrderSummarySubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSummarySubscribeComponent ],
      imports: [
          CommonModule,
          MatExpansionModule,
          MatDividerModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatTooltipModule,
          BrowserAnimationsModule,
          StoreModule.forRoot({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummarySubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
