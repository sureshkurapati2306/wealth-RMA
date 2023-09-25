import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IRiskProfileDataRequest, IRiskProfileDataResponse, RPQuestionnaireRequest, RPQuestionnaireResponse, RPQTnxReq, RPQTnxResponse, CustomerStatusPayload, CustomerStatusResponse } from '../models/risk-inquiry-detail.model';
import { IRiskProfileSummaryRequest, IRiskProfileSummaryResponse, IGetcustomerProfileRequest, ICustomerMobileResponse, IRiskProfileMobileRequest, IActivatedApprovalLinkRequest, IActivatedApprovalLinkResponse, IActivateApprovalLinkRequest } from '../models/risk-profile-summary.model';
import { environment } from '../../../../environments/environment';
import { URL } from '@cimb/mint-office';

@Injectable()
export class RiskProfileService {
    constructor(

        private readonly httpService: HttpService,
        private https: HttpClient
    ) {
    }
    /* istanbul ignore next */
    getRiskProfileInquiryData(
        payload: IRiskProfileDataRequest,
    ): Observable<IRiskProfileDataResponse> {
        return this.httpService
            .post(environment.apiUrl, URL.GET_CUSTOMER_RISK_PROFILE_INQUIRY_DATA, payload)
            .pipe(
                map((response: { data: any; status: any }) => {
                    return response.data as IRiskProfileDataResponse;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    getCustomerRiskProfileSummary(
        payload: IRiskProfileSummaryRequest,
    ): Observable<IRiskProfileSummaryResponse> {
        return this.httpService
            .post(environment.apiUrl, URL.GET_RISK_PROFILE_SUMMARY, payload)
            .pipe(
                map((response) => {
                    return response as IRiskProfileSummaryResponse;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    getCustomerRiskProfileMobile(
        payload: IGetcustomerProfileRequest,
    ): Observable<ICustomerMobileResponse> {
        return this.httpService
            .get(environment.apiUrl, `${URL.GET_RISK_PROFILE_CUSTOMER_MOBILE}/${payload.cif}`)
            .pipe(
                map((response) => {
                    return response as ICustomerMobileResponse;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    updateRiskProfileMobile(payload: IRiskProfileMobileRequest): Observable<any> {
        return this.https
            .put(environment.apiUrl+ '/'+ URL.UPDATE_MOBILE_NUMBER, payload)
            .pipe(
                map(() => {
                    return {mobileNumber: payload.mobileNumber};
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    updateActivatedApprovalLink(payload: IActivatedApprovalLinkRequest): Observable<IActivatedApprovalLinkResponse> {
        return this.httpService
            .get(environment.apiUrl, `${URL.ACTIVATED_APPROVAL_LINK}/${payload.transactionId}`)
            .pipe(
                map((response) => {
                    return response as IActivatedApprovalLinkResponse;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    activateApprovalLink(payload: IActivateApprovalLinkRequest): Observable<IActivatedApprovalLinkResponse> {
        return this.https
            .put(environment.apiUrl + `/${URL.ACTIVATE_APPROVAL_LINK}/${payload.id}`, {})
            .pipe(
                map((response) => {
                    return response as IActivatedApprovalLinkResponse;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    getMockRiskProfileData(cifNumber: RPQuestionnaireRequest, isEdit: boolean): Observable<RPQuestionnaireResponse> {
        return this.https
        .post<RPQuestionnaireResponse>(environment.apiUrl+ '/'+ (!isEdit ? URL.GET_RISK_PROFILE_QUESTIONNAIRES_AND_ANSWERS : URL.GET_RISK_PROFILE_SUMMURY_EDIT), cifNumber)
            .pipe(
                map((response) =>{
                    return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    createRPQTnx(rpqTnxReq: RPQTnxReq): Observable<RPQTnxResponse> {
        return this.https.post<RPQTnxResponse>(environment.apiUrl + '/' + URL.CREATE_RPQ_TNX, rpqTnxReq)
            .pipe(
                map((response: RPQTnxResponse) => {
                    return response;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            )
    }

    checkCustomerStatus(payload: CustomerStatusPayload): Observable<CustomerStatusResponse> {
        return this.https.post<CustomerStatusResponse>(environment.apiUrl + '/' + URL.GET_CHECK_CUSTOMER_STATUS, payload)
            .pipe(
                map((response: CustomerStatusResponse) => {
                    return response;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            )
    }
}
