import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { Environment } from '../../core/models/environment.model';
import { TableService } from './table.service';
import { mockData } from '../mock/customer-holding-mock.data';
import { mockRequest, mockResponse } from '../mock/application-status-mock.data';

const errorMessage = 'Mock 404 error';

describe('AuthService', () => {
    let service: TableService;
    let httpClient: HttpClient;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [
                {
                    provide: 'environment', useValue: environment
                }
            ]
        });
        service = TestBed.inject(TableService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getTransacation success path', (done) => {

        jest.spyOn(httpClient, 'post').mockReturnValue(of(
            mockResponse
        ));

        service.getTransaction(mockRequest).subscribe(data => {
            console.log('data ', data);
            expect(data).toEqual(mockResponse);
            done();
        });

    });

    it('should call getTransacation error path', (done) => {

        const errorResponse = new HttpErrorResponse({
            error: errorMessage,
            status: 404
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getTransaction(mockRequest)
            .subscribe(
                () => { done.fail('') },
                (error: HttpErrorResponse) => {
                    expect(error.error).toBe(errorMessage);
                    expect(error.status).toBe(404);
                    done();
                });
    });

    it('should call getInvestmentTransaction() success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(
            of({
                investmentType: 'CASH',
                utAccountNo: 'A1234',
                productType: 'UT',
                pageSize: 10,
                pageNo: 0,
                sortingFieldsOrder: ['fundName.desc', 'navPrice.asc', 'roi.desc'],
            }),
        );

        service.getInvestmentTransaction(mockData).subscribe((data) => {
            expect(data).toEqual(mockData);
            done();
        });
    });

    it('should call getInvestmentTransaction() error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: errorMessage,
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getInvestmentTransaction(mockData).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error).toBe(errorResponse);
                done();
            },
        );
    });

});
