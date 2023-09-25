import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RiskProfileResolver, RiskProfileSummaryResolver } from '@cimb/mint-office';
import { CanDeactivateGuard } from '../shared/gaurds/can-deactivate.gaurd';
import { RiskProfileDetailComponent } from './components/risk-profile-detail/risk-profile-detail.component';
import { RiskProfileEditComponent } from './components/risk-profile-edit/risk-profile-edit.component';
import { RiskProfileSummaryComponent } from './components/risk-profile-summary/risk-profile-summary.component';
import { RiskProfileComponent } from './risk-profile.component';


const routes: Route[] = [
    {
        path: '',
        component: RiskProfileComponent,
        resolve: {
            riskProfileData: RiskProfileResolver
        },
        children: [
            {
                path: 'edit',
                component: RiskProfileEditComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: {
                    riskProfileData: RiskProfileResolver
                }
            },
            {
                path: 'detail',
                component: RiskProfileDetailComponent,
            },
            {
                path: 'summary',
                component: RiskProfileSummaryComponent,
                resolve: {
                    riskProfileSummaryData: RiskProfileSummaryResolver
                },
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RiskProfileRoutingModule { }
