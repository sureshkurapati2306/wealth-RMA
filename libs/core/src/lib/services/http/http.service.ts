/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    defaultHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private _http: HttpClient) {}

    public formatErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
        return throwError(error);
    }

    get(
        url: string,
        path: string,
        params: HttpParams = new HttpParams(),
        options = {},
    ): Observable<any> {
        const httpOptions = {
            ...this.defaultHttpOptions,
        };
        return this._http
            .get(`${url}/${path}`, { params, headers: httpOptions.headers, ...options })
            .pipe(catchError(err => this.formatErrors(err)));
    }

    put(url: string, path: string, body: Record<string, any> = {}, options = {}): Observable<any> {
        const httpOptions = {
            ...this.defaultHttpOptions,
            ...options,
        };
        return this._http
            .put(`${url}/${path}`, body, httpOptions)
            .pipe(catchError(err => this.formatErrors(err)));
    }

    patch(
        url: string,
        path: string,
        body: Record<string, any> = {},
        options = {},
    ): Observable<any> {
        const httpOptions = {
            ...this.defaultHttpOptions,
            ...options,
        };
        return this._http
            .patch(`${url}/${path}`, JSON.stringify(body), httpOptions)
            .pipe(catchError(err => this.formatErrors(err)));
    }

    post(url: string, path: string, body: Record<string, any> = {}, options = {}): Observable<any> {
        const httpOptions = {
            ...this.defaultHttpOptions,
            ...options,
        };
        return this._http
            .post(`${url}/${path}`, body, httpOptions)
            .pipe(catchError(err => this.formatErrors(err)));
    }

    delete(url: string, path: string): Observable<any> {
        return this._http.delete(`${url}/${path}`).pipe(catchError(err => this.formatErrors(err)));
    }
}
