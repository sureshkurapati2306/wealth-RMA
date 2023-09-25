import { Component } from '@angular/core';
import { SwitchSource } from './../dummyData';
@Component({
    selector: 'cimb-office-order-summary-switch',
    templateUrl: './order-summary-switch.component.html',
    styleUrls: ['./order-summary-switch.component.scss'],
})
export class OrderSummarySwitchComponent {
    panelOpenState = true;
    dataSource = SwitchSource as any[];

}
