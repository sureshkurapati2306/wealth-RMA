import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TransactionAction from './transaction.action';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { TransactionDataResponseDTO } from '../models/application-status.model';
import { of } from 'rxjs';
import { TableService } from '../services/table.service';
import { ITransactionList } from '../models/customer-holding.model';
import { loadingBarActions } from '@cimb/mint-office';

@Injectable()
export class TransactionEffects {

    transection$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.transactionStart),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.tableService.getTransaction(action.data).pipe(
                    map((response: TransactionDataResponseDTO) => {
                        this.store.dispatch(TransactionAction.transactionFailure(
                            { data : "" }
                        ))
                        return TransactionAction.transactionSuccess({ data: response })
                    }),
                    catchError((error) => of(TransactionAction.transactionFailure({ data : error as string}))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),

                )
            }),

        );
    });

    getInvestmentTransaction$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.getInvestmentTransaction),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.tableService.getInvestmentTransaction(action.data).pipe(
                    map((data: ITransactionList) => {
                        return TransactionAction.investmentTransactionSuccess({data});
                    }),
                    catchError((error) => of(TransactionAction.investmentTransactionError({ data : error as string}))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly tableService: TableService
    ) { }
}
