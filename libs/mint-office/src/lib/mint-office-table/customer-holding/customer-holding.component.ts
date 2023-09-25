import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { applicationHoldingErrorResponse, applicationHoldingResponse } from '../+state/transaction.selector';
import { ProductType } from '../models/application-status.model';
import { InvestmentTransaction, ITransactionFunds, IFundStatus } from '../models/customer-holding.model';
import * as TransactionAction from '../+state/transaction.action';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionType } from '../../core/models/transaction-route-data.model';
import * as _ from 'lodash';
import { Customer, CustomerProfile } from '../../core/models/customer.model';

@Component({
    selector: 'cimb-office-customer-holding',
    templateUrl: './customer-holding.component.html',
    styleUrls: ['./customer-holding.component.scss']
})
export class CustomerHoldingComponent implements OnInit {
    fundStatus = IFundStatus;
    selectedFunds: ITransactionFunds;
    subscription: Subscription = new Subscription();
    @Input() isProfileExpired$: boolean;
    @Input() isUserBlock$: boolean;
    @Input() customer$: Customer;
    @Input() customerProfile$: CustomerProfile;

    @Input() displayedColumns: string[] = ['name', 'investcost', 'unitsheld', 'nav', 'market', 'roi'];
    @Input() pageSize = 5;
    @Output() fundAvailable: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() fundDetailRedirection: EventEmitter<ITransactionFunds> = new EventEmitter<ITransactionFunds>();
    @Output() goToTransaction: EventEmitter<any> = new EventEmitter();

    productTypeOtion = ProductType;
    datasource: MatTableDataSource<ITransactionFunds> = new MatTableDataSource();
    length$ = new BehaviorSubject<number>(0);
    customerHoldingFilter: UntypedFormGroup = this._fb.group({
        productType: [ProductType.UT],
        investmentType: ['C'],
        utAccountNo: ['640826135254'],
        pageNo: [0],
        pageSize: [this.pageSize],
        sortingFieldsOrder: [['fundName.asc']],
    });
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    cifNumber: string ;
    constructor(
        private readonly _fb: UntypedFormBuilder,
        private readonly store: Store,
        private readonly _cdr: ChangeDetectorRef,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activateRoute.data.subscribe(res => this.cifNumber = res.cifNumber as string);
    }

    loadData(): void {
        this.subscription.unsubscribe();
        this.selectedFunds;
        this.store.dispatch(TransactionAction.getInvestmentTransaction({
            data: this.customerHoldingFilter.value as InvestmentTransaction
        }))
    }

    get f(): { [key: string]: AbstractControl } {
        return this.customerHoldingFilter.controls;
    }

    /* istanbul ignore next */
    ngOnInit(): void {
        this.loadData();

        combineLatest([
            this.store.select(applicationHoldingResponse),
            this.store.select(applicationHoldingErrorResponse)
        ]).pipe(
            tap(([data, error]) => {
                if(error) {
                    this.length$.next(0);
                    this.fundAvailable.emit(false);
                } else if(data) {
                    this.length$.next(data.totalRecords);
                    this.datasource = new MatTableDataSource(data.funds);
                    this.fundAvailable.emit(data.totalRecords > 0);
                    if(data.totalRecords === 0) {
                        this.datasource.data = [];
                    }
                    this._cdr.detectChanges();
                }
            })
        ).subscribe();
    }


    setProductType(productType: ProductType): void {
        this.customerHoldingFilter.controls.productType.patchValue(productType);
        this.loadData();
    }

    sortData(sort: Sort): void {
        if (!sort.direction) {
           this.sort.direction = sort.direction = 'asc';
        }
        this.f.pageNo.patchValue(0);
        switch (sort.active) {
            case 'name':
                this.f.sortingFieldsOrder.patchValue([`fundName.${sort.direction}`]);
                break;
            case 'nav':
                this.f.sortingFieldsOrder.patchValue([`navPrice.${sort.direction}`]);
                break;
            case 'roi':
                this.f.sortingFieldsOrder.patchValue([`roi.${sort.direction}`]);
                break;
        }
        this.paginator?.firstPage();
        this.loadData();
    }

    paginate(): void {
        const { pageSize, pageIndex } = this.paginator;
        this.customerHoldingFilter.patchValue({ pageSize: pageSize, pageNo: pageIndex });
        this.loadData();
    }

    public selectFund(fund: ITransactionFunds): void {
        this.selectedFunds = fund;
    }

    public redirectToFundDetails(row: ITransactionFunds): void {
       this.fundDetailRedirection.emit(row);
    }

    goToTransactionPage(source: string, ): void {
        const customerType: string = this.customer$.customerType as string;
        if(customerType === 'NTP') {
            source = 'new';
        }
        const obj: any = {
            cifNumber: this.cifNumber,
            transactionType: source as TransactionType,
            fundCodes: [this.selectedFunds?.fundCode],
        }

        this.goToTransaction.emit(obj);

    }

    enableCtaStatus(selectedFunds:ITransactionFunds): boolean {

        const pledgeUnits = !!selectedFunds.pledgeUnit && selectedFunds.pledgeUnit > 0 ? selectedFunds.pledgeUnit : 0;
        const minHolding = !!selectedFunds.minHolding && selectedFunds.minHolding > 0 ? selectedFunds.minHolding : 0;
        const revisedUnits = selectedFunds.holdingUnit-pledgeUnits-minHolding;
        const minRealizationUnits = !!selectedFunds.minRealizationUnit && selectedFunds.minRealizationUnit > 0 ? +selectedFunds.minRealizationUnit : 0;
        const inSufficientFund = revisedUnits >= minRealizationUnits;

        return !!(inSufficientFund || revisedUnits > 0);
    }

    /* istanbul ignore next */
    isTransactionPossible(buttonFlag: 'S' | 'W' | 'R'): boolean {

        if(
            !this.customerProfile$.licenseValidity ||
            this.customerProfile$.casaStatus !== 'Y' ||
            (this.customerProfile$.category === 'NTP' && buttonFlag !== 'S') ||
            this.isProfileExpired$ ||
            this.isUserBlock$ ||
            !this.selectedFunds ||
            this.selectedFunds.fundStatus === 'C' ||
            this.selectedFunds.fundStatus === 'D'
        ) {
            return false;
        }

        let buttonDisable = true;
        if(buttonFlag === 'S' && this.selectedFunds.subscribeFlag === "Y" ) {
            buttonDisable = false;
        }

        if(buttonFlag === 'W' && this.selectedFunds.switchOutFlag === "Y"  && this.enableCtaStatus(this.selectedFunds)) {
            buttonDisable = false;
        }

        if(buttonFlag === 'R' && this.selectedFunds.redeemFlag === "Y"  && this.enableCtaStatus(this.selectedFunds)) {
            buttonDisable = false;
        }

        return !buttonDisable;
    }
}
