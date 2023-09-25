/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('HttpService', () => {
    let service: HttpService;
    let httpClient: HttpClient;
    const notFoundMsg = 'Mock 404 error';

    const throwErr = (error: HttpErrorResponse) => {
        expect(error.error).toBe(notFoundMsg);
        expect(error.status).toBe(404);
      }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpService],
        });
        service = TestBed.inject(HttpService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return error(404) for invalid get request', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: notFoundMsg,
            status: 404
        });
        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.get('', '').subscribe(
            () => { done.fail('') },
            (err) => {
                throwErr(err);
                done();
            });
    })

    it('should return error(404) for invalid put request', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: notFoundMsg,
            status: 404
        });
        jest.spyOn(httpClient, 'put').mockReturnValue(throwError(errorResponse));
        service.put('', '').subscribe(
            () => { done.fail('') },
            (err) => {
                throwErr(err);
                done();
            });
    })

    it('should return error(404) for invalid patch request', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: notFoundMsg,
            status: 404
        });
        jest.spyOn(httpClient, 'patch').mockReturnValue(throwError(errorResponse));
        service.patch('', '').subscribe(
            () => { done.fail('') },
            (err) => {
                throwErr(err);
                done();
            });
    })

    it('should return error(404) for invalid post request', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: notFoundMsg,
            status: 404
        });
        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));
        service.post('', '').subscribe(
            () => { done.fail('') },
            (err) => {
                throwErr(err);
                done();
            });
    })

    it('should return error(404) for invalid delete request', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: notFoundMsg,
            status: 404
        });
        jest.spyOn(httpClient, 'delete').mockReturnValue(throwError(errorResponse));
        service.delete('', '').subscribe(
            () => { done.fail('') },
            (err) => {
                throwErr(err);
                done();
            });
    })

    it('should return success get request', (done) => {
        const successResponse = {
            success: 'true',
            status: 200
        };
        jest.spyOn(httpClient, 'get').mockReturnValue(of(successResponse));
        service.get('', '').subscribe(
            (data) => {
                expect(data).toEqual(successResponse);
                done();
             })
    })

    it('should return success post request', (done) => {
        const successResponse = {
            success: 'true',
            status: 200
        };
        jest.spyOn(httpClient, 'post').mockReturnValue(of(successResponse));
        service.post('', '').subscribe(
            (data) => {
                expect(data).toEqual(successResponse);
                done();
             })
    })

    it('should return success patch request', (done) => {
        const successResponse = {
            success: 'true',
            status: 200
        };
        jest.spyOn(httpClient, 'patch').mockReturnValue(of(successResponse));
        service.patch('', '').subscribe(
            (data) => {
                expect(data).toEqual(successResponse);
                done();
             })
    })

    it('should return success put request', (done) => {
        const successResponse = {
            success: 'true',
            status: 200
        };
        jest.spyOn(httpClient, 'put').mockReturnValue(of(successResponse));
        service.put('', '').subscribe(
            (data) => {
                expect(data).toEqual(successResponse);
                done();
             })
    })

    it('should return success delete request', (done) => {
        const successResponse = {
            success: 'true',
            status: 200
        };
        jest.spyOn(httpClient, 'delete').mockReturnValue(of(successResponse));
        service.delete('', '').subscribe(
            (data) => {
                expect(data).toEqual(successResponse);
                done();
             })
    })
});
