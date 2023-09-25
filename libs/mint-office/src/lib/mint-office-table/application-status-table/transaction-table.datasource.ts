import { DataSource } from "@angular/cdk/collections";
import { Store } from "@ngrx/store";
import * as TransactionAction from '../+state/transaction.action';
import { Transaction, TransactionDataRequestDTO } from "../models/application-status.model";
import { map } from "rxjs/operators";
import { applicationStatusErrorResponse, applicationStatusResponse } from "../+state/transaction.selector";
import { BehaviorSubject, combineLatest } from "rxjs";

export class TransactionDataSource implements DataSource<Transaction> {

    public totaltransaction = 0;
    public isLoadingFinshed = new BehaviorSubject<boolean>(true);

    constructor(
        private store: Store
    ) {}

    /* istanbul ignore next */
    connect() {
        return combineLatest([
            this.store.select(applicationStatusResponse),
            this.store.select(applicationStatusErrorResponse)
        ]).pipe(
            map(([data, error]) => {
                this.isLoadingFinshed.next(true);
                if(error) {
                    this.totaltransaction = 0;
                    return []
                } else if(data) {
                    this.totaltransaction = data.totalRecords;
                    return data.transactions;
                }
                return []
            })
        )
    }

    disconnect(): void {
        console.log('transaction table disconnected')
    }

    loadLession(data: TransactionDataRequestDTO): void {
        this.isLoadingFinshed.next(false);
        const typeIndex = (data.transactionType as any[]).indexOf(0);
        if(typeIndex > -1) {
            data.transactionType.splice(typeIndex, 1)
        }
        const statusIndex = (data.transactionStatus as any[]).indexOf(0);
        if(statusIndex > -1) {
            data.transactionStatus.splice(statusIndex, 1)
        }
        this.store.dispatch(TransactionAction.transactionStart({
            data: data
        }))
    }
}
