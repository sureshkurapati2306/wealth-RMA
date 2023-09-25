import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Environment } from '@cimb/mint-office';
import { TransactionService } from '../transaction/services/transaction.service';
import { OrderSummaryComponent } from './order-summary.component';


describe('OrderSummaryComponent', () => {
    let component: OrderSummaryComponent;
    let fixture: ComponentFixture<OrderSummaryComponent>;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MatIconModule,
                HttpClientTestingModule,
                MatDialogModule,
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            declarations: [
                OrderSummaryComponent,
            ],
            providers: [
                TransactionService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: of({
                          cifNumber: '123',
                          transactionId: '37',
                          transactionRefId:'sep 06'
                        })
                    }
                },
                {
                    provide: 'environment', useValue: environment
                },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderSummaryComponent);
        component = fixture.componentInstance;
        component.orderSummaryRouteData = {
            cifNumber: '123',
            transactionId: '37',
            transactionRefId:'sep 06'
          }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call popstate', () => {
        const event = window.dispatchEvent(new Event('popstate'));
        component.beforeUnload({} as PopStateEvent);
      });
});
