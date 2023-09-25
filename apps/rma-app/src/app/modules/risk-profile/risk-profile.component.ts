/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CustomerResolver, RiskProfileRouteData } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { Breadcrumb, ICustomerDetails } from '../shared/models/breadcrumb.model';
import * as RiskProfileAction from './+state/risk-profile.action';

@Component({
  selector: 'cimb-office-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent implements OnInit {

    cifNumber: string;
    breadcrumbs: Breadcrumb[] = [
        {
            title: 'Risk Profiling',
            route: '',
        }
    ]

    customerDetails: ICustomerDetails = {
        route:'/customer',
        isEnable: true
      }      

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        private customerResolver: CustomerResolver
    ) {
        this.route.data.subscribe((res: Data) => {
            const cif = (res["riskProfileData"] as RiskProfileRouteData).cifNumber;
            this.cifNumber = cif ? cif : "";
        })
    }

    ngOnInit(): void {
        this.customerResolver.cifNumber = this.cifNumber;
        this.store.dispatch(RiskProfileAction.getRiskProfileInquiryDetail({
            data: {
                cifNumber: this.cifNumber,
                custName: "",
                custIdType: "",
                custIdNo: "",
                custIdIssue: ""
            }
        }))
    }
}
