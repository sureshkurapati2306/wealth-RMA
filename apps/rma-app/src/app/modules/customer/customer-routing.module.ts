import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerResolver } from '@cimb/mint-office';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
        path:'',
        component: ProfileComponent,
        resolve: {
            customer: CustomerResolver
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
