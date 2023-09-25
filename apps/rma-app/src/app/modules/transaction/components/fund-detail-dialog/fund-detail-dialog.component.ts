import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface FundDetail {
    nav: number,
    fundName: string;
    fundStatus: string,
    fundId: number,
    fundCode: string;
    unitsHeld: number,
    pledgeUnit: number,
    returns: number,
    navDate?: string,
    totalInvested: number,
    fundIndicator: string,
    assetClass: string,
    riskRating: string,
    minInitialSubscription: number,
    maxInitialSubscription: number,
    minSubsequentSubscription: number,
    maxSubsequentSubscription: number,
    minHolding: number,
    maxRealizationUnit: number,
    minRealizationUnit: number,
    subscribeFlag: string,
    siFlag: string,
    redeemFlag: string,
    switchInFlag: string,
    switchOutFlag: string,
    colorCode?:string
}
interface DialogData {
    fundData: FundDetail;
    investmentEnable: boolean;
}
@Component({
  selector: 'cimb-office-fund-detail-dialog',
  templateUrl: './fund-detail-dialog.component.html',
  styleUrls: ['./fund-detail-dialog.component.scss']
})
export class FundDetailDialogComponent implements OnInit {

    fundDetails: FundDetail;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialogRef: MatDialogRef<FundDetailDialogComponent>,
    ) {}

    ngOnInit(): void {
        this.fundDetails = this.data.fundData;
    }

}
