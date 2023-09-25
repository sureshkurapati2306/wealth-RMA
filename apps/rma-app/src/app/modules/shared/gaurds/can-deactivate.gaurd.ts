import {Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { isAuthenticated } from 'libs/mint-office/src/lib/mint-office-feature-login/+state/auth.selectors';
import { NewApplicationComponent } from '../../new-investment/components/new-application/new-application.component';
import { RiskProfileEditComponent } from '../../risk-profile/components/risk-profile-edit/risk-profile-edit.component';
import { TransactionComponent } from '../../transaction/transaction.component';

export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements CanDeactivate<TransactionComponent | NewApplicationComponent | RiskProfileEditComponent> {
isLoggedIn: boolean;

constructor(private store: Store){}

  canDeactivate(component: TransactionComponent | NewApplicationComponent | RiskProfileEditComponent): Observable<boolean> {
    const res = component.canDeactivate();
    this.store.select(isAuthenticated).pipe(
      map(res => this.isLoggedIn = res ? res : false)
    ).subscribe()

    return res && this.isLoggedIn ? component.dirtyCheckDialog() : of(true);
  }

}
