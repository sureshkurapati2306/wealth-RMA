import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { ITransaction, IRmDetails, ITransactionReq } from '../+state/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient
    ) {
    }

  getTransaction(data: ITransactionReq):Observable<ITransaction> {
    return this.http
      .post<ITransaction>( `${environment.apiUrl}/rma/transactionSummary`, data)
        .pipe(
          map(response =>{
          return response
          }),
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
      );

  }

  getRmDetail(landId: string):Observable<IRmDetails> {
    return this.http
      .get<IRmDetails>(`${environment.apiUrl}/rma/getRmDetail/${landId}`)
        .pipe(
          map(response =>{
          return response
          }),
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
      );
  }

}
