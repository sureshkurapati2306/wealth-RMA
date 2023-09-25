/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INonDefaultAccount, INonDefaultAccountResponse } from './../+state/transaction.models';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Branch, IFundDataRequest, IFundDataResponse, IPastPerformanceResponse, ITransactionAppRequest, ITransactionAppResponse, IDraftTransactionResponse, IDeleteDraftResponse, IGetTransactionIdRequest, ISearchFundData } from '../+state/transaction.models';
import { catchError, map } from 'rxjs/operators';
import { APPROVER, FundDetail, FundDetailQueryParam, FundDocument, IFundRequest, IFundSummuryDetail, ISwitchOutFundRequest } from '../models/funds.model';
import { IRiskProfileInquiryRequest, IRiskProfileInquiryResponse, IGetTrxDetailResponse } from '../models/risk-profile.model';
import { MatDialog } from '@angular/material/dialog';
import { ISalesChargeDropDowmRequest, ISalesChargeDropDowmResponse } from '../models/sales-charge.model';
import { DialogMessageComponent, TransactionType, URL, ITransactionValidityResponse } from '@cimb/mint-office';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {

    private _transactionType!: TransactionType;
    private _cifNumber!: string | null;
    private _transactionId!: string | null;
    private _fundCodes!: string[] | null;
    public _newTransaction : boolean | null;

    constructor(
        private http: HttpClient,
        public readonly dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------------------
    // @Accessors Method
    // -----------------------------------------------------------------------------------------------------------------

    set transactionType(type: TransactionType) {
        this._transactionType = type;
    }

    get transactionType(): TransactionType {
        return this._transactionType;
    }

    set cifNumber(cifNumber: string | null) {
        this._cifNumber = cifNumber;
    }

    get cifNumber(): string | null {
        return this._cifNumber;
    }

    set transactionId(id: string | null) {
        this._transactionId = id;
    }

    get transactionId(): string | null {
        return this._transactionId;
    }

    set fundCodes(codes: string[] | null) {
        if(!codes) {
            this._fundCodes = [];
            return
        }
        this._fundCodes = [...codes];
    }

    get fundCodes(): string[] | null {
        return this._fundCodes;
    }

    get newTransaction(): boolean | null {
        return this._newTransaction;
    }


    getSearchFunds(data: IFundDataRequest): Observable<IFundDataResponse> {
        const url = `${environment.apiUrl}/${(this._transactionType !== TransactionType.NEW && this._transactionType !== TransactionType.NEW_ACCOUNT && this.transactionType != TransactionType.SUBSCRIBE && this._transactionType) ? URL.GET_FUND_SEARCH_FOR_REDEEM_AND_SWITCH : URL.GET_SEARCH_FUNDS}`;
        if(this._transactionType !== TransactionType.NEW && this._transactionType !== TransactionType.NEW_ACCOUNT && this.transactionType != TransactionType.SUBSCRIBE && this._transactionType) {
            data = {...data, isActiveCustomerHoldings: true};

            if(this._transactionType === TransactionType.SWITCH) {
                data = {...data, transactionType: 'SWO'}
            }

            if(this._transactionType === TransactionType.REEDEEM) {
                data = {...data, transactionType: 'R'}
            }
        } else {
            data = {...data, transactionType: 'S'}
        }

        return this.http.post<IFundDataResponse>(url, data).pipe(
            map(response => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getAllBranches(): Observable<Branch[]> {
        const url = `${environment.apiUrl}/${URL.GET_BRANCH_DROPDOWN}`
        return this.http.get<Branch[]>(url).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getPastPerformance(data: string): Observable<IPastPerformanceResponse[]> {
        const url = `${environment.apiUrl}/${URL.GET_PAST_PERFORMANCE}/${data}`;
        return this.http.get<IPastPerformanceResponse[]>(url).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getFundDetails(payload: FundDetailQueryParam): Observable<FundDetail> {
        let params = new HttpParams();
        for (const key in payload) {
            if (Object.prototype.hasOwnProperty.call(payload, key)) {
                const element = payload[key as keyof FundDetailQueryParam] as string;
                params = params.set(key, element)
            }
        }
        const url = `${environment.apiUrl}/${URL.GET_FUND_DETAIL}`;
        return this.http.get<FundDetail>(url, { params }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    /* istanbul ignore next */
    getPerformanceChart(data: IFundRequest): Observable<Array<[string, number]>> {
        const url = `${environment.apiUrl}/${URL.GET_PREFORMANCE_CHART}`
        return this.http.post<Array<[string, number]>>(url, data).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getRiskProfileInquiry(payload: IRiskProfileInquiryRequest): Observable<IRiskProfileInquiryResponse> {
        const url = `${environment.apiUrl}/${URL.GET_CUSTOMER_RISK_PROFILE_INQUIRY}`;
        return this.http.post<{ data: any, status: any }>(url, payload).pipe(
            map(response => {
                return response.data as IRiskProfileInquiryResponse
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    getFundDetailSummury(payload: { fundCode: string }): Observable<IFundSummuryDetail> {
        const url = `${environment.apiUrl}/${URL.GET_FUND_DETAIL_SUMMURY}?fundCode=${payload.fundCode}`;
        return this.http.post(url, {}).pipe(
            map((response) => {
                return response as IFundSummuryDetail;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    createApplication(data: ITransactionAppRequest): Observable<ITransactionAppResponse> {
        const url = `${environment.apiUrl}/${URL.CREATE_TRANSACTION_APPLICATION}`
        return this.http.post<ITransactionAppResponse>(url, data).pipe(
            map(response => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    downloadDocument(document: FundDocument): Observable<any> {
        const headers = new HttpHeaders(
            { 'content-type': 'application/json' }
        );
        const url = `${environment.apiUrl}/${URL.GET_FUND_DOCUMENT}`;
        return this.http.post<any>(url,
            {
                fileUrl: document.msUrl,
                fileName: document.documentName
            },
            {
                responseType: 'blob' as 'json',
                headers: headers,
            }
        ).pipe(
            map(
                (res) => {
                    return new Blob([res], { type: 'application/pdf' });
                }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    openFundRemoveConfirmation(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return this.dialog.open(DialogMessageComponent, {
            // panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '520px',
            maxWidth: '520px',
            minHeight: '200px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: 'Confirm to remove fund',
                // icon: 'icon-danger-1',
                description: `<p>Are you sure you want to remove this fund?</p><p>Filled values in the fund’s card will not be saved if you proceed to remove the fund.</p>`,
                btnOkLabel: 'Yes, Remove the Fund',
                btnCancelLable: 'Cancel',
            },
        }).afterClosed();
    }

    getActiveApprover(): Observable<APPROVER[]> {
        const url = `${environment.apiUrl}/${URL.GET_ACTIVATE_APPROVER}`;
        return this.http.get<APPROVER[]>(url).pipe(
            map((response: APPROVER[]) => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    deleteCustomerDraft(transactionId: number): Observable<IDeleteDraftResponse> {
        const url = `${environment.apiUrl}/${URL.DELETE_CUSTOMER_DRAFT}/${transactionId}`
        return this.http.delete(url).pipe(
            map((response) => {
                return response as IDeleteDraftResponse
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    createDraftTransaction(data: ITransactionAppRequest): Observable<IDraftTransactionResponse> {
        const url = `${environment.apiUrl}/${URL.CREATE_DRAFT_TRANSACTION}`
        return this.http.post<IDraftTransactionResponse>(url, data).pipe(
            map(response => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getDraftTransactionIdDetails(data: IGetTransactionIdRequest): Observable<IGetTrxDetailResponse>{
        const url = `${environment.apiUrl}/${URL.GET_SAVED_DRAFT_TRXID}/${data.trxId}`;

        return this.http.get<IGetTrxDetailResponse>(url).pipe(
            map((response: IGetTrxDetailResponse) => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    getSalesChargeDropDown(data: ISalesChargeDropDowmRequest): Observable<ISalesChargeDropDowmResponse[]>{
        const url = `${environment.apiUrl}/${URL.GET_SALES_CHARGE_DROP_DOWN}`;

        return this.http.post<ISalesChargeDropDowmResponse[]>(url, data).pipe(
            map(response => response),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    getSwitchOutFunds(data: ISwitchOutFundRequest): Observable<ISearchFundData[]> {
        const url = `${environment.apiUrl}/${URL.GET_SWITCH_OUT_FUNDS}`;

        return this.http.post<{ fundData: ISearchFundData[]}>(url, data).pipe(
            map(response => {
                return response.fundData
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    getNonDefaultAccount(data: INonDefaultAccount): Observable<INonDefaultAccountResponse>{
        const url = `${environment.apiUrl}/${URL.GET_CHECK_NON_DEFAULT_ACCOUNT}`;

        return this.http.post<INonDefaultAccountResponse>(url,data).pipe(
            map(response => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error)
            })
        )

    }

    getTrxValidaityStatus(trxId: string): Observable<ITransactionValidityResponse> {
        return this.http.get<ITransactionValidityResponse>(environment.apiUrl + '/' + URL.TRANSACTION_VALIDITY_CHECK + trxId).pipe(
            map((response: ITransactionValidityResponse) => response),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

}
