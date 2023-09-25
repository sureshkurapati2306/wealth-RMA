/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { acknowledgeFormResponse, getNonDefaultCasaAccount, getSearchFormDirtyCheck, gettransactionAmountErrorEnableStatus, productTransactionForm, refferalFormResponse, salesForm, totalFundAmount } from './../../+state/transaction.selectors';

import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { getSavedDraftDetailsResponse, subscribeFunds } from '../../+state/transaction.selectors';
import * as TransactionAction from '../../+state/transaction.actions';
import { map, tap, filter, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RmSearchFundsComponent } from '../rm-search-funds/rm-search-funds.component';
import { INonDefaultAccount, IproductTransactionForm, ISearchFundData, ITotalFundAmount } from '../../+state/transaction.models';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { IGetTrxDetailResponse, IRmaTransactionDetail } from '../../models/risk-profile.model';
import { TransactionService } from '../../services/transaction.service';
import { CustomValidatorsTransactions } from './transaction.validators';
import { CustomerProfile,MintOfficeActions, MintOfficeSelectors, TransactionType } from '@cimb/mint-office';

@Component({
    selector: 'cimb-office-product-transaction',
    templateUrl: './rm-product-transaction.component.html',
    styleUrls: ['./rm-product-transaction.component.scss'],
})

export class RmProductTransactionComponent implements OnInit, OnDestroy {
    payloadNonDefaultAccount: INonDefaultAccount;

    productTransactionForm: UntypedFormGroup;
    private readonly viewValue: string = 'UT: 0003456789 (Joint - Or)';
    @ViewChild(MatSelect) matSelect: MatSelect;
    @ViewChild(RmSearchFundsComponent) rmSearch: RmSearchFundsComponent;
    @ViewChild('totalAmount') totalAmountDiv: ElementRef;
    @Output() informParentTransaction = new EventEmitter();
    @Output() fundWarning = new EventEmitter();
    @Output() pageTypeData = new EventEmitter();
    @Output() radioButtonChange = new EventEmitter<{ isChange: boolean, event: string, previousValue: string }>;
    @Output() defaultAccount = new EventEmitter();

    isFirstChange = true;

    holderType = [{ P: '', S: '' }];
    signingCondition = [{ Singly: '(Individual)', J: '(Joint - Or)', M: '' }];
    accountType = [{ CDA: 'CA', SDA: 'SA' }];
    new_account_value = 'New Account';

    settlementAccount: any = [];
    selectedAccountOption: string;
    customerProfile$: Observable<CustomerProfile | null> = this.store.select(MintOfficeSelectors.customerProfile);
    getSavedDraftDetailsResponse$ = this.store.select(getSavedDraftDetailsResponse);
    getTotalAmountFund$ = this.store.select(totalFundAmount);
    acknowledgeFormStatus$ = this.store.select(acknowledgeFormResponse);
    productTransactionForm$ = this.store.select(productTransactionForm);
    salesForm$ = this.store.select(salesForm);
    refferalFormResponse$ = this.store.select(refferalFormResponse);
    getSearchFormDirtyCheck$ = this.store.select(getSearchFormDirtyCheck);
    subscribeFunds$ = this.store.select(subscribeFunds);
    isRadioDisable = false;
    totalFundAmountValue: ITotalFundAmount | null;
    dTotalTransactionEnable = true;
    insufficient =  false;
    getNonDefaultAccount$ = this.store.select(getNonDefaultCasaAccount);

    isNewAccount = this.transactionService.transactionType === TransactionType.NEW_ACCOUNT;
    private _unSubscriber$ = new Subject();

    constructor(
        private store: Store,
        public _fb: UntypedFormBuilder,
        public readonly transactionService: TransactionService,
        private router: Router,
    ) {}

    fundsAdded: string[] = [];

    /* istanbul ignore next */ //removed after add funds api is integrated
    parentFunds(funds: string[]): void {
        this.fundsAdded = funds;
        this.informParentTransaction.emit(this.fundsAdded);
    }

    inSufficientFunds(event: string): void {
        this.fundWarning.emit(event)
    }

    toggleAccountDetail(e: Event, optId: string, toggle: boolean): void {
        e.preventDefault();
        e.stopPropagation();
        if (toggle) {
            this.selectedAccountOption = optId;
        } else {
            this.selectedAccountOption = '';
        }
    }

    ngOnInit(): void {
        this.initProductTransactionForm();
        this.getIsDirtyCheck();

        this.productTransactionForm.valueChanges.pipe(
            takeUntil(this._unSubscriber$),
            map(() => {

                this.store.dispatch(TransactionAction.productTransactionFormData({
                    data: { formData: this.productTransactionForm.value, isValid: this.productTransactionForm.valid, isDirty: this.productTransactionForm.dirty },
                }),
                );
            })).subscribe()

        this.store.dispatch(
            TransactionAction.riskProfileEnqiryRequest({
                data: {
                    cifNumber: +this.transactionService.cifNumber,
                    custName: '',
                    custIdIssue: '',
                    custIdNo: '',
                    custIdType: '',
                },
            }),
        );

        if(this.isNewAccount) {
            this.productTransactionForm.get('investAccountNo').patchValue(this.new_account_value, {emitEvent: false});
            this.productTransactionForm.controls['investAccountNo'].disable();
        }

        this.productTransactionForm.controls['settlementAccountNo'].valueChanges.pipe(
            takeUntil(this._unSubscriber$),
            map(res => {

                this.payloadNonDefaultAccount = {
                    investAccountNo: this.isNewAccount ? this.new_account_value : this.productTransactionForm.controls['investAccountNo'].value.accountNumber,
                    settlementAccountNo: res.accountNumber,
                }

                if (this.isNewAccount) {
                    this.payloadNonDefaultAccount.cif = this.transactionService.cifNumber
                }

                if (this.payloadNonDefaultAccount.investAccountNo !== undefined && this.payloadNonDefaultAccount.settlementAccountNo !== undefined) {
                    this.store.dispatch(TransactionAction.getNonDefaultAccount({ payload: this.payloadNonDefaultAccount }))
                }

            })).subscribe()

        this.productTransactionForm.controls['investAccountNo'].valueChanges.pipe(
            takeUntil(this._unSubscriber$),
            map(res => {
            const payload = {
                investAccountNo: this.isNewAccount ? this.new_account_value : res.accountNumber,
                settlementAccountNo: this.productTransactionForm.controls['settlementAccountNo'].value.accountNumber,
            }

            if(payload.investAccountNo !== undefined && payload.settlementAccountNo !== undefined ){
                this.store.dispatch(TransactionAction.getNonDefaultAccount({payload : payload }))
            }
        })).subscribe()

    }

    initProductTransactionForm(): void {
        this.productTransactionForm = new UntypedFormGroup({
            rmId: new UntypedFormControl(''),
            sibsCif: new UntypedFormControl(''),
            customerName: new UntypedFormControl(''),
            productType: new UntypedFormControl('UT', [Validators.required]),
            transactionType: new UntypedFormControl('S', [Validators.required]),
            investAccountNo: new UntypedFormControl(''),
            settlementAccountNo: new UntypedFormControl(''),
            dTotalTransactionAmount: new UntypedFormControl('', [Validators.required], [CustomValidatorsTransactions.checkSubscriptionAmount(this.getTotalAmountFund$, this.store.select(gettransactionAmountErrorEnableStatus))]),
            approverId: new UntypedFormControl(''),
            requestUid: new UntypedFormControl(''),
        });

        this.getTotalAmountFund$.pipe(
            takeUntil(this._unSubscriber$),
            tap(() => {
            const control = this.productTransactionForm.controls['dTotalTransactionAmount'] as FormControl;
            if (control.value) {
                this.productTransactionForm.controls['dTotalTransactionAmount']?.updateValueAndValidity();
                this.store.dispatch(TransactionAction.productTransactionFormData({
                    data: { formData: this.productTransactionForm.value as IproductTransactionForm, isValid: this.productTransactionForm.valid },
                }))
            }
        })).subscribe();

        if (this.router.url.includes('draft') || this.router.url.includes('edit')) {
            this.isRadioDisable = true;
            this.getSavedDraftDetailsResponse$.pipe(
                takeUntil(this._unSubscriber$),
                filter(d => !!d),
                tap(res => {
                    this.productTransactionForm.patchValue({
                        productType: res?.productType,
                        transactionType: res?.trxType,
                        investAccountNo: res?.investAccountNumber,
                        settlementAccountNo: res?.settlementAccountNumber,
                        dTotalTransactionAmount: res?.dTotalTrxAmount,
                    }, {emitEvent: false})

                    if (res?.trxType === 'S') {
                        this.transactionService.transactionType = TransactionType.SUBSCRIBE
                    } else if (res?.trxType === 'W') {
                        this.transactionService.transactionType = TransactionType.SWITCH
                    } else if (res?.trxType === 'R') {
                        this.transactionService.transactionType = TransactionType.REEDEEM
                    }
                })
            ).subscribe();
        } else {
            this.setTrasactiontype();
        }
        this.emitPageTypeData();

        this.productTransactionForm.controls['dTotalTransactionAmount'].valueChanges.pipe(
            takeUntil(this._unSubscriber$),
            map((res: number) => {
            this.productTransactionForm.controls['dTotalTransactionAmount'].markAllAsTouched()
            this.store.dispatch(TransactionAction.getTotalTransactionAmount({ data: res }))
        })).subscribe()

        this.productTransactionForm.controls['settlementAccountNo'].valueChanges.pipe(
            takeUntil(this._unSubscriber$),
            map(res => {
            if(!this.productTransactionForm.controls['dTotalTransactionAmount'].value){
                this.productTransactionForm.controls['dTotalTransactionAmount'].markAllAsTouched();
                this.productTransactionForm.controls.dTotalTransactionAmount.setErrors({'error': true});
            }

        })).subscribe()

        this.productTransactionForm.addValidators(this.settlementAccountValidator());

          this.store.dispatch(MintOfficeActions.getCoustomer({cifNumber: this.transactionService.cifNumber}));

    }

    getIsDirtyCheck(): void {
        combineLatest([
            this.productTransactionForm$,
            this.refferalFormResponse$,
            this.salesForm$,
            this.acknowledgeFormStatus$,
            this.getSearchFormDirtyCheck$,
            this.subscribeFunds$
        ]).pipe(
            takeUntil(this._unSubscriber$),
            map(([p, r, s, a, d, f]) => {

                if(this.isNewAccount) {
                    this.isRadioDisable = true;
                }

                if ((this.transactionService.transactionType === TransactionType.SUBSCRIBE || this.transactionService.transactionType === TransactionType.NEW) && (!!this.productTransactionForm.controls.dTotalTransactionAmount.value || r?.isDirty || s?.isDirty || a?.isDirty || !!d)) {
                    this.isFirstChange = false;
                }

                if ((this.transactionService.transactionType === TransactionType.SWITCH || this.transactionService.transactionType === TransactionType.REEDEEM ) && (r?.isDirty || s?.isDirty || a?.isDirty || !!d) ) {
                    this.isFirstChange = false;
                }

                if (!!f && f?.length > 0) {
                    this.isFirstChange = false;
                }
            })
        ).subscribe();
    }

    /* istanbul ignore next */
    radioChange(event: MatRadioChange, source: string): void {
        const control: FormControl = this.productTransactionForm.get('dTotalTransactionAmount') as FormControl
        if (source === 'product' && event.source.checked) {
            this.productTransactionForm?.controls.productType.setValue('UT');
        }

        if (event.value === 'R' || event.value === 'W') {
            this.productTransactionForm.get('dTotalTransactionAmount')?.removeValidators([Validators.required])
            this.productTransactionForm.get('dTotalTransactionAmount')?.setErrors({ 'required': false })
        } else {
            control?.addValidators([Validators.required]);
        }
        control?.markAsPristine();
        control?.markAsUntouched();
        this.emitPageTypeData(event.value as string);

        if (source !== 'product') {
            this.radioButtonChange.emit({ isChange: this.isFirstChange, event: event.value as string, previousValue: this.productTransactionForm.controls.transactionType.value as string });
        }

    }

    emitPageTypeData(type: string = ""): void {
        let transactionTypeKey = "";
        if (type) {
            transactionTypeKey = type;
        } else {
            transactionTypeKey = this.productTransactionForm.get('transactionType')?.value as string;
        }
        const transactionType: string = TRANSACTION_TYPE[transactionTypeKey as unknown as number];

        this.pageTypeData.emit(transactionType);
    }

    resetAmount() {
        const control: FormControl = this.productTransactionForm.get('dTotalTransactionAmount') as FormControl;
        control?.setValue('')
        control?.setErrors(null);
        control?.markAsPristine();
        control?.markAsUntouched();
    }

    searchFunds() {
        if (this.rmSearch) {
            this.rmSearch.searchFunds();
        }
    }

    /* istanbul ignore next */
    removeFundFromSearchSelectionList(fund: ISearchFundData): void {
        this.rmSearch.addedFunds = this.rmSearch.addedFunds.filter((f) => f.fundId !== fund.fundId);
        this.rmSearch.informParent.emit(this.rmSearch.addedFunds);
    }

    getFundDetailsForTransaction(fund: IRmaTransactionDetail[]): void {
        this.rmSearch.initFundDetails(fund);
    }

    setTrasactiontype(): void {
        let selectedType: string;

        if (this.transactionService.transactionType === TransactionType.SWITCH) {
            selectedType = 'W'
        } else if (this.transactionService.transactionType === TransactionType.REEDEEM) {
            selectedType = 'R'
        } else {
            selectedType = 'S'
        }

        this.productTransactionForm.get('transactionType')?.patchValue(selectedType);
        this.emitPageTypeData();
    }

settlementAccountValidator(): ValidatorFn {
        return () => {
            const totalTransAmount = this.productTransactionForm.get('dTotalTransactionAmount') as FormControl;
            const settleMentAccount = this.productTransactionForm.get('settlementAccountNo') as FormControl;
            if ((settleMentAccount.value && settleMentAccount.value.accountBalance) && settleMentAccount.value.accountBalance <= +totalTransAmount.value) {
                this.productTransactionForm.get('settlementAccountNo').markAsDirty();

                settleMentAccount.setErrors({ insufficientBal: true })
                return { settlementAccountInsufficientBalance : true }
            }

            if(+totalTransAmount.value && settleMentAccount.value && settleMentAccount.value.accountBalance && (settleMentAccount.value.accountBalance - +totalTransAmount.value < 20)){
                settleMentAccount.setErrors({ insufficientBal: true })
                return { settlementAccountInsufficientBalance: true }
            }

            settleMentAccount.setErrors(null);
            return null;
        };
    }

    patchInvestmentAccountAndSettleMentAccount(res: IGetTrxDetailResponse) {
        this.customerProfile$.pipe(
            takeUntil(this._unSubscriber$),
            map((profile) => {
                if(!profile) return;
                if(Object.keys(profile).length <= 0) return
                if(profile.settlementAccount.length > 0) {
                    const settlementAccount = profile.settlementAccount.find((s) => s.accountNumber === res.settlementAccountNumber);
                    const settlementAccountControl = this.productTransactionForm.get('settlementAccountNo')
                    if(settlementAccount) {
                        settlementAccountControl.patchValue(settlementAccount);
                    }

                }
                if(profile.investmentAccount.length > 0) {
                    const investmentAccount = profile.investmentAccount.find((s) => s.accountNumber === res.investAccountNumber);
                    const investmentAccountControl = this.productTransactionForm.get('investAccountNo')
                    if(investmentAccount) {
                        investmentAccountControl.patchValue(investmentAccount);
                    }

                }
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
       this._unSubscriber$.next(null);
       this._unSubscriber$.complete();
    }
}

enum TRANSACTION_TYPE {
    S = <any>"Subscribe",
    W = <any>"Switch",
    R = <any>"Redeem"
}
