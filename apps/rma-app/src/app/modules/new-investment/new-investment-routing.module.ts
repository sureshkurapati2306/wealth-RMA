import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewApplicationResolver } from '@cimb/mint-office';
import { CanDeactivateGuard } from '../shared/gaurds/can-deactivate.gaurd';
import { NewApplicationComponent } from './components/new-application/new-application.component';

const routes: Routes = [
    {
        path: '',
        component: NewApplicationComponent,
        resolve: {
          cifNumber: NewApplicationResolver
        },
        canDeactivate:[CanDeactivateGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewInvestmentRoutingModule { }
