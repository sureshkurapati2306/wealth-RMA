import { Component, EventEmitter, Input, OnDestroy, OnInit, Output,ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable, forkJoin, Subject, of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import * as Actions from '../../+state/transaction.actions';
import { IFundDataRequest, ISearchFundData } from '../../+state/transaction.models';
import { productTransactionForm, subscribeFunds, transactionFundsResponse } from '../../+state/transaction.selectors';
import { RmSearchFilterComponent } from '../rm-search-filter/rm-search-filter.component';
import * as _ from 'lodash-es'
import { CategoryValue, ClassValue, FundTypeValue } from '../../enum/filter-value.enum';
import { MatDialog } from '@angular/material/dialog';
import { FundDetail, FundDetailQueryParam } from '../../models/funds.model';
import { TransactionService } from '../../services/transaction.service';
import { IRmaTransactionDetail } from '../../models/risk-profile.model';
import { FundErrorDialogComponent, TransactionType } from '@cimb/mint-office';


@Component({
    selector: 'cimb-office-search-funds',
    templateUrl: './rm-search-funds.component.html',
    styleUrls: ['./rm-search-funds.component.scss'],
})
export class RmSearchFundsComponent implements OnInit, OnDestroy {
    transactionFundsResponse$ = this.store.select(transactionFundsResponse).pipe(filter(d => !!d), map(funds => {
        if(!funds) {
            return [] as ISearchFundData[];
        }
        const activefund = funds.filter(f => f &&  (f.fundStatus !== 'C' && f.fundStatus !== 'D'));
        const inActivefund = funds.filter(f => f && (f.fundStatus === 'C' || f.fundStatus === 'D'));
        return [...activefund, ...inActivefund];
    }));
    subscribeFunds$: Observable<ISearchFundData[] | null> = this.store.select(subscribeFunds);
    public addedFunds: ISearchFundData[] = [];
    public formSubscription: Subscription;
    public availableFunds: ISearchFundData[] = [];
    productTransactionForm$ = this.store.select(productTransactionForm).pipe(filter(a => !!a))
    @Input() funds: string[] = [];
    @Input() getBoolean: boolean;

    @Output() informParent = new EventEmitter();
    @Output() inSufficientFunds = new EventEmitter();
    @ViewChild(RmSearchFilterComponent) searchFilter: RmSearchFilterComponent;

    private _unSubscriber$ = new Subject();

    public formGroup = new UntypedFormGroup({
        fundName: new UntypedFormControl(''),
    });

    constructor(
        private store: Store,
        private readonly dialog: MatDialog,
        private readonly transactionService: TransactionService,
    ) {
    }

    ngOnInit(): void {

        this.listenSubscribeFunds();
        this.formSubscription = this.formGroup.controls.fundName.valueChanges.pipe(
            debounceTime(500),
            filter((x: string) => x?.length > 2 || x?.length === 0),
            map(() => {
                this.store.dispatch(Actions.setSearchDirtyCheck({data: this.formGroup.dirty}))
                this.searchFunds();
            }),
        ).subscribe();

        if(this.transactionService.fundCodes && this.transactionService.fundCodes.length > 0) {
            this.setFund(this.transactionService.fundCodes);
        }

        this.subscribeFunds$.pipe(
            filter(x => !!x),
            tap(funds => {
                if(!funds || (funds && funds.length === 0)) {
                    this.addedFunds = [];
                }
            })
        ).subscribe();

        this.productTransactionForm$.pipe(
            filter(x => !!x),
            tap(a => {
                if (
                    !!a &&
                    a.formData?.investAccountNo &&
                    this.formGroup.controls.fundName.disabled
                ) {
                    this.formGroup.controls.fundName.enable();
                    return;
                }

                if(
                    !!a &&
                    !a.formData?.investAccountNo &&
                    this.formGroup.controls.fundName.enabled
                ) {
                    this.formGroup.controls.fundName.disable();
                }

                if(this.transactionService.transactionType === TransactionType.NEW_ACCOUNT) {
                    this.formGroup.controls.fundName.enable();
                }

            })
        ).subscribe();

    }

    listenSubscribeFunds(): void {
        this.subscribeFunds$.pipe(tap(funds => this.availableFunds = funds ? funds : [])).subscribe();
    }

    setFund(fundCodes: string[]): void {
        this.transactionFundsResponse$.pipe(
            filter(res => !!res),
            take(1),
            tap(allFunds => {
                const selectedFunds = allFunds?.filter(f => fundCodes.includes(f.fundCode));
                selectedFunds?.forEach(fund => this.addFunds(fund));
            }
        )).subscribe();
    }

    /* istanbul ignore next */
    searchFunds(): void {
        const fundName = this.formGroup.controls.fundName.value as string;
        const fundRequest: IFundDataRequest = {
            fundName: fundName ? fundName : '',
            cifNumber: "10330000219671",
            accountNo:[
                '640826135254'
            ],
            riskCategory: this.searchFilter?.category?.length ? this.getSelectedCategory() as string[] : [],
            assetClass: this.searchFilter?.class?.length ? this.getSelectedClasses() as string[] : [],
            fundType: this.searchFilter?.fund?.length ? this.getSelectedFunds() as string[] : [],
        };

        this.store.dispatch(Actions.getSearchFunds({ data: fundRequest }));
    }

    /* istanbul ignore next */ //removed after add funds api is integrated
    addFunds(option: ISearchFundData, fundNameInput?: HTMLInputElement): void {
        if(option.fundStatus ==='C' || option.fundStatus === 'D' ) return;
        if(fundNameInput) fundNameInput.blur();

        const selectedFund = this.addedFunds.findIndex(f => f.fundId === option.fundId);
        if(selectedFund !== -1) {
            this.removeFunds(option);
            return;
        }

        if(
            this.addedFunds.length === 4 &&
            (this.transactionService.transactionType === TransactionType.NEW ||
                this.transactionService.transactionType === TransactionType.SUBSCRIBE)
        ) {
            this.opendialog();
            return
        }

        if(this.addedFunds.length === 1 &&
            ((this.transactionService.transactionType === TransactionType.SWITCH ||
            this.transactionService.transactionType === TransactionType.REEDEEM))
        ) {
            this.opendialog();
            return
        }

        this.formGroup.reset();
        this.addedFunds.push(option);
        this.getFundDetails(option);
        this.informParent.emit(this.addedFunds);
    }

    removeFunds(option: ISearchFundData): void {
        this.openConfirmation(option).subscribe();
    }

    openConfirmation(option: ISearchFundData): Observable<any> {
        return this.transactionService.openFundRemoveConfirmation().pipe(
            tap((response) => {
                /* istanbul ignore else */
                if(response) {
                    this.addedFunds = this.addedFunds.filter(f=> f.fundId !== option.fundId);
                    const updatedFunds = this.availableFunds.filter(f => f.fundId !== option.fundId);
                    this.store.dispatch(Actions.subscribedFunds({ data: updatedFunds }));
                }
            })
        )
    }

   allowFundsCart(data:FundDetail){

        const pledgeUnits = !!data.pledgeUnit && data.pledgeUnit > 0 ? +data.pledgeUnit : 0;
        const minHolding = !!data.minHolding && data.minHolding > 0 ? data.minHolding : 0;
        const revisedUnits = data.unitsHeld-pledgeUnits-minHolding;
        const minRealizationUnits = !!data.minRealizationUnit && data.minRealizationUnit > 0 ? +data.minRealizationUnit : 0 ;

        return (revisedUnits <= 0 || revisedUnits < minRealizationUnits);
   }

    /* istanbul ignore next */
    getFundDetails(fund: ISearchFundData): void {
        const payload: FundDetailQueryParam = {
            fundCode: fund.fundCode.toString(),
            utAccountNumber: 640826135255
        }
        this.transactionService.getFundDetails(payload).pipe(
            tap((data: FundDetail) => {
            this.store.dispatch(Actions.setSearchDirtyCheck({data: true}));

            let selectedFund: ISearchFundData | undefined  = this.addedFunds.find(f => f.fundId === data.fundId);
            const fundCart = (this.transactionService.transactionType === TransactionType.SWITCH || this.transactionService.transactionType === TransactionType.REEDEEM);

            if(this.allowFundsCart(data) && fundCart) {
                this.inSufficientFunds.emit(this.transactionService.transactionType);
                const updatedFunds = this.availableFunds.filter(f => f.fundId !== fund.fundId);
                this.store.dispatch(Actions.subscribedFunds({ data: updatedFunds }));
                return;
            }

            if(selectedFund) {
                selectedFund = {...selectedFund, details: {...data, fundCode: payload.fundCode}};

                let funds = this.availableFunds;

                if(funds.findIndex(f => f.fundId === selectedFund?.fundId) === -1) {

                    funds = [...funds, selectedFund];

                    const activefund = funds.filter(f => f && f.details && (f.details.fundStatus !== 'C' && f.details.fundStatus !== 'D'));
                    const inActivefund = funds.filter(f => f && f.details && (f.details.fundStatus === 'C' || f.details.fundStatus === 'D'));
                    funds = [...activefund, ...inActivefund];

                    /// dispatch here

                    this.store.dispatch(Actions.subscribedFunds({data: funds}));
                }
            }
        }),
        catchError(err => {
            const updatedFunds = this.availableFunds.filter(f => f.fundId !== fund.fundId);
            this.store.dispatch(Actions.subscribedFunds({ data: updatedFunds }));
            return of(err);
        })
        ).subscribe();

    }

    ngOnDestroy(): void {
        this.formSubscription.unsubscribe();
    }

    opendialog():Observable<any> {
        const data:{
            title: string,
            icon: string,
            btnOkLabel: string,
            description: string
        } = {
            title: "",
            description: "",
            icon: "icon-danger-1",
            btnOkLabel: "Okay"
        };
        if(this.transactionService.transactionType === TransactionType.REEDEEM) {
            data.title = 'Redemption cart is full';
            data.description = `<p>The redemption fund cart is full. Only one (1) fund is allowed per redemption application.</p><p>Please remove the fund in the cart in order to add a different one.</p>`;
        } else if(this.transactionService.transactionType === TransactionType.SWITCH) {
            data.title = 'Switch fund cart is full';
            data.description = `<p>The switch fund cart is full. Only one (1) fund is allowed per switching application.</p><p>Please remove the fund in the cart in order to add a different one.</p>`;
        } else {
            data.title = "Subscribe funds cart is full";
            data.description = `<p>The subscription cart is full. Only four (4) funds is allowed per subscription application.</p><p>Please remove at least one fund in order to add a different one.</p>`;
        }
        return this.dialog.open(FundErrorDialogComponent, {
              panelClass: ['custom-dialog', 'dialog-inverse-button'],
              minWidth: '430px',
              maxWidth: '430px',
              minHeight: '260px',
              autoFocus: false,
              backdropClass: 'backdrop-modal',
              data: data,
          }).afterClosed()
    }

    /* istanbul ignore next */
    getSelectedCategory(): any[] {
        const categories = _.cloneDeep(this.searchFilter.category);
        const index = categories.findIndex(c => c.value === CategoryValue.All_CATEGORY);
        if(index !== -1) categories.splice(index, 1);

        const mcrcIndex = categories.findIndex(c => c.value === CategoryValue.MCRC);
        if(mcrcIndex !== -1) return [1, 2, 3, 4, 5];
        return _.map(categories, 'value');
    }

    /* istanbul ignore next */
    getSelectedClasses(): any[] {
        const classes = _.cloneDeep(this.searchFilter.class);
        const index = classes.findIndex(c => c.value === ClassValue.ALL_CLASSES);
        if(index !== -1) classes.splice(index, 1);

        return _.map(classes, 'value');
    }

    /* istanbul ignore next */
    getSelectedFunds(): any[] {
        const funds = _.cloneDeep(this.searchFilter.fund);
        const index = funds.findIndex(c => c.value === FundTypeValue.ALL_FUND);
        if(index !== -1) funds.splice(index, 1);

        return _.map(funds, 'value');
    }

    isFundAdded(option: ISearchFundData): boolean {
        const index = this.addedFunds.findIndex(f => f.fundCode === option.fundCode);
        return index !== -1;
    }

    /* istanbul ignore next */
    initFundDetails(fund: IRmaTransactionDetail[]): void {

        if(!fund) return;

        this._unSubscriber$ = new Subject();

        const reqArr: Observable<FundDetail>[] = fund.map(f => {
            return this.transactionService.getFundDetails({
                utAccountNumber: 640826135255,
                fundCode: f.fundCode,
            })
        });

        forkJoin(reqArr).pipe(
            filter(r => !!r),
            takeUntil(this._unSubscriber$),
            map(res => {
                return fund.map((f, index) => {
                    const fundDetails = res[index];
                    if(!fundDetails) return null;

                    return {
                        fundCode: f.fundCode,
                        fundId: fundDetails.fundId,
                        fundName: fundDetails.fundName,
                        fundStatus: fundDetails.fundStatus,
                        details: fundDetails,
                        subscribeFundDetails: f
                    } as ISearchFundData;
                })
            }),
            map(fundSearchData => {
                const activefund = fundSearchData.filter(f => f && f.details?.fundStatus !== 'C' && f?.details?.fundStatus !== 'D');
                const inActivefund = fundSearchData.filter(f => f && f.details?.fundStatus === 'C' || f?.details?.fundStatus === 'D');
                return [...activefund, ...inActivefund];
            })
        ).pipe(switchMap(data => {
            return this.transactionFundsResponse$.pipe(map(searchFund => {
                return data.map(d => {
                    const selected = searchFund?.find(o => o.fundCode === d?.fundCode);
                    return {
                        ...selected,
                        details: d?.details,
                        subscribeFundDetails: d?.subscribeFundDetails
                    }
                 })
            }))
        })).subscribe((res) => {
            this.store.dispatch(Actions.subscribedFunds({data: res as ISearchFundData[]}));
            this._unSubscriber$.next(null);
            this._unSubscriber$.complete();
        });

    }



}
