import { regionalDirectorForm } from './../../+state/transaction.selectors';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import {
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    ValidatorFn,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RiskProfileToRatingPipe } from '@cimb/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import * as TransactionAction from '../../+state/transaction.actions';
import { map } from 'rxjs/operators';
import { riskProfileInquiry, subscribeFunds, productTransactionForm, salesForm, switchInFundDeviationStatus } from '../../+state/transaction.selectors';
import { TransactionService } from '../../services/transaction.service';
import { TransactionType } from '@cimb/mint-office';

@Component({
    selector: 'cimb-office-acknowledgement',
    templateUrl: './rm-acknowledgement.component.html',
    styleUrls: ['./rm-acknowledgement.component.scss'],
})
export class RmAcknowledgementComponent implements OnInit {
    indeterminate = false;
    labelPosition: 'before' | 'after' = 'after';

    acknowledgementForm: UntypedFormGroup;
    productTransactionForm$ = this.store.select(productTransactionForm);
    salesForm$ = this.store.select(salesForm);
    reginalDirectorFrom$ = this.store.select(regionalDirectorForm);

    @Input() fundsInvalid: boolean;
    @Input() isAdHocSelected: boolean;
    constructor(
        private readonly store: Store,
        private _fb: UntypedFormBuilder,
        private readonly transactionService: TransactionService,
        private _cdr: ChangeDetectorRef,
    ) {
        this.acknowledgementForm = this._fb.group({
            terms: this._fb.array([], this.minAcknowledgement() as ValidatorFn),
        });
    }

    ngOnInit(): void {
        this.acknowledgementForm.valueChanges.pipe(
            map((data: {terms: string[]}) => {
                this.store.dispatch(TransactionAction.acknowledgeFormdata({
                    data: { isValid: this.acknowledgementForm.valid && this.hasValidData(data.terms), isDirty: this.acknowledgementForm.dirty },
                }),
                );
            })).subscribe()

        this.productTransactionForm$.pipe(
            map(p => {
                if(!p?.isValid) {
                    this.acknowledgementForm.reset();
                }
            })
        ).subscribe()

        this.salesForm$.pipe(
            map(s => {
                if(!s?.isValid) {
                    this.acknowledgementForm.reset()
                }
            })
        ).subscribe()
    }

    getDeviationStatus(): Observable<boolean | undefined | null> {
        if(this.transactionService.transactionType === TransactionType.SWITCH) {
            return this.store.select(switchInFundDeviationStatus);
        }

        return combineLatest([
            this.store.select(riskProfileInquiry),
            this.store.select(subscribeFunds),
        ]).pipe(
            map(([riskProfile, funds]) => {
                let deviationEnable = false;
                funds?.forEach((f) => {
                    if (
                        +new RiskProfileToRatingPipe().transform(riskProfile?.riskProfile ? riskProfile?.riskProfile : '0') <
                        ((f && f.details && f.details.riskRating) ? f.details?.riskRating : 0)
                    ) {
                        deviationEnable = true;
                    }
                });
                return deviationEnable;
            }),
        );
    }

    get termsArray(): UntypedFormArray {
        return this.acknowledgementForm.get('terms') as UntypedFormArray;
    }

    /* istanbul ignore next */
    removeTerm(target: string): void {
        const item = this.termsArray.controls.findIndex((x) => x.value === target);
        if (item >= 0) {
            this.termsArray.removeAt(item);
        }
    }

    /* istanbul ignore next */
    onChangeAcknowledment(event: MatCheckboxChange): void {
        if (event.checked) {
            this.termsArray.push(new UntypedFormControl(event.source.value));
        } else {
            this.removeTerm(event.source.value);
        }

        if (event.checked && event.source.value !== 'Y') {
            this.removeTerm('Y');
        }

        if (event.checked && event.source.value === 'Y') {
            ['N1', 'N2', 'N3'].forEach((r) => this.removeTerm(r));
        }
    }

    minAcknowledgement(): any {
        const validator: any = (formArray: UntypedFormArray) => {
            return formArray.length >= 1 ? null : { required: true };
        };

        return validator;
    }

    hasValidData(data: string[]) : boolean{
        return data.includes('Y') || data.includes('N1') || data.includes('N2') || data.includes('N3')
    }
}
