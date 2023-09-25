import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { URL } from '@cimb/mint-office';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { TitleSalutations, GenderList, CitizenList, RaceList, ReligionList, MaritalList, IndustryList, ICustomerType, OccupationList, CountryList, ICustomerProfileData, AddressTypeList, StateList } from '../model/new-investment.model';

@Injectable()
export class NewApplicationService {


    constructor(
        private readonly httpService: HttpService,
    ) {

    }

    getCustomertype(): Observable<ICustomerType[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_CUSTOMERTYPE).pipe(
            map((response: ICustomerType[]) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getCustomerProfile(cifNumber: string): Observable<ICustomerProfileData> {
        return this.httpService.post(environment.apiUrl, URL.GET_RISK_PROFILE_CUSTOMER_MOBILE, { cif: cifNumber }).pipe(
            map((response: ICustomerProfileData) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        )
    }


    getTitleSalutations(): Observable<TitleSalutations[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_TITLESALUTATION_DROPDOWN).pipe(
            map((res: TitleSalutations[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getGenderList(): Observable<GenderList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_GENDER_DROPDOWN).pipe(
            map((res: GenderList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getCountryList(): Observable<CountryList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_NATIONALITY_DROPDOWN).pipe(
            map((res: CountryList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getCitizenList(): Observable<CitizenList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_CITIZEN_DROPDOWN).pipe(
            map((res: CitizenList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getRaceList(): Observable<RaceList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_RACE_DROPDOWN).pipe(
            map((res: RaceList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getReligionList(): Observable<ReligionList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_RELIGION_DROPDOWN).pipe(
            map((res: ReligionList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getMartialStatusList(): Observable<MaritalList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_MARITAL_DROPDOWN).pipe(
            map((res: MaritalList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getIndustryList(): Observable<IndustryList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_INDUSTRY_DROPDOWN).pipe(
            map((res: IndustryList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getOccupationList(): Observable<OccupationList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_PROFESSIONAL_DROPDOWN).pipe(
            map((res: OccupationList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getAddressTypeList(): Observable<AddressTypeList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_ADDRESS_TYPES).pipe(
            map((res: AddressTypeList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getStatesList(): Observable<StateList[]> {
        return this.httpService.get(environment.apiUrl, URL.GET_STATES_DROPDOWN).pipe(
            map((res: StateList[]) => res),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

}
