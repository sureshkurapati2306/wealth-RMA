import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadingBarActions } from '@cimb/mint-office';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store, createAction } from '@ngrx/store';
import { ICustomerProfileData } from 'apps/rma-app/src/app/modules/new-investment/model/new-investment.model';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, finalize, switchMap } from 'rxjs/operators';
import { APPROVER } from '../models/funds.model';
import { IRiskProfileInquiryResponse } from '../models/risk-profile.model';
import { ISalesChargeDropDowmResponse } from '../models/sales-charge.model';
import { TransactionService } from '../services/transaction.service';
import * as TransactionAction from './transaction.actions';
import { Branch, IFundDataResponse, ITransactionAppResponse, SettlementAccount, ISearchFundData } from './transaction.models';


@Injectable()
export class TransactionEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private readonly transactionService: TransactionService,
    ) { }

    searchFunds$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.getSearchFunds),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.getSearchFunds(action.data).pipe(
                    map((response: IFundDataResponse) => {
                        return TransactionAction.getSearchFundsSuccess({ data: response }) as Action;
                    }),
                    catchError((error) => of(TransactionAction.getSearchFundsFailure({ data: error as string }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),

                );
            }),
        );
    });

    fetchBranches$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.fetchBranches),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.getAllBranches().pipe(
                    map((data: Branch[]) => {
                        return TransactionAction.getBranches({ branches: data }) as Action;
                    }),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            })
        )
    });


    getRiskProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.riskProfileEnqiryRequest),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.getRiskProfileInquiry(action.data).pipe(
                    map((response: IRiskProfileInquiryResponse) => {
                        return TransactionAction.riskProfileEnqiry({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(TransactionAction.riskProfileEnqiryFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    createApplication$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.createApplication),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.createApplication(action.data).pipe(
                    map((response: ITransactionAppResponse) => {
                        return TransactionAction.createApplicationSuccess({ data: response }) as Action;
                    }),
                    catchError((error) => of(TransactionAction.createApplicationFailure({ data: error as string }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),
        );
    });


    getActiveApprovers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.fetchActiveApprover),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.getActiveApprover().pipe(
                    map((response: APPROVER[]) => {
                        return TransactionAction.activeApprover({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(TransactionAction.fetchActiveApproverFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    deleteCustomerDraft$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.deleteCustomerDraft),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.deleteCustomerDraft(action.data.transactionId).pipe(
                    map((response) => {
                        return TransactionAction.deleteCustomerDraftSuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(TransactionAction.deleteCustomerDraftFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    getDraftTransactionIdDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.getDraftTransactionIdDetails),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.getDraftTransactionIdDetails(action.data).pipe(
                    map((response) => {
                        return TransactionAction.getDraftTransactionIdDetailsSuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(TransactionAction.getDraftTransactionIdDetailsFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    getSalesChargeDropDown$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.getSalesChargeDropDown),
            exhaustMap((action) => {
                return this.transactionService.getSalesChargeDropDown(action.data).pipe(
                    map((response) => {
                        const map = new Map<string, ISalesChargeDropDowmResponse[]>();
                        if (action.data.fundCode) {
                            map.set(action.data.fundCode, response);
                        }
                        return TransactionAction.salesChargeDropDownValues({ data: map })
                    }),

                )
            })
        )
    });

    getSwitchOutFunds$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.getSwitchOutFunds),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                const responseMap = new Map<string, ISearchFundData[]>();
                return this.transactionService.getSwitchOutFunds(action.data).pipe(
                    map((response) => {
                        responseMap.set(action.data.fundCode, response);
                        return TransactionAction.switchOutFunds({ data: responseMap });
                    }),
                    catchError(() => {
                        return of(TransactionAction.switchOutFunds({ data: responseMap }));
                    }),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            })
        )
    })

    getNondefaultAccount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionAction.getNonDefaultAccount),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.transactionService.getNonDefaultAccount(action.payload).pipe(
                    map((response) => {
                        return TransactionAction.getNonDefaultAccountSuccess({ data: response })}),
                        catchError((error: HttpErrorResponse) => of(TransactionAction.getNonDefaultAccountFailure({ data: error.message }))),

                        finalize(() => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                        }),

                )
            })
        )
    })

}

