import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RiskProfileResolver, RiskProfileSummaryResolver, CustomerResolver, StorageService, RiskProfileRouteData } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as riskProfileSummaryActions from '../../+state/risk-profile.action';
import * as riskProfileSummarySelector from '../../+state/risk-profile.selector';
import { IRiskProfileSummaryResponse } from '../../models/risk-profile-summary.model';

@Component({
  selector: 'cimb-office-risk-profile-summary',
  templateUrl: './risk-profile-summary.component.html',
  styleUrls: ['./risk-profile-summary.component.scss']
})
export class RiskProfileSummaryComponent implements OnInit, OnDestroy {
  panelOpenState = true;
  trx_id: string;
  cifNumber: string;

  customerApprovalLinkData$: Observable<IRiskProfileSummaryResponse | null> = this.store.select(riskProfileSummarySelector.riskProfileSummaryResponse);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private riskProfileResolver: RiskProfileResolver,
    private riskProfileSummaryResolver: RiskProfileSummaryResolver,
    private customerResolver: CustomerResolver,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    if(this.route.parent)
    this.route.parent.data.subscribe((res: Data) => {
        const cif = (res['riskProfileData'] as RiskProfileRouteData).cifNumber;
        this.cifNumber = cif ? cif : "";
    });

    this.route.data.subscribe((res: Data) => {
      this.trx_id = res["riskProfileSummaryData"] as string;

      if (this.trx_id) {
        this.store.dispatch(riskProfileSummaryActions.getRiskProfileSummary({ data: { transactionId: this.trx_id } }));
      } else {
        void this.router.navigate(['']);
      }
    })
  }

  gotoRiskProfileEdit(): void {
    this.riskProfileResolver.cifNumber = this.cifNumber;
    this.riskProfileResolver.trxId = this.trx_id
    this.riskProfileResolver.isEdit = true;
    void this.router.navigate(['risk-profile/edit']);
  }

  gotoCustomerProfile(): void {
    this.customerResolver.cifNumber = this.cifNumber;
    void this.router.navigate(['/customer'])
  }

  transformDate(date: string): string {
    if (date.length > 0) {
      return date.replace(/.{10}/g, '$&,');
    }
    return date;
  }

  ngOnDestroy(): void {
    this.storageService.deleteItem('transactionId');
    this.riskProfileResolver.trxId = null;
    this.riskProfileSummaryResolver.trxId = null;
  }

}
