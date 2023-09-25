import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryResolver } from '@cimb/mint-office';
import { OrderSummaryComponent } from './order-summary.component';


const routes: Routes = [
    {
        path: '',
        component: OrderSummaryComponent,
        resolve: {
          orderSummaryRouteData: OrderSummaryResolver
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSummaryRoutingModule { }
