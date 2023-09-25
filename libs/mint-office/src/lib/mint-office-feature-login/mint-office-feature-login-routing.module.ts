import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureLoginComponent } from './mint-office-feature-login.component';

const routes: Routes = [{ path: '', component: MintOfficeFeatureLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureLoginRoutingModule { }

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureLoginComponent];