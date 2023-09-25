/* eslint-disable sonarjs/cognitive-complexity */
import { ITotalFundAmount } from './../../+state/transaction.models';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors } from '@angular/forms'
import { Observable, of, combineLatest } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { ISearchFundData } from '../../+state/transaction.models';
import { ISalesChargeDropDowmResponse } from '../../models/sales-charge.model';

export class CustomValidators {

    /* istanbul ignore next */
    static salesCharge(dropDownValues: Observable<ISalesChargeDropDowmResponse[]>) {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            const form = control?.parent as UntypedFormGroup;

            if (!dropDownValues || !control || !form) {
                return of(null) as Observable<null>;
            }

            let value: number | string = control.value as string;

            if (value.endsWith('%')) {
                value = value.replace('%', '');
            }

            value = +value;

            return dropDownValues.pipe(
                take(1),
                filter(r => !!r),
                map(dropDowns => {

                    if (!dropDowns) return null;
                    const salesChargeSelectedValue = (form.get('salesChargeId') as UntypedFormControl).value as string;
                    const selectedDropDown = dropDowns.find(d => d.scId === salesChargeSelectedValue);

                    if (!selectedDropDown) {
                        return null;
                    }

                    if (selectedDropDown.rate && selectedDropDown.scId === 'default' && +value !== +selectedDropDown.rate) {
                        return { salesChargeError: true, requiredValue: selectedDropDown.rate };
                    }

                    return new CustomValidators().getError(selectedDropDown, value)

                }
                )).pipe(first());

        }

    }

    /* istanbul ignore next */
    static switchOutUnit(fund: ISearchFundData) {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value as string;
            if (!value) {
                return null;
            }

            if (value.includes(",")) {
                value = value.replace(/,/g, '')
            }

            const parent = control.parent as UntypedFormGroup;

            if (parent && parent.controls.switchAll.value) {
                return null;
            }

            if (fund && fund.details && fund.details.maxRealizationUnit && +value > fund.details.maxRealizationUnit) {
                return { maxSwitchOut: fund.details.maxRealizationUnit }
            }

            if (fund && fund.details && fund.details.minRealizationUnit && +value < fund.details.minRealizationUnit) {
                return { minSwitchOut: fund.details.minRealizationUnit }
            }

            return null;
        }

    }

    /* istanbul ignore next */
    static redeemUnit(fund: ISearchFundData) {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value as string;
            if (!value) {
                return null;
            }

            if (value.includes(",")) {
                value = value.replace(/,/g, '')
            }

            if (fund && fund.details && fund.details.maxRealizationUnit && +value > fund.details.maxRealizationUnit) {
                return { maxRedeem: fund.details.maxRealizationUnit }
            }

            if (fund && fund.details && fund.details.minRealizationUnit && +value < fund.details.minRealizationUnit) {
                return { minRedeem: fund.details.minRealizationUnit }
            }

            return null;
        }
    }

    /* istanbul ignore next */
    static getTotalTransactionAmount(totalTransactionAmountValue: Observable<number | null | undefined>, totalFundAmount: Observable<ITotalFundAmount | null>, fundDeatil: ISearchFundData) {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const value = control.value as string;

            if (!value) {
                return of(null) as Observable<null>;
            }

            const inputValue = +(value.replace(/,/g, ''));

            return combineLatest([
                totalTransactionAmountValue,
                totalFundAmount
            ]).pipe(
                map(([totalTransactionAmountValue, totalFundAmount]) => {
                    if (!totalTransactionAmountValue && totalFundAmount) return null
                    const data = value.split('.')

                    if (!value) {
                        return null;
                    }

                    if (
                        totalTransactionAmountValue && data && totalTransactionAmountValue < parseInt(data[0]) ||
                        totalTransactionAmountValue && totalFundAmount && totalTransactionAmountValue < +totalFundAmount?.totalAmount
                    ) {
                        return { transactionAmount: true }
                    }

                    if (fundDeatil.details) {
                        if (fundDeatil.details?.unitsHeld > 0) {
                            if (inputValue > fundDeatil.details.maxSubsequentSubscription) {
                                return { maxSubscription: true, value: fundDeatil.details.maxSubsequentSubscription }
                            }

                            if (inputValue < fundDeatil.details.minSubsequentSubscription) {
                                return { minSubscription: true, value: fundDeatil.details.minSubsequentSubscription }
                            }
                        } else {
                            if (inputValue > fundDeatil.details?.maxInitialSubscription) {
                                return { maxSubscription: true, value: fundDeatil.details.maxInitialSubscription }
                            }

                            if (inputValue < fundDeatil.details?.minInitialSubscription) {
                                return { minSubscription: true, value: fundDeatil.details.minInitialSubscription }
                            }
                        }
                    }



                    return null

                })
            ).pipe(first())


        }
    }

    /* istanbul ignore next */
    private getError(selectedDropDown: ISalesChargeDropDowmResponse, value: string | number) {
        if (selectedDropDown.minRate !== undefined && selectedDropDown.minRate !== null && selectedDropDown.maxRate !== undefined && selectedDropDown.maxRate !== null) {
            if (selectedDropDown.minRate > +value) {
                return { lessThen: true, requiredValue: selectedDropDown.minRate };
            } else if (selectedDropDown.maxRate < +value) {
                return { moreThen: true, requiredValue: selectedDropDown.maxRate };
            }
            return null;
        }

        return null;
    }
}


