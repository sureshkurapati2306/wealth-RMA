import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Customer, CustomerProfile } from '../models/customer.model';
import { Environment } from '../models/environment.model';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
readonly environment: Environment;
  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Environment,
    ) {
      this.environment = environment;
  }
  getAllCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`assets/mock/customer.json`)
        .pipe(
          map(response =>{
          return response
          }),
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
      );
  }

  getCoustomerProfile(cifNumber: string): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(`${this.environment.apiUrl}/rma/getCustomerProfile`, { cif: cifNumber }).pipe(
        map((response: CustomerProfile) => response),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        }),
    )
}

}
