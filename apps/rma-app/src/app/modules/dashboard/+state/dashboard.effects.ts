import { Injectable } from '@angular/core';
import { CoreService, loadingBarActions } from '@cimb/mint-office';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StorageService } from 'libs/mint-office/src/lib/core/services/storage.service';
import { exhaustMap, filter, finalize, map } from 'rxjs/operators';
import { DashboardService } from './../services/dashboard.service';
import * as DashboardActions from './dashboard.actions';
import { Customer, IRmDetails, ITransaction } from './dashboard.models';

@Injectable()
export class DashboardEffects {
    /* istanbul ignore next */
    getTransaction$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DashboardActions.getTransaction),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.dashboardService.getTransaction(action.data).pipe(
                    map((data: ITransaction) => {
                        return DashboardActions.transactionSuccesss({transaction:data});
                    }),
                    
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });


    getRmDetail$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DashboardActions.getRmDetail),
            filter(x => !!x.data),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.dashboardService.getRmDetail(action.data).pipe(
                    map((data: IRmDetails) => {
                        this.storageService.setItem('rmId', data.rmId)
                        return DashboardActions.getRmDetailSuccess({ rmDetail: data });
                    }),
                    
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    getAllCustomers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DashboardActions.getAllCustomer),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.coreService.getAllCustomers().pipe(
                    map((data: Customer[]) => {
                        return DashboardActions.allCustomer({ customer: data });
                    }),
                    
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    })

    constructor(
        private actions$: Actions,
        private dashboardService: DashboardService,
        private readonly storageService: StorageService,
        private coreService: CoreService,
        private readonly store: Store
    ) {

    }
}
