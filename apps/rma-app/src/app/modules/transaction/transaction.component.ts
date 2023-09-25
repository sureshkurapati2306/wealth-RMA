import { getNonDefaultCasaAccount } from './+state/transaction.selectors';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ChangeDetectorRef, HostListener } from '@angular/core';
import { AfterViewInit, Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Data } from '@angular/router';
import * as _ from 'lodash-es';
import { Store } from '@ngrx/store';

import { map, filter, tap, catchError, switchMap, take, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { RiskProfileToRatingPipe } from '@cimb/core';
import { RmProductTransactionComponent } from './components/rm-product-transaction/rm-product-transaction.component';
import { RmAcknowledgementComponent } from './components/rm-acknowledgement/rm-acknowledgement.component';
import { RmSalesComponent } from './components/rm-sales/rm-sales.component';
import { AdhocApprovalComponent } from './components/adhoc-approval/adhoc-approval.component';
import { acknowledgeFormResponse, createdApplicationStatus, getSavedDraftDetailsResponse, getSearchFormDirtyCheck, productTransactionForm, refferalFormResponse, riskProfileInquiry, salesForm, savedDraftAppResponse, subscribeFunds, totalFundAmount, totalTransactionAmount } from './+state/transaction.selectors';
import { IDraftTransactionResponse, IproductTransactionForm, IRefferalTransactionForm, ISalesFormData, ISearchFundData, ITotalFundAmount, ITransactionAppRequest, ITransactionAppResponse } from './+state/transaction.models';
import { FundCardStatus, FundRequestData } from './models/funds.model';
import { SnackbarService } from './services/snack-bar.service';
import { TransactionService } from './services/transaction.service';
import * as MintOfficeTransacationActions from './+state/transaction.actions';
import { IGetTrxDetailResponse } from './models/risk-profile.model';
import { OrderSummaryRouteData, TransactionLogoutService, OrderSummaryResolver, StorageService, DialogMessageComponent, TransactionType } from '@cimb/mint-office';
import { FundErrorDialogComponent } from 'libs/mint-office/src/lib/mint-office-ui-dialog/fund-error-dialog/fund-error-dialog.component';
import { customer } from '../customer/+state/customer.selector';
import { CanDeactivateComponent } from '../shared/gaurds/can-deactivate.gaurd';
import { ViewportScroller } from '@angular/common';
import { Breadcrumb, ICustomerDetails } from '../shared/models/breadcrumb.model';


interface trxType {
    isChange: boolean,
    event: string,
    previousValue: string | null
}

@Component({
    selector: 'cimb-office-feature-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TransactionComponent implements AfterViewInit, OnDestroy, CanDeactivateComponent {

    breadcrumbs: Breadcrumb[] = [
        {
            title: 'Application',
            route: '',
        }
    ]

    customerDetails: ICustomerDetails = {
        route: '/customer',
        isEnable: true
    }

    @ViewChild(RmProductTransactionComponent) productTransaction: RmProductTransactionComponent;
    @ViewChild(RmAcknowledgementComponent) acknowledgement: RmAcknowledgementComponent;
    @ViewChild(RmSalesComponent) salesFormComponent: RmSalesComponent;
    @ViewChild(AdhocApprovalComponent) adHocApproverComponnet: AdhocApprovalComponent;
    dataTrx: trxType = { isChange: false, event: 'S', previousValue: null }

    getSearchFormDirtyCheck$ = this.store.select(getSearchFormDirtyCheck);

    acknowledgeFormStatus$ = this.store.select(acknowledgeFormResponse);
    getDraftTransactionIdDetails$ = this.store.select(getSavedDraftDetailsResponse);
    saveDraftTransactionRes$ = this.store.select(savedDraftAppResponse);
    productTransactionForm$ = this.store.select(productTransactionForm);
    salesForm$ = this.store.select(salesForm);
    refferalFormResponse$ = this.store.select(refferalFormResponse);
    customerSelector$ = this.store.select(customer);
    createdApplicationStatus$ = this.store.select(createdApplicationStatus);
    private _unsubscribeAll$: Subject<any> = new Subject<any>();

    parentTransactionFunds: ISearchFundData[] = [];
    fundsData: FundRequestData[] = [];
    fundsInvalid = false;
    formattedDate: string;
    public isAdHocSelected = false;
    public isNondefaultSettlementAccount = false;
    products: IproductTransactionForm;
    sales: ISalesFormData;
    refferals: IRefferalTransactionForm;
    isDraftPage = false;
    isEditPage = false;
    trx_id: number;
    yesConfirm = 'Yes, I confirm';
    customClass = 'custom-dialog';
    dangerIcon = 'icon-danger-1';
    deleteDraft = 'delete-draft';
    saveDraftLeave = 'Save Draft and Leave';
    leave = 'Leave without Saving';
    cancel = 'Cancel';
    totalTransactionAmount: number;
    totalFundAmount: ITotalFundAmount;
    isDirty: boolean;
    getNonDefaultAccount$ = this.store.select(getNonDefaultCasaAccount);

    pageType: string;
    fundWarningType: string;
    orderSummaryData: OrderSummaryRouteData;

    pageTitle = this.isEditPage ? 'Edit Subscribe' : 'Transaction Application';

    constructor(
        public dialog: MatDialog,
        public route: Router,
        public activatedRoute: ActivatedRoute,
        public store: Store,
        public snackbarService: SnackbarService,
        private transactionLogoutService: TransactionLogoutService,
        public transactionService: TransactionService,
        private orderSummaryResolver: OrderSummaryResolver,
        private readonly storageService: StorageService,
        private readonly cdr: ChangeDetectorRef,
        private readonly viewportScroller: ViewportScroller,
    ) {

        combineLatest([
            this.store.select(totalTransactionAmount),
            this.store.select(totalFundAmount),
        ]).pipe(
            takeUntil(this._unsubscribeAll$),
            tap(([totalTransactionAmount, totalFundAmount]) => {
                this.totalTransactionAmount = totalTransactionAmount ? totalTransactionAmount : 0;
                this.totalFundAmount = totalFundAmount ? totalFundAmount : {
                    totalAmount: '0',
                    salesChargeAmountTotal: "0",
                    netinvestedAmountToal: "0"
                };
            })
        ).subscribe()

        if (this.route.url.includes('draft')) {
            this.isDraftPage = true;
        } else if (this.route.url.includes('edit')) {
            this.isEditPage = true;
            this.activatedRoute.data.subscribe((res: Data) => {
                const orderSummaryRouteData = res['orderSummaryRouteData'] as OrderSummaryRouteData;
                this.orderSummaryData = orderSummaryRouteData
            })
        }

        if ((this.isEditPage || this.isDraftPage)) {
            this.setEditDraftEnv();
            this.pageTitle = this.isEditPage ? 'Edit Subscribe' : 'Transaction Application';
        }

        this.transactionLogoutService.savedtransactionCallback = () => this.saveDraftTransaction(false);

        this.transactionLogoutService.saveApplication$.pipe(
            takeUntil(this._unsubscribeAll$),
            filter(res => !!res),
            tap(() => this.saveDraftTransaction(false))
        ).subscribe();

    }

    setEditDraftEnv() {
        if (this.isEditPage) {
            if (!!this.orderSummaryData && this.orderSummaryData.transactionId) {
                this.trx_id = +this.orderSummaryData.transactionId
            } else {
                this.trx_id = 0;
            }
        } else {
            const trxStorageId = this.storageService.getItem<string>('transactionId')
            if (this.transactionService.transactionId) {
                this.trx_id = +this.transactionService.transactionId
            } else if (trxStorageId) {
                this.trx_id = +trxStorageId;
            }
        }

        this.store.dispatch(MintOfficeTransacationActions.getDraftTransactionIdDetails({
            data: { trxId: this.trx_id },
        }))
    }

    ngAfterViewInit(): void {
        this.getDraftTransactionIdDetails$.pipe(
            takeUntil(this._unsubscribeAll$),
            filter(res => !!res),
            tap((res: IGetTrxDetailResponse | null) => {
                if (!res) return
                /* istanbul ignore if */
                if (res?.draftExpiryDate) {
                    this.formattedDate = moment(new Date(res.draftExpiryDate), 'DD/MM/YYYY').format("DD MMM YYYY");
                    this.customerDetails = {
                        route: '/customer',
                        isDraft: this.formattedDate,
                        isEnable: true
                    };

                }
                this.handleEditDraft(res);

            })
        ).subscribe()

        this.getNonDefaultAccount$.pipe(map((res) => {
            if (res?.nonDefaultSettlement && res?.nonDefaultSettlement === 1) {
                this.isNondefaultSettlementAccount = true;
            } else {
                this.isNondefaultSettlementAccount = false;
            }
        })).subscribe()
    }

    handleEditDraft(res: IGetTrxDetailResponse) {
        if ((this.isEditPage || this.isDraftPage) && !!res) {
            this.productTransaction.getFundDetailsForTransaction(res.rmaTransactionDetail);
            this.productTransaction.patchInvestmentAccountAndSettleMentAccount(res);
            if (res.rmaTransactionDetail && res.rmaTransactionDetail.length > 0 && !this.transactionService.newTransaction) {
                for (const object of res.rmaTransactionDetail) {
                    if (!(Object.prototype.hasOwnProperty.call(object, 'salesChargeId')) || object?.salesChargeId !== 'adhoc') {
                        this.resetSalesChargeWarning(res);
                        return;
                    }
                }
            }
        }
    }

    dirtyCheckDialog(): Observable<boolean> {
        return this.dialog.open(DialogMessageComponent, {
            panelClass: [this.customClass],
            maxWidth: '670px',
            minHeight: '240px',
            autoFocus: false,
            data: {
                title: 'Confirm to leave this page',
                description: '<div class="content-main-div"><div class="content-divs">Do you want save this draft and proceed to the Customer Profile page?</div><br/><div class="content-divs">Filled values will be removed if you proceed without saving.<br/></div><br/><div class="content-divs"><b>Note:</b>&nbsp;Saved drafts are located in the \'Application Status\' section in the main dashboard and in the Customer Profile pages.</div></div>',
                dialogLeaveButton: true,
                btnOkLabel: this.saveDraftLeave,
                btnCancelLable: this.leave,
                dialogLeaveButtonText: this.cancel,
            },
        }).afterClosed().pipe(
            map(res => {
                /* istanbul ignore if */
                if (res === this.saveDraftLeave) {
                    this.saveDraft(true);
                    this.isDirty = false;
                    return false
                }

                /* istanbul ignore if */
                if (res === this.leave) {
                    location.hash = '#/customer';
                    this.isDirty = false;
                }

                return !(res === this.cancel || !res);
            }),
            switchMap(res => {
                /* istanbul ignore if */
                if (res) {
                    return of(true)
                }

                return combineLatest([this.saveDraftTransactionRes$]).pipe(
                    map(([success]) => !!success)
                )
            })
        )
    }

    transactionFunds(funds: ISearchFundData[]): void {
        this.parentTransactionFunds = funds;
    }

    /* istanbul ignore next */
    onRemoveFunds(fund: ISearchFundData): void {
        this.productTransaction.removeFundFromSearchSelectionList(fund);
    }

    pageTypeData(pageTypeData: string): void {
        this.pageType = pageTypeData;
    }

    fundWarning(arg: string): void {
        this.fundWarningType = arg;
        this.openDialogBox(false);
    }

    onRadioChange(data: trxType): void {
        this.isDirty = data.isChange;
        if (!data.isChange) {
            this.openDraftDialog('').pipe(
                takeUntil(this._unsubscribeAll$)
            ).subscribe(res => {
                /* istanbul ignore next */
                if (res === 'Change Type and Reset') {
                    this.transactionService.transactionType = this.pageType as TransactionType;
                    this.productTransaction.resetAmount();
                    this.productTransaction.searchFunds();

                    this.resetTransactionForms();
                }

                if (res === 'Cancel' || !res) {
                    this.productTransaction.productTransactionForm?.controls.transactionType.setValue(data.previousValue === null ? 'S' : data.previousValue);
                }
            })
        } else {
            this.transactionService.transactionType = this.pageType as TransactionType;
            this.productTransaction.searchFunds();
        }
    }

    /* istanbul ignore next */
    resetTransactionForms(): void {
        this.salesFormComponent.salesForm.reset();
        this.salesFormComponent.transactionForm.reset();

        this.store.dispatch(MintOfficeTransacationActions.setSearchDirtyCheck({ data: false }));
        this.store.dispatch(MintOfficeTransacationActions.subscribedFunds({ data: [] }));
    }

    /* istanbul ignore next */
    createOrCancelConfirmation(command: boolean): void {

        if (!this.totalTransactionAmount) { return }

        if ((this.transactionService.transactionType === 'Subscribe' || this.transactionService.transactionType === 'new') && this.totalTransactionAmount > +this.totalFundAmount.totalAmount) {
            this.openDialogBox(true).pipe(takeUntil(this._unsubscribeAll$)).subscribe(() => {
                this.getTotalTransactionamount();
            });
        } else {
            this.openDialog(command).pipe(
                takeUntil(this._unsubscribeAll$)
            ).subscribe((result) => {
                if (result === this.saveDraftLeave) {
                    this.saveDraft(true);
                } else if (result === this.leave) {
                    this.productTransaction.productTransactionForm.reset();
                    void this.route.navigateByUrl('/customer');
                } else if (
                    result === this.yesConfirm
                ) {
                    this.getFormGroupsValues();
                    this.dispatchCreateApplication(false);
                }
            })
        }
    }

    saveDraft(isCancel: boolean): void {
        this.saveDraftTransaction(isCancel).pipe(
            takeUntil(this._unsubscribeAll$)
        ).subscribe();
    }

    /* istanbul ignore next */
    saveDraftTransaction(isCancel: boolean): Observable<IDraftTransactionResponse> {
        this.getFormGroupsValues();

        const formData: ITransactionAppRequest = this.formatFormData();

        return this.transactionService.createDraftTransaction(formData).pipe(
            filter(r => !!r),
            tap((res: IDraftTransactionResponse) => {
                this.isDirty = false;
                const draftExpiryDate = new Date(res.draftExpiryDate);
                this.formattedDate = moment(draftExpiryDate, 'DD/MM/YYYY').format("DD MMM YYYY")
                const days = moment(draftExpiryDate).diff(new Date(), 'days');

                const message = `Draft saved! Valid for ${days}-days (expires:${this.formattedDate})`;

                this.snackbarService.openSnackBar(message, 'success');
                this.store.dispatch(MintOfficeTransacationActions.saveDraftApplicationSuccess({ data: res }));

                if (!this.isEditPage && !this.isDraftPage) {
                    this.resetTransactionForms();
                    this.productTransaction.productTransactionForm.reset();
                }

                if (res.status === "200") {
                    this.resetTransactionForms();
                    this.productTransaction.productTransactionForm.reset();
                    this.storageService.setItem('transactionId', res.trxId);
                    this.setEditDraftEnv();
                    this.transactionService._newTransaction = true;
                    void this.route.navigateByUrl('/transaction/draft')
                }

                if (isCancel) {
                    void this.route.navigateByUrl('/customer');
                }
            }),
            catchError(error => {
                this.store.dispatch(MintOfficeTransacationActions.saveDraftApplicationFailure({ data: error as string }))
                return throwError(error)
            })

        )



    }

    getFormGroupsValues(): void {

        this.customerSelector$.pipe(
            takeUntil(this._unsubscribeAll$),
            filter(c => !!c),
            map(res => {
                if (res) {
                    const date = new Date().toISOString();
                    this.productTransaction.productTransactionForm.patchValue({
                        rmId: this.storageService.getItem<string>('rmId'),
                        sibsCif: res.cifNumber,
                        customerName: res.coustomer,
                        approverId: this.isAdHocSelected ? this.adHocApproverComponnet.selectedApprover.approverId : null,
                        requestUid: date + (Math.random() * 100).toFixed(0).toString(),
                    })
                }
            })
        ).subscribe()

        this.getDraftTransactionIdDetails$.pipe(
            takeUntil(this._unsubscribeAll$),
            filter(res => !!res),
            map((res: IGetTrxDetailResponse | null) => {
                const date = new Date().toISOString();
                /* istanbul ignore if */
                if (res && this.trx_id) {
                    this.productTransaction.productTransactionForm.patchValue({
                        rmId: this.storageService.getItem<string>('rmId'),
                        sibsCif: res.customerId,
                        customerName: res.customerName,
                        requestUid: date + (Math.random() * 100).toFixed(0).toString(),
                    })
                }
            })
        ).subscribe()

        this.productTransactionForm$
            .pipe(
                takeUntil(this._unsubscribeAll$),
                tap((p) => {
                    if (p && p.formData) {
                        this.products = p.formData
                    }
                })
            )
            .subscribe();

        this.salesForm$
            .pipe(
                takeUntil(this._unsubscribeAll$),
                tap((s) => {
                    if (s && s.formData) {
                        this.sales = s.formData
                    }
                }))
            .subscribe();

        this.refferalFormResponse$
            .pipe(
                takeUntil(this._unsubscribeAll$),
                tap((r) => {
                    if (r && r.formData) {
                        this.refferals = r.formData
                    }
                }))
            .subscribe();

        this.fundsData.forEach(fund => {
            /* istanbul ignore if */
            if (isNaN(+fund.salesChargeRate) && !!fund.salesChargeRate) {
                fund.salesChargeRate = fund.salesChargeRate.toString().slice(0, -1)
            }
        })

        this.fundsData.forEach(fund => {
            fund.totalAmount = isNaN(+fund.totalAmount) ? fund.totalAmount.toString().replace(/,/g, '') : fund.totalAmount;
            fund.salesChargeAmount = isNaN(+fund.salesChargeAmount) ? fund.salesChargeAmount : fund.salesChargeAmount.toString().replace(/,/g, '');
            fund.totalAmount = +fund.totalAmount;
            fund.salesChargeAmount = isNaN(+fund.salesChargeAmount) ? +fund.salesChargeAmount.toString().replace(/,/g, '') : +fund.salesChargeAmount;
            fund.salesChargeRate = +fund.salesChargeRate;
        });

    }

    formatFormData(): ITransactionAppRequest {
        const date = new Date().toISOString();
        if (!this.transactionService.cifNumber) {
            return {} as ITransactionAppRequest;
        }

        let product = { ...this.products };
        if (typeof (this.products.investAccountNo) !== 'string' && this.transactionService.transactionType !== TransactionType.NEW_ACCOUNT) {
            product = {
                ...product,
                investAccountNo: product.investAccountNo['accountNumber']
            }
        } else if(this.transactionService.transactionType === TransactionType.NEW_ACCOUNT) {
            product = {
                ...product,
                investAccountNo: 'New Account'
            }
        }

        if (this.products.settlementAccountNo && typeof (this.products.settlementAccountNo) !== 'string') {
            product = {
                ...product,
                settlementAccountNo: product.settlementAccountNo['accountNumber']
            }
        }

        let formData: ITransactionAppRequest = {
            rmId: this.storageService.getItem<string>('rmId'),
            ...product,
            ...this.sales,
            ...this.refferals,
            currencyCode: '',
            acknowledgement: this.products?.transactionType !== 'R' ? (this.acknowledgement.acknowledgementForm.controls.terms.value as string).toString() : "",
            fund: this.fundsData,
            sibsCif: this.transactionService.cifNumber,
            requestUid: date + (Math.random() * 100).toFixed(0).toString(),
        };

        Object.keys(formData).forEach(key => {
            if (formData[key] === null || formData[key] === undefined || formData[key] === '') {
                delete formData[key];
            }
        })

        if (this.trx_id) {
            formData = {
                trxId: this.trx_id,
                ...formData,
            }
        }

        return formData;
    }

    resetSalesChargeWarning(data: IGetTrxDetailResponse): void {

        if (data.trxType === 'S') {
            this.dialog.open(DialogMessageComponent, {
                panelClass: [this.customClass, 'dialog-inverse-button'],
                minWidth: '520px',
                maxWidth: '570px',
                minHeight: '210px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'Re-enter Sales Charge Amount',
                    icon: this.dangerIcon,
                    description: `<div class="content-main-div"><div class="content-divs">You need to re-select the sales charge option and ensure that all information provided are correct before you resubmit the application.</div></div>`,
                    btnOkLabel: 'Okay',
                },
            }).afterClosed().subscribe(() => {
                this.viewportScroller.scrollToPosition([0, 0]);
            });
        }
    }

    openDialog(command: boolean): Observable<any> {
        return this.dialog.open(DialogMessageComponent, {
            panelClass: [this.customClass],
            maxWidth: command ? '575px' : '520px',
            minHeight: command ? '310px' : '300px',
            autoFocus: false,
            data: {
                title:
                    command
                        ? 'Confirm to cancel Transaction Application'
                        : 'Confirm to create application',
                description:
                    command
                        ? '<div class="content-main-div"><div class="content-divs">Do you want to cancel this application and return to the Customer Profile Page?</div><br/><div class="content-divs">Filled values will be removed if you proceed without saving.<br/></div><br/><div class="content-divs"><b>Note:</b>&nbsp;Saved drafts are located in the \'Application Status\' section in the main dashboard and in the Customer Profile pages.</div></div>'
                        : '<div class="content-main-div"><div class="content-divs">Are you sure you want to create this application?</div><br/><div class="content-divs">Please check all of your information is correct before proceeding.<br/></div><br/><div class="content-divs">If there is a sales charge adhoc request, the system will send to your RD for approval.<br/></div></div>',
                dialogLeaveButton: command ? true : false,
                btnOkLabel: command ? 'Save Draft and Leave' : this.yesConfirm,
                btnCancelLable: command ? 'Leave without Saving' : 'Cancel',
                dialogLeaveButtonText: command ? 'Cancel' : null,
            },
        }).afterClosed();
    }

    /* istanbul ignore next */
    dispatchCreateApplication(showPopUp: boolean = true): void {
        if (this.isEditPage) {
            this.getFormGroupsValues()
        }

        const formData = this.formatFormData();

        if (showPopUp) {

            if (this.transactionService.transactionType === 'Subscribe' && this.totalTransactionAmount > +this.totalFundAmount.totalAmount) {
                this.openDialogBox(true).pipe(
                    takeUntil(this._unsubscribeAll$)
                ).subscribe(() => {
                    this.getTotalTransactionamount();
                });
            } else {
                this.saveForm(formData);
            }

        } else {
            this.saveForm(formData);
        }

    }

    /* istanbul ignore next */
    saveForm(payload: ITransactionAppRequest) {
        this.transactionService.createApplication(payload).pipe(
            takeUntil(this._unsubscribeAll$),
            map((res: ITransactionAppResponse) => {
                const message = this.isEditPage ? 'Edit was saved and resubmitted to RD/ PO (if applicable) for approval.<br> If it is for the customer, please reshare the application with your customer for approval.' : 'you have created the subscription application successfully!';
                this.snackbarService.openSnackBar(message, 'success');
                if (res.status === "200") {
                    this.resetTransactionForms();
                    this.productTransaction.productTransactionForm.reset();
                    this.store.dispatch(MintOfficeTransacationActions.subscribedFunds({ data: [] }));
                    this.store.dispatch(MintOfficeTransacationActions.createApplicationSuccess({ data: res }))
                    this.orderSummaryResolver.transactionRefId = res.transactionRefId;
                    this.orderSummaryResolver.transactionId = res.id;
                    void this.route.navigateByUrl('/orderSummary');
                }
            }
            )
        ).subscribe()
    }

    /* istanbul ignore next */
    onFundDataChange(fundCardData: FundCardStatus[]): void {

        let status = true;
        this.fundsInvalid = true;
        this.fundsData = [];
        for (let index = 0; index < fundCardData.length; index++) {
            const element = fundCardData[index];
            status = element.status === 'VALID' && status;
        }

        if (fundCardData.length <= 0) {
            this.fundsInvalid = true;
        } else {
            this.fundsInvalid = !status;
        }

        this.fundsData = _.map(fundCardData, 'data');

        if (this.fundsData.length) {
            let adhocSlected = false;

            this.fundsData.forEach(f => {
                adhocSlected = f.salesChargeId === 'adhoc' || adhocSlected;
            });

            this.isAdHocSelected = adhocSlected
        }

        this.acknowledgement?.acknowledgementForm.reset();
    }

    delete_Draft(): void {
        this.openDraftDialog(this.deleteDraft).pipe(takeUntil(this._unsubscribeAll$)).subscribe(res => {
            if (res === this.yesConfirm) {

                this.transactionService.deleteCustomerDraft(this.trx_id).pipe(
                    takeUntil(this._unsubscribeAll$),
                    filter(r => !!r),
                    tap(() => {
                        this.openDraftDialog('delete').pipe(takeUntil(this._unsubscribeAll$)).subscribe(data => {
                            if (data === 'Back to Dashboard') {
                                this.resetTransactionForms();
                                this.productTransaction.productTransactionForm.reset();
                                void this.route.navigateByUrl('/home');
                            }
                        });
                    })
                ).subscribe()

            }
        })
    }

    openDraftDialog(source: string): Observable<any> {
        return this.dialog.open(DialogMessageComponent, {
            panelClass: [this.customClass],
            minWidth: source === '' ? '670px' : '520px',
            maxWidth: source === '' ? '670px' : '520px',
            minHeight: source === '' ? '240px' : '200px',
            autoFocus: false,
            backdropClass: source === 'delete' ? 'backdrop-modal' : null,
            data: {
                title: source === 'delete' ?
                    'Draft deleted' : source === this.deleteDraft ?
                        'Confirm to delete draft' : 'Confirm to change the transaction type',
                icon: this.dangerIcon,
                description: source === 'delete' ?
                    `<p> The draft was succesfully deleted.</p>` : source === this.deleteDraft ?
                        `<p> Are you sure you want to delete this application’s draft?</p><p>Deleted drafts cannot be restored.</p>` : '<div class="content-main-div"><div class="content-divs">Are you sure you want to change the transaction type? </div><br/><div class="content-divs">Selected fund(s) in the current transaction cart will be removed and all values will reset <br> to default if you proceed to change.<br/></div></div>',
                btnOkLabel: source === 'delete' ? 'Back to Dashboard' : source === this.deleteDraft ?
                    this.yesConfirm : 'Change Type and Reset',
                btnCancelLable: source === 'delete' ? '' : 'Cancel',
            },
        }).afterClosed();
    }

    /**
     *
     * @returns Get the complete transaction form status
     */
    createApplicationStatus(): Observable<boolean> {
        return combineLatest([
            this.getDeviationStatus(),
            this.productTransactionForm$,
            this.salesForm$
        ]).pipe(
            map(([deviationStatus, productForm, sForm]) => {
                return !deviationStatus && !!productForm && productForm.isValid && !!sForm && sForm.isValid && !this.fundsInvalid;
            })
        )
    }

    /**
     *
     * @returns Deviation Status for fund cart
     */
    getDeviationStatus(): Observable<boolean> {
        return combineLatest([
            this.store.select(riskProfileInquiry),
            this.store.select(subscribeFunds),
        ]).pipe(
            map(([riskProfile, funds]) => {
                if (!funds) return false;
                let deviationEnable = false;
                funds.forEach((f) => {
                    if (!f.details || !riskProfile || !riskProfile?.riskProfile) {
                        return
                    }
                    if (
                        new RiskProfileToRatingPipe().transform(riskProfile.riskProfile) <
                        f.details.riskRating
                    ) {
                        deviationEnable = true;
                    }
                });
                return deviationEnable;
            }),
        );
    }

    openDialogBox(command: boolean): Observable<any> {
        const title = this.fundWarningType === 'Switch' ? 'switching' : 'redemption';
        return this.dialog.open(FundErrorDialogComponent, {
            panelClass: [this.customClass, 'dialog-inverse-button'],
            minWidth: command ? '570px' : '520px',
            maxWidth: command ? '570px' : '520px',
            minHeight: command ? '200px' : '240px',
            autoFocus: false,
            data: {
                title: command ? 'Total Transaction Amount is higher than the Total Investment Amount' : `Insufficient units balance for ${title}`,
                icon: this.dangerIcon,
                description: command ? `<p> The total transaction amount is higher than the total investment amount in your cart.</p><p>Please amend your total transaction amount or increase the subscription amount for the fund(s) added to proceed.</p> ` : `<p> The selected fund has insufficient units balance for ${title}.</p><p> Please add a different fund to ${title === 'switching' ? 'switch' : 'redeem'}.</p>`,
                btnOkLabel: 'Okay',
            },
        }).afterClosed()
    }

    getTotalTransactionamount(): void {
        this.store.dispatch(MintOfficeTransacationActions.enableTransactionAmountError({ data: true }));
        this.store.dispatch(MintOfficeTransacationActions.productTransactionFormData({
            data: { formData: this.productTransaction.productTransactionForm.value as IproductTransactionForm, isValid: this.productTransaction.productTransactionForm.valid },
        }));
        (this.productTransaction.totalAmountDiv.nativeElement as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "start" });
        const dTotalTransactionAmount = this.productTransaction.productTransactionForm.get('dTotalTransactionAmount');
        if (dTotalTransactionAmount) {
            dTotalTransactionAmount.updateValueAndValidity();
            dTotalTransactionAmount.markAllAsTouched();
        }
        this.cdr.detectChanges();
    }

    getIsDirtyCheck(): void {
        combineLatest([
            this.productTransactionForm$,
            this.refferalFormResponse$,
            this.salesForm$,
            this.acknowledgeFormStatus$,
            this.getSearchFormDirtyCheck$
        ]).pipe(
            take(1),
            map(([p, r, s, a, d]) => {
                if (p?.isDirty || r?.isDirty || s?.isDirty || a?.isDirty || !!d) {
                    this.isDirty = true;
                }
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.store.dispatch(MintOfficeTransacationActions.subscribedFunds({ data: [] }));
        this.store.dispatch(MintOfficeTransacationActions.getDraftTransactionIdDetailsSuccess({ data: {} as IGetTrxDetailResponse }))
        this.transactionService.fundCodes = null;
        this.transactionService.transactionId = null;
        this._unsubscribeAll$.next(null);
        this._unsubscribeAll$.complete();
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnload($event: BeforeUnloadEvent) {
        if (this.canDeactivate()) {
            $event.returnValue = true;
        }
    }

    canDeactivate() {
        this.getIsDirtyCheck();

        return this.isDirty;
    }

}
