import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as MintOfficeAction from './mint-office.actions';

import { CoreService } from "../services/core.service";
import { exhaustMap, filter, map } from "rxjs/operators";
import { Customer, CustomerProfile } from "../models/customer.model";


@Injectable()
export class MintOfficeEffect {

    constructor(
        private actions$: Actions,
        private readonly coreService: CoreService
    ) {}

    getCustomer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MintOfficeAction.getCoustomer),
            filter(action => !!action.cifNumber),
            exhaustMap((action) => {
                return this.coreService.getAllCustomers().pipe(
                    map((data: Customer[]) => {
                        const c = data.find(d => d.cifNumber === action.cifNumber);
                        return MintOfficeAction.customer({ data: c ? c : {} as Customer });
                    }),
                );
            }),
        );
    })

    getCustomerProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MintOfficeAction.getCoustomer),
            filter(action => !!action.cifNumber),
            exhaustMap((action) => {
                return this.coreService.getCoustomerProfile(action.cifNumber).pipe(
                    map((response: CustomerProfile) => {
                        return MintOfficeAction.customerProfile({ data: response });
                    }),
                )
            })
        )
    })

}
