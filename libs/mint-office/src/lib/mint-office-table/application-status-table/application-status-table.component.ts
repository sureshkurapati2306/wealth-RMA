/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable sonarjs/no-duplicate-string */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {
    ProductType,
    ApplicationStatus,
    Transaction,
    ITransactionType,
    TransactionDataRequestDTO,
} from '../models/application-status.model';
import { tap, map, switchMap, finalize } from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
import { Observable, of, timer } from 'rxjs';
import { TransactionDataSource } from './transaction-table.datasource';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderSummaryResolver } from '../../core/resolvers/order-summary.resolver';
import { RiskProfileResolver, RiskProfileSummaryResolver, NewApplicationResolver } from '../../core/resolvers';
import { StorageService } from '../../core/services/storage.service';
import { TransactionService } from '../../../../../../apps/rma-app/src/app/modules/transaction/services/transaction.service';
import { CustomerResolver } from '../../core/resolvers/customer.resolver';
import { ITransactionValidityResponse } from '../models/customer-holding.model';
import { DialogAlertComponent } from '../../mint-office-ui-dialog/dialog-alert/dialog-alert.component';
import { DialogMessageComponent } from '../../mint-office-ui-dialog/dialog-message/dialog-message.component';
import { getCoustomer } from '../../core/+state/mint-office.actions';

@Component({
    selector: 'cimb-office-application-status-table',
    templateUrl: './application-status-table.component.html',
    styleUrls: ['./application-status-table.component.scss'],
    providers: [
        { provide: MatDialogRef, useValue: null }
    ]
})
export class ApplicationStatusTableComponent implements OnInit {
    @Input() displayedColumns: string[] = [
        'CREATED_ON',
        'COUSTOMER',
        'TYPE',
        'REF_ID',
        'STATUS',
        'ACTION',
    ];
    @Input() sortHeader: string[] = ['CREATED_ON', 'COUSTOMER'];
    @Input() pageSize = 10;

    @Input() showProductTypeHeading = true;
    @Input() showHeader = false;
    @Input() filterHeadings = {
        date: 'FILTER BY CREATION DATE',
        type: 'FILTER BY TYPE',
        status: 'FILTER BY STATUS',
    };
    datasource: TransactionDataSource;
    filterForm: UntypedFormGroup;
    resetEnable = false;
    avaialbleTypesOptions: string[] = [];
    availableStatusOption: string[] = [];
    productTypeOtion = ProductType;
    applicationStatusOption = ApplicationStatus;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('allSelectedType') allSelectedType: MatOption;
    @ViewChild('allSelectedStatus') allSelectedStatus: MatOption;

    cifNumber = '10330000219671';
    transactionType = 'RPQ Update';

    @Input() getRmDetailsResponse$: Observable<any>;
    @Output() goToTransaction: EventEmitter<any> = new EventEmitter();

    constructor(
        private readonly _fb: UntypedFormBuilder,
        public readonly store: Store,
        private readonly router: Router,
        public readonly dialog: MatDialog,
        private readonly riskProfileResolver: RiskProfileResolver,
        private readonly riskProfileSummaryResolver: RiskProfileSummaryResolver,
        private readonly orderSummaryResolver: OrderSummaryResolver,
        private readonly newApplicationResolver: NewApplicationResolver,
        private readonly storageService: StorageService,
        private readonly transactionService: TransactionService,
        private readonly customerResolver: CustomerResolver,
        private _matDialogRef: MatDialogRef<any> | null
    ) {
        this.datasource = new TransactionDataSource(this.store);
    }

    get f(): UntypedFormGroup {
        return this.filterForm;
    }

    createForm(): void {
        const types = ITransactionType;
        this.avaialbleTypesOptions = Object.values(types) as string[];
        const status = ApplicationStatus;
        this.availableStatusOption = Object.values(status) as string[];

        this.filterForm = this._fb.group({
            productType: [ProductType.UT],
            rmId: [''],
            pageNo: [0],
            pageSize: [this.pageSize],
            days: new UntypedFormControl(''),
            sortingFieldsOrder: [['creationDate.desc']],
            transactionType: new UntypedFormControl([0]),
            transactionStatus: new UntypedFormControl([0]),
        });
    }

    ngOnInit(): void {
        this.createForm();
        this.setRmId();
        this.filterForm.controls.days.setValue('93');
    }

    loadData(): void {
        timer(20)
            .pipe(
                tap(() => {
                    this.datasource.loadLession(this.filterForm.value as TransactionDataRequestDTO);
                }),
            )
            .subscribe();
    }

    /* istanbul ignore next */
    onSelectedNone(): void {
        if ((this.filterForm.controls.transactionType.value as []).length === 0) {
            this.filterForm.controls.transactionType.patchValue([...[0]]);
        }

        if ((this.filterForm.controls.transactionStatus.value as []).length === 0) {
            this.filterForm.controls.transactionStatus.patchValue([...[0]]);
        }
    }

    sortData(sort: Sort): void {

        if (!sort.direction) {
            this.sort.direction = sort.direction = 'asc';
        }

        this.f.get('pageNo')?.patchValue(0);
        switch (sort.active) {
            case 'CREATED_ON':
                this.f.get('sortingFieldsOrder')?.patchValue([`creationDate.${sort.direction}`]);
                break;
            case 'COUSTOMER':
                this.f.get('sortingFieldsOrder')?.patchValue([`customerName.${sort.direction}`]);
                break;
        }
        this.loadData();
    }

    getStatusColor(row: Transaction): string[] {
        const arr: string[] = [];
        const status = (row.applicationStatus as string).toLowerCase().trim();
        if (status === 'rejected') {
            arr.push('rejected');
        } else if (status === 'pending approval') {
            arr.push('pending');
        } else if (status === 'confirmed') {
            arr.push('confirmed');
        } else if (status === 'draft') {
            arr.push('draft');
        } else if (status === 'approved') {
            arr.push('approved');
        } else if (status === 'processing') {
            arr.push('processing');
        } else if (status === 'completed') {
            arr.push('completed');
        }
        return arr;
    }

    isSortingEnable(columnName: string): boolean {
        return this.sortHeader.includes(columnName);
    }

    reset(): void {
        this.createForm();
        this.setRmId();
        this.filterForm.controls.days.setValue('93');
        this.resetEnable = false;
    }

    togglePerOne(control: string): void {
        if (control === 'transactionType') {
            if (this.allSelectedType.selected) {
                this.allSelectedType.deselect();
                return;
            }
            if ((this.f.get('transactionType')?.value as []).length == this.avaialbleTypesOptions.length) {
                this.allSelectedType.select();
                this.f.get('transactionType')?.patchValue([...this.avaialbleTypesOptions]);
            }
        } else {
            if (this.allSelectedStatus.selected) {
                this.allSelectedStatus.deselect();
                return;
            }
            if ((this.f.get('transactionStatus')?.value as []).length == this.availableStatusOption.length) {
                this.allSelectedStatus.select();
                this.f.get('transactionStatus')?.patchValue([...this.availableStatusOption]);
            }
        }
        this.setResetEnableStatus()
    }

    toggleAllSelection(control: string): void {
        if (control === 'transactionType') {
            if (this.allSelectedType.selected) {
                this.f.get('transactionType')?.patchValue([...[0]]);
            } else {
                this.f.get('transactionType')?.patchValue([]);
            }
        } else {
            if (this.allSelectedStatus.selected) {
                this.f.get('transactionStatus')?.patchValue([...[0]]);
            } else {
                this.f.get('transactionStatus')?.patchValue([]);
            }
        }
        this.setResetEnableStatus();
    }

    setProductType(productType: ProductType): void {
        const formValue = {
            productType: productType,
            pageNo: 0,
            pageSize: this.pageSize,
            days: '',
            sortingFieldsOrder: [],
            transactionType: [0],
            transactionStatus: [0],
        };
        this.f.patchValue(formValue);
        this.filterForm.controls.days.setValue('93');
        this.loadData();
    }

    /* istanbul ignore next */
    paginate(): void {
        const { pageSize, pageIndex } = this.paginator;
        this.f.get('pageSize')?.patchValue(pageSize);
        this.f.get('pageNo')?.patchValue(pageIndex);
        this.loadData();
    }

    getStatus(row: string): string {
        let status = '';
        switch (row as ApplicationStatus) {
            case ApplicationStatus.Confirm:
                status = 'Confirmed';
                break;
            case ApplicationStatus.Draft:
                status = 'Draft';
                break;
            case ApplicationStatus.Pending:
                status = 'Pending Approval';
                break;
            case ApplicationStatus.Reject:
                status = 'Rejected';
                break;
            case ApplicationStatus.Approved:
                status = 'Approved';
                break;
            case ApplicationStatus.Completed:
                status = 'Completed';
                break;
            case ApplicationStatus.Processing:
                status = 'Processing';
                break;
            default:
                status = 'N/A';
                break;
        }
        return status;
    }

    getType(option: string): string {
        let type = '';
        switch (option as ITransactionType) {
            case ITransactionType.Bundle:
                type = 'Bundle';
                break;
            case ITransactionType.Redeem:
                type = 'Redeem';
                break;
            case ITransactionType.Subscribe:
                type = 'Subscribe';
                break;
            case ITransactionType.Switch:
                type = 'Switch';
                break;
            case ITransactionType.RPQ_Update:
                type = 'RPQ Update';
                break;
        }
        return type;
    }

    setResetEnableStatus(): void {
        const form = this.f.controls;
        if (
            ((form.transactionType.value as []).length === 0 && !this.allSelectedType.selected) ||
            ((form.transactionStatus.value as []).length === 0 && !this.allSelectedStatus.selected)) {
            this.resetEnable = true;
        }
    }

    isFilterEnable(): boolean {
        const transactionType: any[] = this.f.get('transactionType')?.value as any[];
        const transactionStatus: any[] = this.f.get('transactionStatus')?.value as any[];
        return (
            !!this.f.get('days')?.value ||
            (transactionType.length === 1 &&
                transactionType[0] != '0') ||
            transactionType.length > 1 ||
            (transactionStatus.length === 1 &&
                transactionStatus[0] != '0') ||
            transactionStatus.length > 1
        );
    }

    /* istanbul ignore next */
    setRmId(): void {
        const rmId = this.storageService.getItem('rmId');
        if (rmId) {
            this.filterForm.controls.rmId.setValue(rmId);
            this.loadData();
        } else {
            this.getRmDetailsResponse$
            .pipe(
                map((data) => {
                    if (data) {
                        this.filterForm.controls.rmId.setValue(data.rmId);
                        this.loadData();
                    }
                }),
            )
            .subscribe();
        }
    }


    onActionClick(row: Transaction): Promise<boolean> | void{

        this.transactionService._newTransaction = false;
        this.store.dispatch(getCoustomer({cifNumber: this.cifNumber}));

        // For Non-Drafted Transaction
        if(row.applicationStatus.toString() !== 'Draft') {
            if (row.transactionType.toString() === this.transactionType) {
                this.riskProfileResolver.cifNumber = this.cifNumber
                this.riskProfileSummaryResolver.trxId = row.id ? row.id.toString() : "";
                return this.router.navigateByUrl('/risk-profile/summary');
            }

            this.orderSummaryResolver.transactionId = row.id ? row.id.toString() : "";
            this.orderSummaryResolver.transactionRefId = row.refId ? row.refId.toString() : "";
            this.orderSummaryResolver.cifNumber = this.cifNumber;
            this.transactionService.cifNumber = this.cifNumber;
            this.customerResolver.cifNumber = this.cifNumber;
            return this.router.navigate(['/orderSummary']);
        }

        this.checkValidityForTransaction(row).pipe(
            switchMap(async(res) => {
                if(res !== '200') {
                    return of(null)
                }

                // For Draftd Transaction
                if(row.rpExpiry === false) {
                    const obj = {
                        transactionId: row.id ? row.id.toString() : "",
                        cifNumber: this.cifNumber
                    };

                    if(row.transactionType.toString() === 'Bundle'){
                        this.newApplicationResolver.cifNumber = this.cifNumber;
                        await this.router.navigate(['/new-application']);

                        return of(null);
                    }

                    this.goToTransaction.emit(obj);
                    return of(null)
                }



                if(row.transactionType.toString() !== 'Redeem' && row.transactionType.toString() !== this.transactionType){
                    return this.dialog.open(DialogMessageComponent, {
                        panelClass: ['custom-dialog', 'dialog-inverse-button'],
                        minWidth: '430px',
                        maxWidth: '430px',
                        minHeight: '250px',
                        autoFocus: false,
                        backdropClass: 'backdrop-modal',
                        data: {
                            title: 'Customer’s Risk Profile Has Expired',
                            icon: 'icon-danger-1',
                            description: `<div class="content-main-div">
                                    <div class="content-divs"> The customer’s risk profile has expired.</div>
                                        <br/>
                                        <div class="content-divs">
                                            Please update their risk profile before you can proceed with their draft/ transaction application.
                                            <br/>
                                        </div>
                                    </div>
                                </div>`,
                            btnOkLabel: 'Update risk profile',
                            btnCancelLable: 'Cancel'
                        },
                    }).afterClosed().pipe(
                        switchMap((res) => {
                            if(res === 'Update risk profile' && row.rpqApprovalStatus=== 'Y') {
                                return this.dialog.open(DialogMessageComponent, {
                                    panelClass: ['custom-dialog'],
                                    maxWidth:  '520px',
                                    minHeight:  '245px',
                                    autoFocus: false,
                                    data: {
                                    title: 'Pending Risk Profile Update Approval',
                                    description: `<div class="content-main-div">
                                        <div class="content-divs">You have previously submitted a risk profile update and it is pending for customer’s approval.
                                        </div><br/><div class="content-divs">To proceed with the application, please inform the customer to approve their risk profile update first.<br/></div</div>`,
                                    dialogLeaveButton: false,
                                    btnOkLabel: 'Okay',
                                    },
                                }).afterClosed().pipe(map(() => false));
                            } else if(res === 'Update risk profile' && row.rpqApprovalStatus !== 'Y') {
                                return of(true);
                            } else {
                                return of(false);
                            }
                        })).pipe(tap((res) => {
                            if(res) {
                                void this.router.navigate([`/risk-profile/edit`]);
                            }
                    }));
                } else if(row.transactionType.toString() === 'Redeem') {
                    const obj = {
                        transactionId: row.id ? row.id.toString() : "",
                        cifNumber: this.cifNumber
                    };

                    this.goToTransaction.emit(obj);
                    return of(null)
                } else if(row.transactionType.toString() === this.transactionType) {
                    // redirection in case or RPQ update drafted transaction
                }

                return of(null)
            })
        ).subscribe();
    }

    checkValidityForTransaction(row: Transaction) {
        return  this.transactionService.getTrxValidaityStatus(row.id.toString()).pipe(
            switchMap((validity: ITransactionValidityResponse) => {
                if(validity.statusCode === '9001') {
                    return this.openLicenceExpiredDialog();
                }
                const trxType = row.transactionType.toString().toLowerCase();
                if(
                    validity.statusCode === '9002' && (
                    trxType === 'subscribe' ||
                    trxType === 'bundle' ||
                    trxType === 'switch')
                ) {
                    return this.openAmlOrCasaPopup();
                }

                if(validity.statusCode === '9003' && (
                    trxType === 'subscribe' ||
                    trxType === 'bundle' ||
                    trxType === 'switch')
                ) {
                    return this.openAmlOrCasaPopup(true);
                }
                return of(validity.statusCode);
            })
        )
    }

    openLicenceExpiredDialog(): Observable<string> {
        if(this._matDialogRef) return of("");
        this._matDialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
            maxWidth: '600px',
            minHeight: '498px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Okay',
                dialogImage: '<em class="icon-danger"></em>',
                dialogHeading: 'Your license has expired or unavailable',
                dialogContent:
                    `<div>
                        <p class="mb-0">Record shows that you either have:</p>
                        <ul class="mt-0">
                            <li><p class="mb-0">Invalid/ expired UT license,</p></li>
                            <li><p class="mb-0">Invalid/ expired FIMM license OR</p></li>
                            <li><p class="mb-0">Licensing information unavailable.</p></li>
                        </ul>

                        <p>The customer profile will be in read-only mode and you are not allowed to create any applications.</p>
                    </div>`,
            },
        });

        return this._matDialogRef.afterClosed().pipe(
            finalize(() => this._matDialogRef = null)
        ) as Observable<string>;
    }

    openAmlOrCasaPopup(isCasa: boolean = false): Observable<string> {
        if(this._matDialogRef) return of("");
        this._matDialogRef =  this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '530px',
            maxWidth: '530px',
            minHeight: isCasa ? '220px' : '280px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: isCasa ? 'Customer’s CASA Not Valid for Transaction' : 'Unable to proceed with this Customer',
                icon: 'icon-danger-1',
                description: isCasa ? `<p>Customer’s selected CASA is no longer valid for transaction because the account is either closed, inactive, a foreign account or a Joint-And account.</p>` :`
                <p>Unable to proceed because the customer’s name is present in one of the sanction lists or under high risk category as per AML guideline.</p>
                <p>Customer is not permitted to do account opening, and/ or to apply for any investment applications.</p>`,
                btnOkLabel: 'Okay',
            },
        });

        return this._matDialogRef.afterClosed().pipe(
            finalize(() => this._matDialogRef = null)
        ) as Observable<string>;
    }

}
