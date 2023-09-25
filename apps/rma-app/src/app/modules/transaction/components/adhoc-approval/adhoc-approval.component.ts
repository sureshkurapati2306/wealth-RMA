import { getNonDefaultCasaAccount } from './../../+state/transaction.selectors';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, concat, Observable, of } from 'rxjs';
import { activeApprovers } from '../../+state/transaction.selectors';
import { APPROVER } from '../../models/funds.model';
import * as Action from '../../+state/transaction.actions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cimb-office-adhoc-approval',
  templateUrl: './adhoc-approval.component.html',
  styleUrls: ['./adhoc-approval.component.scss']
})
export class AdhocApprovalComponent implements OnInit {

    selectedApprover: APPROVER;

    searchValue = new UntypedFormControl('');

    public _allApprovers$: Observable<APPROVER[] | null> = this.store.select(activeApprovers);

    approvers$: Observable<APPROVER[]>;

    getNonDefaultAccount$ = this.store.select(getNonDefaultCasaAccount);

    constructor(
        private readonly store: Store
    ) {
        this.store.dispatch(Action.fetchActiveApprover());
    }

    ngOnInit(): void {
        this.approvers$ = this.getApprovers();
    }

    getApprovers(): Observable<APPROVER[]> {
        return combineLatest([
            this._allApprovers$,
            concat(of(null), this.searchValue.valueChanges)
        ]).pipe(map(([approvers, value]) => {
            approvers = approvers ? approvers?.slice().sort((a, b) => {
                if(a.approverName < b.approverName) { return -1; }
                if(a.approverName > b.approverName) { return 1; }
                return 0;
            }) : []
            return approvers ? approvers.filter((d) => {
                if(!value || typeof(value) !== 'string') return true
                return d.approverName.toLowerCase().startsWith(value.toLowerCase())
            }) : []
        }))
    }

    getSelectedOption(data: MatAutocompleteSelectedEvent): void {
        const approver = data.option.value as APPROVER;
        this.searchValue.patchValue(approver.approverName);
        this.store.dispatch(Action.getRegionalDirectorForm({ data: { isValid: this.searchValue.valid , isDirty: this.searchValue.dirty }}))
        this.selectedApprover = approver;
    }
}
