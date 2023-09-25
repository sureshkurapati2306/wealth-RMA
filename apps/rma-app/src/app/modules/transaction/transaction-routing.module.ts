import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryResolver } from '@cimb/mint-office';
import { CanDeactivateGuard } from '../shared/gaurds/can-deactivate.gaurd';
import { TransactionResolver } from '../shared/resolvers/transaction.resolver';

import { TransactionComponent } from './transaction.component';

const routes: Routes = [
    {
        path: 'edit',
        component: TransactionComponent,
        resolve: {
            orderSummaryRouteData: OrderSummaryResolver
        },
        canDeactivate:[CanDeactivateGuard]
    },
    {
        path: 'draft',
        component: TransactionComponent,
        resolve: {
            transactionRouteData: TransactionResolver
        },
        canDeactivate:[CanDeactivateGuard]
    },
    {
        path: '',
        component: TransactionComponent,
        resolve: {
            transactionRouteData: TransactionResolver
        },
        canDeactivate:[CanDeactivateGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
