import { HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HttpService } from "@cimb/core";
import { DialogMessageComponent, Environment, URL } from "@cimb/mint-office";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IRiskProfileInquiryRequest, IRiskProfileInquiryResponse } from "../../transaction/models/risk-profile.model";
import { CustomerInvestment, IUpdateEmailRequest, GetSettingsParam } from "../models/customer.model";

@Injectable()
export class CustomerService {

    private readonly environment: Environment;
    constructor(
        @Inject('environment') environment: Environment,
        private readonly httpService: HttpService,
        private readonly _dialog: MatDialog,
    ) {
        this.environment = environment
    }

    getRiskProfileInquiry(payload: IRiskProfileInquiryRequest): Observable<IRiskProfileInquiryResponse> {
        return this.httpService.post(this.environment.apiUrl, URL.GET_CUSTOMER_RISK_PROFILE_INQUIRY, payload).pipe(
            map((response:{data:any, status:any}) => {
                return response.data as IRiskProfileInquiryResponse
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    getTotalInvestment(cifNumber: string): Observable<CustomerInvestment> {
        return this.httpService.post(this.environment.apiUrl, URL.GET_CUSTOMER_INVESTMENT, { cifNumber }).pipe(
            map((response:CustomerInvestment) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    updateCustomerEmail(payload: IUpdateEmailRequest) : Observable<string>{
        return this.httpService.put(this.environment.apiUrl,URL.UPDATE_CUSTOMER_EMAIL , payload).pipe(
            map((response: string) => {
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }


    getSettingsParam(): Observable<GetSettingsParam> {
        return this.httpService.get(this.environment.apiUrl, URL.GET_SETTINGS_PARAM).pipe(
            map((response:GetSettingsParam) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    openVerifyCustomerDetailPopup(): Observable<string> {
        return this._dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
            maxWidth: '520px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                btnOkLabel: 'Yes, I have verified',
                icon: 'icon-danger-1',
                btnCancelLable: 'Return to Customer Profile',
                title: `Verify Customer’s Details`,
                description: `<p><strong>Important:</strong> Please verify the full customer’s details before proceeding.</p>
                <p>Also, check and confirm the customer’s mobile number or select a different number (if available) for their digital approval.</p>`,
            },
        }).afterClosed() as Observable<string>;
    }

    }
