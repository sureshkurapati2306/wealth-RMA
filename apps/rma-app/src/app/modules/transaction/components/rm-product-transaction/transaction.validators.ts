import { combineLatest } from 'rxjs';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Observable, of } from 'rxjs';
import {  AbstractControl, ValidationErrors } from "@angular/forms";
import {  first, map } from 'rxjs/operators';
import { ITotalFundAmount } from '../../+state/transaction.models';

export class CustomValidatorsTransactions{

    /* istanbul ignore next */
    static checkSubscriptionAmount(getValue: Observable<ITotalFundAmount | null>, errorEnable: Observable<boolean | undefined>) {
        return (control:AbstractControl) : Observable<ValidationErrors | null> => {
            const value = control.value as string;
            if (!value) {
                return of(null) as Observable<null>;
            }

            return combineLatest([
                errorEnable,
                getValue
            ]).pipe(map(([showError, res]) => {
                if(!showError) {
                    return null;
                }

                if(!res?.totalAmount) return null;

                const data = +res.totalAmount;
          
                if(!data) {
                    return null;
                }

                if(data < +value){
                    return { min: true }
                }

                if(data > +value){
                    return { max: true }
                }

                 return null
            })).pipe(first());
    }
}

}
 