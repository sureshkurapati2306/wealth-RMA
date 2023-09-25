/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as dashboardActions from './+state/dashboard.actions';
import * as dashboardSelector from './+state/dashboard.selectors';
import { filter, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { IRmDetails, ITransactionReq } from './+state/dashboard.models';
import { AuthActions, authSelectors, MintOfficeActions, StorageService } from '@cimb/mint-office';
import { logout } from 'libs/mint-office/src/lib/core/models/auth.model';
import { TransactionService } from '../transaction/services/transaction.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
type JwtDecodeObject = { [key: string]: string };

@Component({
  selector: 'cimb-office-rm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

public getRmResponse$: Observable<IRmDetails> = this.store.select(dashboardSelector.getRmDetailsResponse);

  year: UntypedFormControl = new UntypedFormControl(new Date().getFullYear().toString());

  currentYear = new Date().getFullYear();
  currentDate = new Date();
  lanId = '';
  rmId: string;

  transactionYears: Array<number> = [
    this.currentYear - 2,
    this.currentYear - 1,
    this.currentYear,
  ];

  monthToDate$ = this.store.select(dashboardSelector.monthToDate);

  yearToDate$ = this.store.select(dashboardSelector.yearToDate);

  rmDetails$ = this.store.select(dashboardSelector.getRmDetailsResponse).pipe(filter(x => !!x));

  @HostListener('window:popstate', ['$event'])
  unloadNotification(event: PopStateEvent) {
    location.hash = '#/login';
    const data: logout = {
      refresh_token: this.storageService.getItem<string>('refresh_token'),
      isInactive: false,
      success: false
    };
    this.store.dispatch(AuthActions.loadLogout({ logout: data }));

  }


  constructor(
    private readonly storageService: StorageService,
    private store: Store,
    private readonly transactionService: TransactionService,
    private readonly router: Router
) { }

  ngOnInit(): void {
    this.resetCustomerState();
    this.getRmDetails();
    this.rmDetails$.pipe(
      map(res => {
        /* istanbul ignore if */
        if (res?.rmId) {
          this.rmId = res.rmId
        }
        this.getTransactionsYear();
      })
    ).subscribe()

  }

  /* istanbul ignore next */
  getTransactionsYear(): void {
    const rmId = this.rmId ? this.rmId : this.storageService.getItem<string>('rmId');
    const formData: ITransactionReq = {
      rmId: rmId ? rmId : "",
      year: parseInt(this.year.value),
    };

    this.store.dispatch(dashboardActions.getTransaction({ data: formData }));
  }

  getRmDetails(): void {
    this.store
      .select(authSelectors.getToken)
      .pipe(
        tap((data: string | null) => {
          /* istanbul ignore if */
          if (data) {
            const token: JwtDecodeObject = jwt_decode(data);
            this.lanId = token.preferred_username;
            this.store.dispatch(dashboardActions.getRmDetail({ data: this.lanId }));
          }
        }),
      )
      .subscribe();
  }

  goToTransactionPage(data: {transactionId: string, cifNumber: string}): Promise<boolean> {

    this.transactionService.transactionId = data.transactionId;
    this.transactionService.cifNumber = data.cifNumber;

    return this.router.navigate(['/transaction', 'draft']);
  }

  resetCustomerState() {
    this.store.dispatch(MintOfficeActions.resetCustomerState())
  }
}
