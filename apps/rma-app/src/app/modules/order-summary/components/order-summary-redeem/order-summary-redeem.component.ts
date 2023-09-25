import { Component } from '@angular/core';
import { redeemSource } from './../dummyData';
@Component({
    selector: 'cimb-office-order-summary-redeem',
    templateUrl: './order-summary-redeem.component.html',
    styleUrls: ['./order-summary-redeem.component.scss'],
})
export class OrderSummaryRedeemComponent {
    panelOpenState = true;
    redeemSource = redeemSource as any[];
}
