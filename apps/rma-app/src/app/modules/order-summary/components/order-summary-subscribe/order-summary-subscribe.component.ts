import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { subscribeSource, subscribe} from './../dummyData';
import * as orderSummarySelector from '../../+state/order-summary.selectors';
import { IGetOrderSummary } from '../../../risk-profile/models/risk-profile-summary.model';

@Component({
    selector: 'cimb-office-order-summary-subscribe',
    templateUrl: './order-summary-subscribe.component.html',
    styleUrls: ['./order-summary-subscribe.component.scss'],
})
export class OrderSummarySubscribeComponent {
    panelOpenState = true;
    subscribeSource = subscribeSource as any[]
    subscribe = subscribe as any[];

    constructor(private store: Store){}

    orderSummaryData$: Observable<IGetOrderSummary | null | undefined> = this.store.select(
        orderSummarySelector.orderSummaryResponse
      ).pipe(filter(d => !!d));
}
