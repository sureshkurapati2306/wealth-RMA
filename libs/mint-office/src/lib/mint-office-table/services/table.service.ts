import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL } from '../../core/constants/api-url';
import { Environment } from '../../core/models/environment.model';
import { TransactionDataRequestDTO, TransactionDataResponseDTO } from '../models/application-status.model';
import { InvestmentTransaction, ITransactionList, ITransactionValidityResponse } from '../models/customer-holding.model';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    readonly environment: Environment;

    constructor(
        @Inject('environment') environment: Environment,
        private http: HttpService,
    ) {
        this.environment = environment;
    }

    getTransaction(data: TransactionDataRequestDTO): Observable<TransactionDataResponseDTO> {
        return this.http.post(this.environment.apiUrl, URL.GET_TRANSACTION, data).pipe(
            map((response: TransactionDataResponseDTO) => response),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getInvestmentTransaction(data: InvestmentTransaction): Observable<ITransactionList> {
        return this.http
            .post(this.environment.apiUrl, URL.CUSTOMER_HOLDING_TABLE, data)
            .pipe(
                map((response: ITransactionList) => response),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

}
