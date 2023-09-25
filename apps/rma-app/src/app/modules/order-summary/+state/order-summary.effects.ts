import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import * as OrderSummaryApplicationAction from './order-summary.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from "rxjs";
import { OrderSummaryApiService } from '../services/order-summary.service';
import { Store } from '@ngrx/store';
import { loadingBarActions } from '@cimb/mint-office';
import { IGetOrderSummary, SendRemainder } from '../../risk-profile/models/risk-profile-summary.model';
import { RiskProfileService } from '../../risk-profile/services/risk-profile.service';
import { SnackbarService } from '../../transaction/services/snack-bar.service';
@Injectable()
export class OrderSummaryEffect {

    getOrderSummary$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OrderSummaryApplicationAction.getOrderSummaryData),
            exhaustMap((actions) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.orderSummaryApiService.getOrderSummary(actions.data).pipe(
                    map((response: IGetOrderSummary) => {
                        return OrderSummaryApplicationAction.getOrderSummaryDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(OrderSummaryApplicationAction.getOrderSummaryDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    postRemaindermassage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OrderSummaryApplicationAction.sendingRemainder),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.orderSummaryApiService.sendingRemainder(action.data).pipe(
                    map((response: SendRemainder) => {
                        this.snackbarService.openSnackBar('A reminder email has been sent to the approver.','success')
                        return OrderSummaryApplicationAction.sendingRemainderSuccess({data:response});
                    }),
                    catchError((error: HttpErrorResponse) => of(OrderSummaryApplicationAction.sendingRemainderFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )

            })
        )
    })

    orderActivatedApprovalLink$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OrderSummaryApplicationAction.orderActivatedApprovalLink),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.activateApprovalLink({id: action.data.transactionId}).pipe(
                    map((response) => {
                        return OrderSummaryApplicationAction.orderActivatedApprovalLinkSuccess({data: response});
                    }),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    constructor(
        private actions$: Actions,
        private orderSummaryApiService: OrderSummaryApiService,
        private riskProfileService: RiskProfileService,
        private snackbarService:SnackbarService,
        private readonly store: Store
    ){}
}
