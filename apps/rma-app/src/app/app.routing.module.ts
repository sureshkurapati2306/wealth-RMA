/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeLayoutComponent } from './layouts/backoffice-layout/backoffice-layout.component';
import { AuthGuard } from '../../../../libs/mint-office/src/lib/core/guard/auth.guard';

const appRoutes: Routes = [
    {
        path: 'login',
        component: BackofficeLayoutComponent,
        loadChildren: () => import('@cimb/mint-office').then((m) => m.MintOfficeFeatureLoginModule),
    },
    {
        path: '',
        component: BackofficeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'customer',
                loadChildren: () =>
                    import('./modules/customer/customer.module').then((m) => m.CustomerModule),
            },
            {
                path: 'transaction',
                loadChildren: () =>
                    import('./modules/transaction/transaction.module').then(
                        (m) => m.TransactionModule,
                    ),
            },
            {
                path: 'new-application',
                loadChildren: () =>
                    import('./modules/new-investment/new-investment.module').then(
                        (m) => m.NewInvestmentModule,
                    ),
            },
            {
                path: 'orderSummary',
                loadChildren: () =>
                    import('./modules/order-summary/order-summary.module').then(
                        (m) => m.OrderSummaryModule,
                    ),
            },
            {
                path: 'risk-profile',
                loadChildren: () =>
                    import('./modules/risk-profile/risk-profile.module').then(
                        (m) => m.RiskProfileModule,
                    ),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true, scrollPositionRestoration: "enabled" })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
