import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { HttpService } from "@cimb/core";
import { DialogMessageComponent, Environment } from "@cimb/mint-office";
import { StoreModule } from "@ngrx/store";
import { of, throwError } from "rxjs";
import { CustomerInvestmentMock, MockGetSettingsParam } from "../mock/customer-state.mock";
import { CustomerService } from "./customer.service";

class MockHttpService {
    post() { /* mock */ }
    get() { /* mock */ }
    put() { /* mock */ }
}

class MockMatDialog {
    open() { /* mock */ }
}
const MockRiskProfileInquiryRequest = {
    cifNumber: 1234,
    custName: 'inquiery',
    custIdType: '123456',
    custIdNo: '123',
    custIdIssue: '1234567AB'
}
describe('CustomerService', () => {
    let service: CustomerService;
    let httpService: HttpService;
    let dialog: MatDialog

    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DialogMessageComponent,
            ],
            imports: [
                StoreModule.forRoot({}),
                MatDialogModule
            ],
            providers: [
                CustomerService,
                {
                    provide: 'environment', useValue: environment
                },
                {
                    provide: HttpService, useClass: MockHttpService
                },
                {
                    provide: MatDialog, useClass: MockMatDialog,
                }
            ]
        });
        service = TestBed.inject(CustomerService);
        httpService = TestBed.inject(HttpService);
        dialog = TestBed.inject(MatDialog);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call block getRiskProfileInquiry with error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpService, 'post').mockReturnValue(throwError(errorResponse));
        service.getRiskProfileInquiry(MockRiskProfileInquiryRequest).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(404);
                done();
            })
    });

    it('should call block getTotalInvestment with error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        jest.spyOn(httpService, 'post').mockReturnValue(throwError(errorResponse));
        service.getTotalInvestment('123').subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(404);
                done();
            })
    });

    it('should call block getTotalInvestment with success path', (done) => {
        jest.spyOn(httpService, 'post').mockReturnValue(of(CustomerInvestmentMock));
        service.getTotalInvestment('123').subscribe(
            (data) => {
                expect(data).toEqual(CustomerInvestmentMock);
                done();
            },
        )
    });

    it('should call updateCustomerEmail with success path', (done) => {
        const mockRequest = {
            cif: '1234567testcif',
            email: 'testemail@cimb.com'
        }

        jest.spyOn(httpService, 'put').mockReturnValue(of('email successfully updated'));

        service.updateCustomerEmail(mockRequest).subscribe(
            (data) => {
                expect(data).toEqual('email successfully updated');
                done();
            },
        )
    });

    it('should call block updateCustomerEmail with error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });

        const mockRequest = {
            cif: '1234567test1',
            email: 'test1email@cimb.com'
        }

        jest.spyOn(httpService, 'put').mockReturnValue(throwError(errorResponse));

        service.updateCustomerEmail(mockRequest).subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(404);
                done();
            })
    });

    it('should call getSettingParam succes path', (done) => {
        jest.spyOn(httpService, 'get').mockReturnValue(of(MockGetSettingsParam));
        
        service.getSettingsParam().subscribe(
            (data) => {
                expect(data).toEqual(MockGetSettingsParam);
                done();
            },
        )
    });

    it('should call getSettingParam with error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404
        });
        
        jest.spyOn(httpService, 'get').mockReturnValue(throwError(errorResponse));
        
        service.getSettingsParam().subscribe(
            () => { done.fail('') },
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(404);
                done();
            })
    });

    it('should open mat dialog to verify profile', (done) => {
        const openDialogSpy = jest.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of('Yes, I have verified')} as MatDialogRef<typeof DialogMessageComponent>)

        service.openVerifyCustomerDetailPopup().subscribe((data) => {
            expect(openDialogSpy).toHaveBeenCalled();
            expect(data).toBe('Yes, I have verified');
            done();
        })
    })


})
