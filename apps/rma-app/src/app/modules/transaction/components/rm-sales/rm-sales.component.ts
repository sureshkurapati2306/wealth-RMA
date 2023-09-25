/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TransactionAction from '../../+state/transaction.actions';
import { Observable, Subject } from 'rxjs';
import { Branch, IRefferalTransactionForm, ISalesFormData } from '../../+state/transaction.models';
import { filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { branches, getSavedDraftDetailsResponse } from '../../+state/transaction.selectors';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import * as dashboardSelector from '../../../dashboard/+state/dashboard.selectors';
import { IRmDetails } from '../../../dashboard/+state/dashboard.models';
import { TransactionType } from '@cimb/mint-office';
@Component({
    selector: 'cimb-office-sales',
    templateUrl: './rm-sales.component.html',
    styleUrls: ['./rm-sales.component.scss'],
})

export class RmSalesComponent implements OnInit {
    panelOpenState = true;
    searchValue: UntypedFormControl = new UntypedFormControl('');
    refreeSerachKey: UntypedFormControl = new UntypedFormControl('');
    getSavedDraftDetailsResponse$ = this.store.select(getSavedDraftDetailsResponse);
    branches$: Observable<Branch[]> = this.searchValue.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.filterBranch(value as string))
    );

    getCurruntUserDetails$: Observable<IRmDetails | null> = this.store.select(dashboardSelector.getRmDetailsResponse).pipe(filter(details => !!details), map(detail => detail));

    refreeBranches$: Observable<Branch[]> = this.refreeSerachKey.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.filterBranch(value as string))
    );
    allBranches$: Observable<Branch[] | null | undefined> = this.store.select(branches).pipe(filter(branch => !!branch));

    @ViewChild(MatSelect) matSelect: MatSelect;

    transactionForm: UntypedFormGroup;
    salesForm: UntypedFormGroup;

    private _unsubscribeAll$: Subject<any> = new Subject<any>();

    constructor(
        private fb: UntypedFormBuilder,
        private readonly store: Store,
        private router: Router,
        private readonly transactionService: TransactionService,
    ) {
        this.store.dispatch(TransactionAction.fetchBranches());
    }

    ngOnInit(): void {
        this.transactionForm = this.fb.group({
            remarks: new UntypedFormControl(''),
            referralCode: new UntypedFormControl(''),
            referralName: new UntypedFormControl(''),
            referralBranch: this.refreeSerachKey,
        });

        this.salesForm = this.fb.group({
            salesBranch: this.searchValue,
            staffBranch: new UntypedFormControl('')
        });

        this.salesForm.valueChanges.pipe(
            takeUntil(this._unsubscribeAll$),
            tap(() => {
                this.store.dispatch(TransactionAction.salesFormData({
                    data: { formData: this.salesForm.value as ISalesFormData, isValid: this.salesForm.valid, isDirty: this.salesForm.dirty },
                }),
                )
            })).subscribe()

        this.transactionForm.valueChanges.pipe(
            takeUntil(this._unsubscribeAll$),
            tap(() => {
                this.store.dispatch(TransactionAction.referralTransactionFormData({
                    data: { formData: this.transactionForm.value as IRefferalTransactionForm, isDirty: this.transactionForm.dirty },
                }),
                );
            })).subscribe()

        this.getSavedDraftDetailsResponse$.pipe(
            takeUntil(this._unsubscribeAll$),
            filter(d => !!d),
            tap(res => {
                if (res && (this.router.url.includes('draft') || this.router.url.includes('edit'))) {
                    this.transactionForm.patchValue({
                        remarks: res.remarks,
                        referralCode: res.referralCode,
                        referralName: res.referralName,
                        referralBranch: res.referralBranch,
                    })

                    this.salesForm.patchValue({
                        salesBranch: res.salesBranch,
                        staffBranch: res.staffBranch,
                    })
                }
            })
        ).subscribe()

    }

    /* istanbul ignore next */
    filterBranch(value: string): Observable<Branch[]> {
        const valueArr = value ? value.split(' - ') : [];
        if (valueArr.length > 1) {
            value = valueArr[0];
        }
        return this.store.select(branches).pipe(
            takeUntil(this._unsubscribeAll$),
            filter(res => !!res),
            map(allBranches => {
                if (!branches || !allBranches) return [] as Branch[];
                return allBranches.filter((b: Branch) => {
                    if (!value) return allBranches
                    return b.branchCode.toLowerCase().includes(value.toLowerCase()) || b.branchName.toLowerCase().includes(value.toLowerCase())
                })

            })
        );
    }

    /* istanbul ignore next */
    clearSaleSearch(salesInput: HTMLInputElement, allBranches: Branch[], controlName: string): void {
        const selectedBranch = allBranches.filter(b => `${b.branchCode} - ${b.branchName}` === salesInput.value);
        if (selectedBranch.length === 0) {
            if (controlName === 'referrer') {
                this.refreeSerachKey.patchValue('');
            } else {
                this.searchValue.patchValue('');
            }
        }
    }

    isRefralEnable(): boolean {
        return this.transactionService.transactionType !== TransactionType.REEDEEM
    }

}
