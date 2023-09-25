import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { Customer } from '../../+state/dashboard.models';
import * as DashboardAction from '../../+state/dashboard.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { combineLatest, concat, of } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerResolver } from '@cimb/mint-office';

@Component({
    selector: 'cimb-office-customer-search-bar',
    templateUrl: './customer-search-bar.component.html',
    styleUrls: ['./customer-search-bar.component.scss']
})
export class CustomerSearchBarComponent {


    @Input() dashboardTemplate = true;
    searchValue: UntypedFormControl = new UntypedFormControl('');

    constructor(
        private store: Store,
        private actions$: Actions,
        private _router: Router,
        private readonly customerResolver: CustomerResolver
    ) {
        this.store.dispatch(DashboardAction.getAllCustomer());
    }


    customers$ = combineLatest([
        this.actions$.pipe(ofType(DashboardAction.allCustomer)),
        concat(of(null), this.searchValue.valueChanges)
    ]).pipe(map(([action, value]) => {
        return action.customer.filter((d) => {
            /* istanbul ignore if */
            if(!value) return true
            const cif = d.cifNumber;
            return d.coustomer.toLowerCase().startsWith((value as string).toLowerCase()) || (cif ? cif.startsWith(value as string) : "");
        })
    }))

    clearInput(): void {
        this.searchValue.patchValue('');
        this.searchValue.updateValueAndValidity();
    }
    /* istanbul ignore next */
    async getSelectedOption(data: MatAutocompleteSelectedEvent): Promise<void> {
        const v = data.option.value as string;
        this.customerResolver.cifNumber = v;
        await this._router.navigate(['customer']);
    }

    getNric(option: Customer): string {
        if(!option.id) return "";
        let nric = 'NRIC: *************';
        nric += option.id.substring(option.id.length - 4);
        return nric;
    }

}
