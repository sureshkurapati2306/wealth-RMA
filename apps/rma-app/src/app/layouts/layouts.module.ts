/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackofficeLayoutComponent } from './backoffice-layout/backoffice-layout.component';
import { CimbCommonModule } from '@cimb/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MintOfficeFeatureLoginModule } from '@cimb/mint-office';


@NgModule({
  declarations: [
    BackofficeLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CimbCommonModule,
    MatButtonModule,
    MatSelectModule,
    MintOfficeFeatureLoginModule
  ],
  exports: [
    BackofficeLayoutComponent,
  ]
})
export class LayoutsModule { }
