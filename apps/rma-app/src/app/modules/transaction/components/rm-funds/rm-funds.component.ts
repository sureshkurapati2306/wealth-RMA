import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISearchFundData } from '../../+state/transaction.models';
import { Observable } from 'rxjs';
import { subscribeFunds } from '../../+state/transaction.selectors';
import * as TransactionAction from '../../+state/transaction.actions';
import { TransactionService } from '../../services/transaction.service';
import { FundCardComponent } from '../fund-card/fund-card.component';
import { FundCardStatus, FundRequestData } from '../../models/funds.model';
import * as _ from 'lodash-es'
import { tap } from 'rxjs/operators';

@Component({
    selector: 'cimb-office-funds',
    templateUrl: './rm-funds.component.html',
    styleUrls: ['./rm-funds.component.scss'],
})
export class RmFundsComponent {

    pageSize = 10;
    @Input() dataFromSearchFunds: ISearchFundData[] = [];
    @Output() removeFund: EventEmitter<ISearchFundData> = new EventEmitter<ISearchFundData>();
    @Output() fundDataChange: EventEmitter<FundCardStatus[]> = new EventEmitter<FundCardStatus[]>();
    private fundCardStatusMap:Map<string, FundCardStatus> = new Map();
    // @ViewChildren(FundCardComponent) fundCards: QueryList<FundCardComponent>;

    availableFunds$: Observable<ISearchFundData[] | null> = this.store.select(subscribeFunds);

    totalFundAmount: TotalFundAmount = {
        totalAmount: '0',
        salesChargeAmountTotal: '0',
        netinvestedAmountToal: '0'
    };


    constructor(
        private readonly store: Store,
        public readonly transactionService: TransactionService
    ) {}

    removeRecord(fund: ISearchFundData, availableFunds: ISearchFundData[]): void {
        this.openConfirmation(fund, availableFunds).subscribe();
    }

    openConfirmation(fund: ISearchFundData, availableFunds: ISearchFundData[]): Observable<any> {
        return this.transactionService.openFundRemoveConfirmation().pipe(
            tap((response) => {
                /* istanbul ignore else */
                if(response === 'Yes, Remove the Fund') {
                    this.removeFund.emit(fund);
                    const updatedFunds = availableFunds.filter(f => f.fundId !== fund.fundId);
                    this.store.dispatch(TransactionAction.subscribedFunds({ data: updatedFunds }));
                }
            })
        )
    }

    onFundDataChange(data: { fundCode:string, status: FundCardStatus }): void {
        this.fundCardStatusMap.set(data.fundCode, data.status);

        const allFunds: FundCardStatus[] = Array.from(this.fundCardStatusMap.values());
        let funds: FundRequestData[] = [];
        const fundAmount: TotalFundAmount = {
            totalAmount: '0',
            salesChargeAmountTotal: '0',
            netinvestedAmountToal: '0'
        };

        if(allFunds && allFunds.length > 0) {


            funds = _.map(allFunds, 'data');

            funds.forEach(f => {
                if(f.fundStatus === 'I') {
                    return;
                }
                if(f.totalAmount) {
                    let totalAmount = f.totalAmount as string;
                    totalAmount = totalAmount.replace(/,/g, '');
                    fundAmount.totalAmount = (+totalAmount + (+fundAmount.totalAmount)).toFixed(2);
                }

                if(f.salesChargeAmount) {
                    let salesChargeAmount = f.salesChargeAmount as string;
                    salesChargeAmount = salesChargeAmount.replace(/,/g, '');
                    fundAmount.salesChargeAmountTotal = (+salesChargeAmount + (+fundAmount.salesChargeAmountTotal)).toFixed(2);
                }
            })

            if(fundAmount.totalAmount && fundAmount.salesChargeAmountTotal) {
                fundAmount.netinvestedAmountToal = (+fundAmount.totalAmount - (+fundAmount.salesChargeAmountTotal)).toFixed(2);
            }
        }

        this.fundDataChange.emit(allFunds);

        this.totalFundAmount = fundAmount;
       this.store.dispatch(TransactionAction.getTotalAmountFund({ data: this.totalFundAmount }))
    }
}


interface TotalFundAmount {
    totalAmount: string;
    salesChargeAmountTotal: string;
    netinvestedAmountToal: string;
}
