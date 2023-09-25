import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../../transaction/services/transaction.service';
import * as DashboardSelectors from '../../../dashboard/+state/dashboard.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRmDetails } from '../../../dashboard/+state/dashboard.models';

@Component({
    selector: 'cimb-office-app-status',
    templateUrl: './app-status.component.html',
    styleUrls: ['./app-status.component.scss'],
})
export class AppStatusComponent {

    public getRmResponse$: Observable<IRmDetails> = this.store.select(DashboardSelectors.getRmDetailsResponse);


    constructor(
        private readonly store: Store,
        private readonly transactionService: TransactionService,
        private readonly router: Router,
    ) {}

    filterHeadings = {
        date: "CREATION DATE",
        type: "TRANSACTION TYPE",
        status: "STATUS"
    }

    goToTransactionPage(data: {transactionId: string, cifNumber: string}): Promise<boolean> {

        this.transactionService.transactionId = data.transactionId;
        this.transactionService.cifNumber = data.cifNumber;

        return this.router.navigate(['/transaction', 'draft']);
      }
}
