import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CustomerSelector from '../../+state/customer.selector';
import * as CustomerAction from '../../+state/customer.action';
import  { Customer, MintOfficeSelectors } from '@cimb/mint-office';
import { Observable, Subject } from 'rxjs';
import { CustomerInvestment } from '../../models/customer.model';
import { takeUntil } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'cimb-office-total-portfolio',
  templateUrl: './total-portfolio.component.html',
  styleUrls: ['./total-portfolio.component.scss']
})
export class TotalPortfolioComponent implements OnInit, OnDestroy {

    getTotalInvestment$: Observable<CustomerInvestment | null | undefined> = this.store.select(CustomerSelector.customerInvestment);
    customer$: Observable<Customer | null> = this.store.select(MintOfficeSelectors.customer);
    private _unSubscriber$ = new Subject();
    constructor(
        private readonly store: Store,
    ) {}

    ngOnInit(): void {
        this.customer$.pipe(
            takeUntil(this._unSubscriber$)
        ).subscribe(customer => {
            if(customer && customer.cifNumber) {
                this.store.dispatch(CustomerAction.getCoustomerInvestment({ cifNumber: customer.cifNumber }));
            }
        });
    }

    transformDecimal(num: number): number | string {
        let result: number | string;
        switch (num) {
            case 0:
                result = 0;
                break;
            case null:
                result = '-';
                break;
            default:
               result = new DecimalPipe('en-US').transform(num, '1.2-2');
                break;
        }

        return result;
    }

    ngOnDestroy(): void {
        this._unSubscriber$.next(null);
        this._unSubscriber$.complete();
    }

}
