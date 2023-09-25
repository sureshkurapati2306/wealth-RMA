import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as orderSummarySelector from '../../+state/order-summary.selectors';
import { filter } from 'rxjs/operators';
import { IGetOrderSummary } from '../../../risk-profile/models/risk-profile-summary.model';

@Component({
    selector: 'cimb-office-order-summary-common-table',
    templateUrl: './order-summary-common-table.component.html',
    styleUrls: ['./order-summary-common-table.component.scss'],
})
export class OrderSummaryCommonTableComponent {
    orderSummaryData$: Observable<IGetOrderSummary | undefined | null> = this.store.select(
        orderSummarySelector.orderSummaryResponse
      ).pipe(filter(d => !!d));

    @Input() dataSource:any;

    constructor(private store:Store){}


}
