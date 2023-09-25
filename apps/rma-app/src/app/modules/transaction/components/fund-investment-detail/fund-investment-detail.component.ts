import { Component, Input } from '@angular/core';
import { FundDetail } from '../../models/funds.model';

@Component({
  selector: 'cimb-office-fund-investment-detail',
  templateUrl: './fund-investment-detail.component.html',
  styleUrls: ['./fund-investment-detail.component.scss']
})
export class FundInvestmentDetailComponent {

    @Input() fundDetails: FundDetail;
}
