import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import * as OrderSummaryAction from './+state/order-summary.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Data } from '@angular/router';
import * as orderSummarySelector from './+state/order-summary.selectors';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderSummaryRouteData, StorageService } from '@cimb/mint-office';
import { IGetOrderSummary } from '../risk-profile/models/risk-profile-summary.model';
import { TransactionService } from '../transaction/services/transaction.service';
import { Breadcrumb, ICustomerDetails } from '../shared/models/breadcrumb.model';

@Component({
  selector: 'cimb-office-rm-transaction-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderSummaryComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    {
        title: 'Application',
        route: '',
    }
]

customerDetails: ICustomerDetails = {
  route:'/customer',
  isEnable: true
}

trxId: string;

  public orderSummaryRouteData: OrderSummaryRouteData;
  orderSummaryData$: Observable<IGetOrderSummary | null> = this.store.select(
    orderSummarySelector.orderSummaryResponse
  ).pipe(filter(d => !!d));

  constructor(
    private store: Store,
    private readonly activateRoute: ActivatedRoute,
    private transactionService: TransactionService,
    private storageService: StorageService

  ) {
    this.activateRoute.data.subscribe((res: Data) => {
      /* istanbul ignore if */
      if(res.orderSummaryRouteData) {
        this.orderSummaryRouteData = res["orderSummaryRouteData"] as OrderSummaryRouteData;
        this.transactionService.cifNumber = this.orderSummaryRouteData.cifNumber;
        this.transactionService.transactionId = this.orderSummaryRouteData.transactionId;
      } else {
        this.transactionService.cifNumber = this.storageService.getItem('cifNumber');
        this.transactionService.transactionId = this.storageService.getItem('transactionId');
      }

      this.trxId = this.transactionService.transactionId;
    });
  }

  ngOnInit(): void {
    const transactionRefId = this.storageService.getItem<string>('transactionRefId');
    if(transactionRefId)
      this.store.dispatch(OrderSummaryAction.getOrderSummaryData({data: transactionRefId}));
  }

  @HostListener('window:popstate', ['$event'])
  beforeUnload(event: PopStateEvent) {
      location.hash = '#/home'
  }

}
