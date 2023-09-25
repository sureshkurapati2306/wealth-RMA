import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CustomerAction from './customer.action';
import { CustomerService } from "../services/customer.service";
import { catchError, exhaustMap, finalize, map } from "rxjs/operators";
import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { CUSTOMER, CustomerInvestment } from "../models/customer.model";
import { CoreService, loadingBarActions } from "@cimb/mint-office";
import { Customer } from "../../dashboard/+state/dashboard.models";
import { IRiskProfileInquiryResponse } from "../../transaction/models/risk-profile.model";


@Injectable()
export class CustomerEffect {

    constructor(
        private actions$: Actions,
        private readonly customerService: CustomerService,
        private coreService: CoreService,
        private readonly store: Store
    ) {}

    getRiskProfileInquiry$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CustomerAction.getRiskProfileInquiry),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.customerService.getRiskProfileInquiry(action.data).pipe(
                    map((response: IRiskProfileInquiryResponse) => {
                        return CustomerAction.getRiskProfileInqirySuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(CustomerAction.getRiskProfileInqiryFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    getAllCustomers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CustomerAction.getCoustomer),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.coreService.getAllCustomers().pipe(
                    map((data: Customer[]) => {
                        const c = data.find(d => d.cifNumber === action.cifNumber) as CUSTOMER;
                        return CustomerAction.customer({ data: c });
                    }),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    getCustomerInvestment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CustomerAction.getCoustomerInvestment),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.customerService.getTotalInvestment(action.cifNumber).pipe(
                    map((data: CustomerInvestment) => {

                        return CustomerAction.coustomerInvestmentSucess({ data: data });
                    }),
                    catchError((error: HttpErrorResponse) => of(CustomerAction.coustomerInvestmentError({ error: error.message }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    })

    updateCustomerEmail$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(CustomerAction.updateCustomerEmail),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.customerService.updateCustomerEmail(action.payload).pipe(
                    map(data => {
                        return CustomerAction.updateCustomerEmailSuccess({ data: data })
                    }),
                    catchError((error: HttpErrorResponse) => of(CustomerAction.updateCustomerEmailFailure({error: error.message})) ),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    })

    getSettingsParam$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(CustomerAction.getSettingsParam),
            exhaustMap(() => {
                return this.customerService.getSettingsParam().pipe(
                    map(data => {
                        return CustomerAction.getSettingsParamSuccess({ data: data })
                    }),
                    catchError((error: HttpErrorResponse) => of(CustomerAction.getSettingsParamFailure({error: error.message})) ),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    })

}
