import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NewAccountSearchCustomerComponent } from './components/new-account-search-customer/new-account-search-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  { path: 'new-account-search-customer', component: NewAccountSearchCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeDashboardRoutingModule { }
