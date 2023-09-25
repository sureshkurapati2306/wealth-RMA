import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { Environment, URL } from '@cimb/mint-office';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IGetOrderSummary, TrxRefId, SendRemainder } from '../../risk-profile/models/risk-profile-summary.model';
@Injectable()
export class OrderSummaryApiService {

    private readonly environment: Environment;
    constructor(
        @Inject('environment') environment: Environment,
        private readonly httpService: HttpService,
    ) {
        this.environment = environment;
    }

    getOrderSummary(refId: string): Observable<IGetOrderSummary> {
        return this.httpService.post(this.environment.apiUrl, `${URL.GET_ORDER_SUMMARY}`, {refId :refId}).pipe(
            map((response: IGetOrderSummary) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

    sendingRemainder(data:TrxRefId): Observable<SendRemainder>{
        return this.httpService.post(this.environment.apiUrl, `${URL.POST_SEND_REMAINDER_ORDER_SUMMERY}`, data).pipe(
            map((response: SendRemainder)=>{
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }

}
