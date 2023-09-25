/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from '@angular/router';
import { productTransactionForm, totalFundAmount, totalTransactionAmount } from './../../+state/transaction.selectors';
import { DecimalPipe, formatNumber } from '@angular/common';
import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RiskProfileToRatingPipe } from '@cimb/core';
import * as Actions from '../../+state/transaction.actions';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ISearchFundData } from '../../+state/transaction.models';
import { riskProfileInquiry, allSwitchOutFunds } from '../../+state/transaction.selectors';
import { FundCardStatus, FundDetailQueryParam, FundRequestData, ISwitchOutFundRequest } from '../../models/funds.model';
import { IRiskProfileInquiryResponse } from '../../models/risk-profile.model';
import * as TransactionActions from "../../+state/transaction.actions";
import { ISalesChargeDropDowmRequest, ISalesChargeDropDowmResponse } from '../../models/sales-charge.model';
import { CustomValidators } from './sales-charge.validators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TransactionService } from '../../services/transaction.service';
import * as _ from 'lodash-es';
import { TransactionType, DialogMessageComponent, MintOfficeSelectors, InvestmentAccount } from '@cimb/mint-office';
import { FundDetailDialogComponent } from '../fund-detail-dialog/fund-detail-dialog.component';

@Component({
    selector: 'cimb-office-fund-card',
    templateUrl: './fund-card.component.html',
    styleUrls: ['./fund-card.component.scss'],
})
export class FundCardComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
    @ViewChild('matExpansionPanel') _matExpansionPanel: any;

    expanded = true;
    selected = false;

    accountForm: UntypedFormGroup;
    switchForm: UntypedFormGroup;
    redeemForm: UntypedFormGroup;
    // totalTransactionAmount = this.store.select(totalTransactionAmount);

    panelOpenState = true;
    riskProfileInquiry$: Observable<IRiskProfileInquiryResponse | undefined | null> =
        this.store.select(riskProfileInquiry);
    salesChargeDropDown$: BehaviorSubject<ISalesChargeDropDowmResponse[]> = new BehaviorSubject<ISalesChargeDropDowmResponse[]>([]);
    _salesChargeDropDown: ISalesChargeDropDowmResponse[];
    investmentAccount: string;

    switchOutFunds$: Observable<ISearchFundData[]>;
    selectedSwitchInFund: ISearchFundData | null;

    @Input() fundDeatil: ISearchFundData;
    @Output() remove: EventEmitter<ISearchFundData> = new EventEmitter<ISearchFundData>();
    @Output() fundDataChange: EventEmitter<{ fundCode: string, status: FundCardStatus }> = new EventEmitter<{ fundCode: string, status: FundCardStatus }>();

    status: FundCardStatus;
    isDeviation = false;

    @Input() pageType = 'Subscribe';

    private _unSubscribeAll$ = new Subject();

    private bulkAmount: number;

    constructor(
        private readonly store: Store,
        private readonly dialog: MatDialog,
        private readonly fb: UntypedFormBuilder,
        public readonly transactionService: TransactionService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly route: Router
    ) {
        this.store.select(productTransactionForm).subscribe((res) => {
            if(!res || !res.formData || !res.formData.investAccountNo ) {
                return
            }
            if(typeof(res.formData.investAccountNo) === 'string') {
                this.investmentAccount = res?.formData?.investAccountNo;
                return;
            }

            this.investmentAccount = (res?.formData?.investAccountNo as InvestmentAccount)?.accountNumber;
        })
    }

    get f(): { [key: string]: AbstractControl } {
        return this.accountForm.controls;
    }

    get sForm(): { [key: string]: AbstractControl } {
        return this.switchForm.controls;
    }

    get rForm(): { [key: string]: AbstractControl } {
        return this.redeemForm.controls;
    }

    ngOnInit(): void {
        this.switchForm = this.fb.group({
			outAmt: new UntypedFormControl(),
			switchInFee: new UntypedFormControl(),
			exitFee: new UntypedFormControl(),
			switchFeeWaiver: new UntypedFormControl(),
            outUnit: new UntypedFormControl('', [CustomValidators.switchOutUnit(this.fundDeatil)] ),
            switchInFundCode: new UntypedFormControl('', [Validators.required]),
            switchAll: new UntypedFormControl(false, []),
            switchingWaiver: new UntypedFormControl(),
            switchSearchParam: new UntypedFormControl('').disable(),
        });
        this.redeemForm = this.fb.group({
            outUnit: new UntypedFormControl('', [CustomValidators.redeemUnit(this.fundDeatil)] ),
            redeemAll: new UntypedFormControl(false),
        })
        this.accountForm = this.fb.group({
            totalAmount: new UntypedFormControl('', [Validators.required], [CustomValidators.getTotalTransactionAmount(this.store.select(totalTransactionAmount),this.store.select(totalFundAmount), this.fundDeatil )]),
            salesChargeId: new UntypedFormControl('', [Validators.required]),
            salesChargeRate: new UntypedFormControl('', [Validators.required]),
            salesChargeAmount: new UntypedFormControl(''),
            remark: new UntypedFormControl(''),
            currencyCode: new UntypedFormControl(''),
            fundCode: new UntypedFormControl(this.fundDeatil.details?.fundCode),
            units: new UntypedFormControl(''),
        });

        if(this.transactionService.transactionType !== TransactionType.SWITCH && this.transactionService.transactionType !== TransactionType.REEDEEM) {
            this.f.salesChargeRate.addAsyncValidators([CustomValidators.salesCharge(this.salesChargeDropDown$.pipe(shareReplay(1)))]);

            // change sale charge when total transaction amount change
            this.store.select(totalTransactionAmount).pipe(tap((res: number) => {
                this.bulkAmount = res;
                if(!this.transactionService.newTransaction){ 
                    this.accountForm.get('salesChargeId')?.reset();
                    this.accountForm.get('salesChargeRate')?.patchValue('');
                    this.accountForm.get('salesChargeAmount')?.patchValue('');
                }
            })).subscribe();
        }

        if(
            this.route.url.includes('draft') &&
            (this.fundDeatil.details?.fundStatus === 'C' || this.fundDeatil.details?.fundStatus === 'D') &&
            (this.transactionService.transactionType !== TransactionType.SWITCH && this.transactionService.transactionType !== TransactionType.REEDEEM)
        ) {
            this.dialog.open(DialogMessageComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                minWidth: '430px',
                maxWidth: '430px',
                minHeight: '250px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'One or more funds are closed/ inactive',
                    icon: 'icon-danger-1',
                    description: `<div class="content-main-div"><div class="content-divs">  One or more funds in your fund cart is either closed or inactive for transaction. </div><br/><div class="content-divs">To proceed with the application, please remove the inactive fund(s) or add a new one.<br/></div></div></div>`,
                    btnOkLabel: 'Okay',
                },
            }).afterClosed();
        }
        if(this.transactionService.transactionType === TransactionType.SWITCH) {
            this.dispatchSwitchOutFund(this.fundDeatil);
        }

        if(this.transactionService.transactionType === TransactionType.REEDEEM) {
            this.disableReddemForm();
        }

        this.setSwitchForm();
        this.setRedeemForm();

        this.rForm.outUnit.valueChanges.pipe(
            tap(() =>  this.rForm.outUnit.markAllAsTouched())
        ).subscribe();

        this.sForm.outUnit.valueChanges.pipe(
            tap((value: string) => {
                this.sForm.outUnit.markAllAsTouched();
                if(value && (value + '').length > 0) {
                    this.sForm.switchSearchParam.enable();
                } else {
                    this.sForm.switchSearchParam.disable();
                }
            })
        ).subscribe();

        this.accountForm.valueChanges.pipe(debounceTime(500)).subscribe(() => this.triggerFundStatus());
        this.switchForm.valueChanges.pipe(debounceTime(500)).subscribe(() => this.triggerFundStatus());
        this.redeemForm.valueChanges.pipe(debounceTime(500)).subscribe(() => this.triggerFundStatus());

        this.enableForm();
        this.onBlur();
        this._cdr.detectChanges();

        this.f.totalAmount.valueChanges.pipe(filter(res => !!res)).subscribe(() => {
           this.f.totalAmount.markAllAsTouched()
        })

        this.switchOutFunds$ = this.getSwitchoutFund();
    }

    triggerFundStatus(): void {
        let status: string;
        if(this.transactionService.transactionType === TransactionType.REEDEEM) {
            status = this.redeemForm.status;
        } else if(this.transactionService.transactionType === TransactionType.SWITCH) {
            status = this.switchForm.status;
        } else {
            status = this.accountForm.status;
        }

        const accountFormData = this.accountForm.getRawValue() as Partial<FundRequestData>;
        const switchFormData = this.switchForm.getRawValue() as Partial<FundRequestData>;
        const redeemFormData = this.redeemForm.getRawValue() as Partial<FundRequestData>;

        if(this.transactionService.transactionType === TransactionType.REEDEEM) {
            delete switchFormData.outUnit;
        } else if(this.transactionService.transactionType === TransactionType.SWITCH) {
            delete redeemFormData.outUnit;
        }

        // delete unused params
        delete switchFormData.switchAll;
        delete switchFormData.switchSearchParam;
        delete redeemFormData.redeemAll;

        const data = {
            ...accountFormData,
            ...switchFormData,
            ...redeemFormData,
            fundStatus: this.fundDeatil.details?.fundStatus
        } as FundRequestData;

        const payload = {...data, ...{ outUnit: data.outUnit ? data.outUnit.replace(/,/g, '') : '' }}

        this.status = {
            status: status,
            data: payload
        }

        this.fundDataChange.emit({
            fundCode: this.fundDeatil.fundCode,
            status: this.status
        });
    }

    ngAfterViewInit(): void {
        this.f.remark.valueChanges
            .pipe(
                tap((remark: string) => {
                    if (remark.length > 500) {
                        this.f.remark.setValue(remark.substring(0, 500));
                    }
                }),
            )
            .subscribe();

        this.f.salesChargeId.valueChanges
            .pipe(
                tap(() => {
                    this.descriptionValidator();
                }),
            )
            .subscribe();

        combineLatest([this.f.totalAmount.valueChanges, this.f.salesChargeRate.valueChanges])
            .pipe(
                tap(() => {
                    if(!this.transactionService.newTransaction) { 
                        this.setSalesCharnge();
                    }
                }),
            )
            .subscribe();

        if (this.fundDeatil.subscribeFundDetails) {
            const previousValue = {
                totalAmount: new DecimalPipe('en-US').transform(this.fundDeatil.subscribeFundDetails.totalAmount.toFixed(2), '1.2-2'),
                salesChargeAmount: this.setPreviousValue(this.fundDeatil.subscribeFundDetails.salesChargeId, new DecimalPipe('en-US').transform(this.fundDeatil.subscribeFundDetails.salesChargeAmount?.toFixed(2),'1.2-2')),
                salesChargeId: this.setPreviousValue(this.fundDeatil.subscribeFundDetails.salesChargeId, this.fundDeatil.subscribeFundDetails.salesChargeId),
                salesChargeRate:this.setPreviousValue(this.fundDeatil.subscribeFundDetails.salesChargeId,new DecimalPipe('en-US').transform(this.fundDeatil.subscribeFundDetails.salesChargeRate.toString(),'1.2-2')),
                remark: this.fundDeatil.subscribeFundDetails.remark,
                outUnit: new DecimalPipe('en-US').transform(this.fundDeatil.subscribeFundDetails?.outUnit?.toFixed(2), '1.2-2'),
            }
            this.accountForm.patchValue(previousValue);
            this.switchForm.patchValue({...this.fundDeatil.subscribeFundDetails, ...previousValue});
            this.redeemForm.patchValue({...this.fundDeatil.subscribeFundDetails, ...previousValue});

            this.sForm.outUnit.markAsDirty();
            this.rForm.outUnit.markAsDirty();
            this.enableForm();
            if(this.fundDeatil.subscribeFundDetails.salesChargeId === 'adhoc' && this.f.totalAmount.valid){
                this.f.salesChargeRate.enable()
            }
            if(this.transactionService.transactionType === TransactionType.SWITCH && this.fundDeatil?.subscribeFundDetails?.switchInFundCode) {
                this.populateSelectedSwitchInFund(this.fundDeatil?.subscribeFundDetails?.switchInFundCode);
            }
        }

        this.emitDeviationStatus();

        this.triggerFundStatus();
    }

    setPreviousValue(salesChargeId : string, value:string):string{
        if(this.transactionService.newTransaction || salesChargeId === 'adhoc'){
            return value;
        }else {
            return '';
        }
    }

    setSalesCharnge(): void {
        let totalAmount = this.f.totalAmount.value as string;
        if (!totalAmount || totalAmount.length === 0) return;
        totalAmount = totalAmount.replace(/,/g, '');
        const amount = +totalAmount;
        let rate = this.f.salesChargeRate.value as string;
        rate = rate.replace('%', '');

        if (!amount || !rate) {
            this.f.salesChargeAmount.setValue('');
            return;
        }

        if (isNaN(+rate)) {
            this.f.salesChargeAmount.setValue('');
            return;
        }

        let value = (amount) * (+rate / 100);
        value = Math.round((value + Number.EPSILON) * 100) / 100
        const salesCharge = new DecimalPipe('en-US').transform(value.toFixed(2), '1.2-2');
        this.f.salesChargeAmount.setValue(salesCharge);
    }

    ngAfterContentChecked(): void {
        const s = this.f.totalAmount as UntypedFormControl;
        if (this.fundDeatil.details?.fundStatus !== 'C' && this.fundDeatil.details?.fundStatus !== 'D' && s.value) {
            return;
        }

        if(this.fundDeatil.details?.fundStatus === 'C' || this.fundDeatil.details?.fundStatus === 'D' && this.transactionService.transactionType === TransactionType.SWITCH) {
            this.switchForm.disable();
        }
        for (const key in this.accountForm.controls) {
            /* istanbul ignore else */
            if (Object.prototype.hasOwnProperty.call(this.accountForm.controls, key)) {
                const element = this.accountForm.controls[key] as UntypedFormControl;
                if (key !== 'totalAmount' || this.fundDeatil.details?.fundStatus === 'C' || this.fundDeatil.details?.fundStatus === 'D') {
                    element.disable();
                }
            }
        }
    }

    enableForm(): void {
        for (const key in this.accountForm.controls) {
            /* istanbul ignore else */
            if (Object.prototype.hasOwnProperty.call(this.accountForm.controls, key)) {
                const element = this.accountForm.controls[key] as UntypedFormControl;

                if (this.fundDeatil.details?.fundStatus === 'C' || this.fundDeatil.details?.fundStatus === 'D') {
                    element.disable();
                } else {
                    element.enable();
                    this.f.salesChargeRate.disable();
                    this.f.salesChargeAmount.disable();
                }
            }
        }
    }

    private disableReddemForm(): void {
        for (const key in this.redeemForm.controls) {
            /* istanbul ignore else */
            if (Object.prototype.hasOwnProperty.call(this.redeemForm.controls, key)) {
                const element = this.redeemForm.controls[key] as UntypedFormControl;

                if (this.fundDeatil.details?.fundStatus === 'C' || this.fundDeatil.details?.fundStatus === 'D') {
                    element.disable();
                } else {
                    element.enable();
                }
            }
        }
    }

    removeRecord(): void {
        this.remove.emit(this.fundDeatil);
    }

    openFundDetails(fund: ISearchFundData): void {
        this.dialog
            .open(FundDetailDialogComponent, {
                width: '1114px',
                height: '90%',
                panelClass: 'fund-detail-dialog',
                data: {
                    fundData: fund.details,
                    investmentEnable: false,
                },
            })
            .afterClosed()
            .subscribe();
    }

    formatRate(): void {
        let value = this.f.salesChargeRate.value as string | null;
        value = value ? value : '0'
        if(value.endsWith("%")) {
            value = value.split("%")[0];
        }
        value = new DecimalPipe('en-US').transform(value, '1.2-2');
        if (value && !value.endsWith('%')) {
            this.f.salesChargeRate.setValue(value);
        }
    }

    formatDescription(e: KeyboardEvent): void {
        const desc = (this.f.remark.value as string) + e.key;
        if (desc.length > 500) e.preventDefault();
    }

    removePercentage(): void {
        let rate = this.f.salesChargeRate.value as string;
        if (rate.endsWith('%')) {
            rate = rate.replace('%', '');
            if (+rate === 0) {
                rate = '';
            }
            this.f.salesChargeRate.setValue(rate);
        }
    }

    rateValidationCheckOnPaste(e: ClipboardEvent): void {
        let pastevalue = e.clipboardData?.getData('text');
        if (pastevalue?.endsWith('%')) {
            pastevalue = pastevalue.replace('%', '');
        }
        const regex = /^(\d)*(\.)?(\d{0,2})?$/;
        if (pastevalue && !regex.test(pastevalue)) {
            e.preventDefault();
        }
    }

    formatDecimalError(e: KeyboardEvent, rateInput?: HTMLInputElement): void {
        let rate = this.f.salesChargeRate.value as string;

        if (rate.endsWith('%')) {
            rate = rate.replace('%', '');
        }

        if (rate.length !== 0 && rateInput && rateInput.selectionStart && rateInput.selectionEnd && rateInput.selectionStart <= rate.length) {
            const rateArr = rate.split('');
            if (rateInput.selectionStart === rateInput.selectionEnd) {
                rateArr.splice(rateInput.selectionStart, 0, e.key);
            } else {
                rateArr[rateInput.selectionStart] = e.key;
                rateArr.splice(
                    rateInput.selectionStart + 1,
                    rateInput.selectionEnd - rateInput.selectionStart + 1,
                );
            }
            rate = rateArr.join('');
        } else {
            rate += e.key;
        }

        if (isNaN(+rate)) {
            e.preventDefault();
            return;
        }

        if (+rate > 100) {
            e.preventDefault();
            return;
        }

        const regex = /^(\d)*(\.)?(\d{0,2})?$/;
        if (!regex.test(rate)) {
            e.preventDefault();
        }
    }

    emitDeviationStatus(): void {
        this.riskProfileInquiry$
            .pipe(
                filter((r) => !!r),
                tap((riskProfile) => {
                    if(riskProfile?.riskProfile && this.fundDeatil.details) {
                        this.isDeviation =
                            new RiskProfileToRatingPipe().transform(riskProfile.riskProfile) <
                            this.fundDeatil.details.riskRating;
                    }
                }),
            )
            .subscribe();
    }

    getRiskType(rating: string): string {
        let riskProfile = '';
        switch (rating) {
            case '1':
                riskProfile = 'Defensive';
                break;
            case '2':
                riskProfile = 'Conservative';
                break;
            case '3':
                riskProfile = 'Balanced';
                break;
            case '4':
                riskProfile = 'Growth';
                break;
            case '5':
                riskProfile = 'Aggressive';
                break;
            default:
                break;
        }
        return riskProfile;
    }

    descriptionValidator(): void {
        const salesChargeId = this.f.salesChargeId as UntypedFormControl;
        if (salesChargeId.value === 'adhoc') {
            this.f.remark.addValidators(Validators.required);
        } else {
            this.f.remark.removeValidators(Validators.required);
        }
    }

    getReturnValue(investmentAmmount: number, roi: number): string {
        if(!investmentAmmount || !roi) {
            return '';
        }
        const value = (roi / investmentAmmount) * 100;
        return `${value < 0 ? '-' : '+'}MYR ${new DecimalPipe('en-US').transform(Math.abs(value).toFixed(2), '1.2-2')}`;
    }

    onSalesChargeIdChange(event: string): void {
        const selectedDropDown = this._salesChargeDropDown ? this._salesChargeDropDown.find(d => d.scId === event) : {} as ISalesChargeDropDowmResponse;
        if(selectedDropDown) {
            this.f.salesChargeAmount.disable();
        }

        if(event === 'default' || event === 'bday' ||  event === 'yecamp') {
            this.f.salesChargeRate.disable();
            this.f.salesChargeRate.patchValue(selectedDropDown?.rate?.toString());
        } else {
            if(selectedDropDown?.minRate) {
                this.f.salesChargeRate.patchValue(selectedDropDown.minRate.toString());
            } else {
                this.f.salesChargeRate.patchValue('0');
            }
            this.f.salesChargeRate.enable();
        }
        this.formatRate();
    }

    getSwitchoutFund(): Observable<ISearchFundData[]> {
        return this.store.select(allSwitchOutFunds).pipe(
            filter(f => !!f),
            map(fund => fund?.get(this.fundDeatil.fundCode) ? fund?.get(this.fundDeatil.fundCode): [])
        ).pipe(
            tap(data => {
                if(this.sForm.switchInFundCode.value) {
                    this.sForm.switchSearchParam.patchValue(data?.find(d => d.fundCode === this.sForm.switchInFundCode.value)?.fundName);
                }
            }),
            switchMap(funds => this.sForm.switchSearchParam.valueChanges.pipe(
                startWith(''),
                map((value: string | ISearchFundData) => {
                    if(funds) {
                        funds = [...this.getSortedFundByStatusAndAlphabets(funds)];
                        return funds.filter(f => {
                            if(!value) return true;

                            if(typeof(value) === 'object') {
                                return f.fundName.toLowerCase().startsWith(value.fundName.toLowerCase());
                            } else if(typeof(value) === 'string') {
                                return f.fundName.toLowerCase().startsWith(value.toLowerCase());
                            }

                            return true;
                        })
                    }

                    return [] as ISearchFundData[];
                })
            )),
        )
    }

    getSortedFundByStatusAndAlphabets(funds: ISearchFundData[]): ISearchFundData[] {
        const sortFunction = (a:ISearchFundData, b:ISearchFundData) => {
                if(a.fundName < b.fundName) { return -1; }
                if(a.fundName > b.fundName) { return 1; }
                return 0;
        }
        const inactiveFund = funds.filter(f => f.fundStatus.toLocaleLowerCase() === "c" || f.fundStatus.toLocaleLowerCase() === "d").sort((a:ISearchFundData, b:ISearchFundData) => sortFunction(a, b));
        const activeFund = funds.filter(f => f.fundStatus.toLocaleLowerCase() !== "c" && f.fundStatus.toLocaleLowerCase() !== "d").sort((a:ISearchFundData, b:ISearchFundData) => sortFunction(a, b));
        return [...activeFund, ...inactiveFund];
    }

    setSwitchForm(): void {
        this.sForm.switchSearchParam.disable();
        if(this.fundDeatil.details && this.fundDeatil.details.maxRealizationUnit && this.fundDeatil.details.unitsHeld <= this.fundDeatil.details.maxRealizationUnit) {
            this.sForm.switchAll.enable();
            return
        }
        this.sForm.switchAll.disable();
    }

    setRedeemForm(): void {
        if(this.fundDeatil.details && this.fundDeatil.details.maxRealizationUnit && this.fundDeatil.details.unitsHeld <= this.fundDeatil.details.maxRealizationUnit) {
            this.rForm.redeemAll.enable();
            return
        }
        this.rForm.redeemAll.disable();
    }

    onSwitchAllChange(event: MatCheckboxChange): void {
        if(event.checked && this.fundDeatil.details) {
            this.sForm.outUnit.disable();
            this.sForm.outUnit.patchValue(formatNumber(this.fundDeatil.details.unitsHeld, 'en-US', '1.2-2'));
            this.sForm.outUnit.markAllAsTouched();
        } else {
            this.sForm.outUnit.enable();
        }
    }

    onRedeemChange(event: MatCheckboxChange): void {
        if(event.checked && this.fundDeatil.details) {
            this.rForm.outUnit.disable();
            this.rForm.outUnit.patchValue(formatNumber(this.fundDeatil.details.unitsHeld, 'en-US', '1.2-2'));
            this.rForm.outUnit.markAllAsTouched();
        } else {
            this.rForm.outUnit.enable();
        }
    }

    getUnitInNumber(value: string): number {
        if(!value) return 0;
        if(typeof(value) === 'number') return value;
        value = value.replace(/,/g, '');
        return +value;
    }

    getSelectedSwitchOut(data: MatAutocompleteSelectedEvent): void {
        const selected = data.option.value as ISearchFundData;
        this.getSwitchInFundDetails(selected);
        this.sForm.switchSearchParam.setValue(selected.fundName);
        this.sForm.switchInFundCode.setValue(selected.fundCode);
    }

    dispatchSwitchOutFund(fund: ISearchFundData): void {
        this.store.select(MintOfficeSelectors.customer).pipe(
            filter(c => !!c),
            tap(customer => {
                const payload: ISwitchOutFundRequest = {
                    cifNumber: customer?.cifNumber,
                    custName: customer?.coustomer,
                    fundCode: this.route.url.includes('draft') && fund?.details ? fund.details?.fundCode : fund?.fundCode,
                    fundName: this.route.url.includes('draft') && fund?.details ? fund.details?.fundName : fund.fundName,
                    custIdIssue: "",
                    custIdNo: "",
                    custIdType: "",
                    accountNo: [
                        '640826135254'
                    ],
                    transactionType: "SWI"
                }

                this.store.dispatch(Actions.getSwitchOutFunds({ data: payload }));
            })
        ).subscribe();
    }

    getSwitchInFundDetails(fund: ISearchFundData | undefined): void {
        if(!fund) return
        const payload: FundDetailQueryParam = {
            fundCode: fund.fundCode.toString(),
            utAccountNumber: 640826135255
        }
        this.transactionService.getFundDetails(payload).pipe(
            tap(data => {
                fund.details = data;
                this.selectedSwitchInFund = fund;
                this._cdr.detectChanges();
            }),
            catchError(err => {
                this.selectedSwitchInFund = null;
                this._cdr.detectChanges();
                return throwError(err);
            })
        ).subscribe();
    }

    isRiskDeviation(profile: IRiskProfileInquiryResponse, fund: ISearchFundData): boolean {
        if(
            profile &&
            profile.riskProfile &&
            fund &&
            fund.details &&
            fund.details.riskRating
        ) {
            const profileToRating = +(new RiskProfileToRatingPipe().transform(profile.riskProfile));
            const deviation = profileToRating < +fund.details.riskRating;

            this.store.dispatch(TransactionActions.switchInFundDeviation({ status: deviation }));
            return deviation;
        }

        this.store.dispatch(TransactionActions.switchInFundDeviation({ status: false }));
        return false;
    }

    populateSelectedSwitchInFund(fundCode: string): void {
        const obs$ = this.switchOutFunds$.pipe(
            filter(d => !!d),
            tap(fundData => {
                const selectedFund = fundData.find(f => f.fundCode === fundCode);
                this.getSwitchInFundDetails(selectedFund);
            })
        ).subscribe(() => {
            obs$.unsubscribe();
        });
    }

    onBlur():void{
        const getTotalAmountValue = this.f.totalAmount.value as string;
        const fundInvestmentAmount = getTotalAmountValue.replace(/,/g, '');
        const obj: ISalesChargeDropDowmRequest = {
            grossAmt: +fundInvestmentAmount,
            fundCode: (this.fundDeatil.details && this.fundDeatil.details.fundCode) ? this.fundDeatil.details.fundCode : "",
            bulkAmt: this.bulkAmount ? this.bulkAmount : 0,
            invAcctNo: this.investmentAccount
        }
        this.transactionService.getSalesChargeDropDown(obj).pipe(
            tap((response) => {
                this._salesChargeDropDown = response;
                this.salesChargeDropDown$.next(response);
                this._cdr.detectChanges();
            })
        ).subscribe(() => this.accountForm.get('salesChargeRate').updateValueAndValidity());
    }

    get maxSubscriptionAmount(): number {
        const details = this.fundDeatil.details;
        if(!details) return 0;
        else return details.unitsHeld > 0 ? details.maxSubsequentSubscription : details.maxInitialSubscription
    }

    get minSubscriptionAmount(): number {
        const details = this.fundDeatil.details;
        if(!details) return 0;
        else return details.unitsHeld > 0 ? details.minSubsequentSubscription : details.minInitialSubscription
    }

    ngOnDestroy(): void {
        this.store.dispatch(TransactionActions.switchInFundDeviation({ status: false }));
        this._unSubscribeAll$.next(null);
        this._unSubscribeAll$.complete();
    }
}
