import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { NewApplicationService } from '../services/new-application.service';
import * as NewInvestmentApplicationAction from './new-application.actions';
import { CitizenList, CountryList, GenderList, ICustomerType, RaceList, TitleSalutations, ReligionList, MaritalList, IndustryList, OccupationList, AddressTypeList } from '../model/new-investment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from "rxjs";
import { Store } from '@ngrx/store';
import { loadingBarActions } from '@cimb/mint-office';

@Injectable()
export class NewApplicationEffect {

    getCustomertype$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getCustomertype().pipe(
                    map((response: ICustomerType[]) => {
                        return NewInvestmentApplicationAction.getCustomerTypeDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });


    titleSalutations$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getTitleSalutations().pipe(
                    map((response: TitleSalutations[]) => {
                        return NewInvestmentApplicationAction.getTitleSalutationsDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });


    genderList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getGenderList().pipe(
                    map((response: GenderList[]) => {
                        return NewInvestmentApplicationAction.getGenderListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    nationalityList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getCountryList().pipe(
                    map((response: CountryList[]) => {
                        return NewInvestmentApplicationAction.getCountryListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    citizenList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getCitizenList().pipe(
                    map((response: CitizenList[]) => {
                        return NewInvestmentApplicationAction.getCitizenListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    raceList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getRaceList().pipe(
                    map((response: RaceList[]) => {
                        return NewInvestmentApplicationAction.getRaceListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    religionList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getReligionList().pipe(
                    map((response: ReligionList[]) => {
                        return NewInvestmentApplicationAction.getReligionListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    martialStatusList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getMartialStatusList().pipe(
                    map((response: MaritalList[]) => {
                        return NewInvestmentApplicationAction.getMaritalListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    industryList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getIndustryList().pipe(
                    map((response: IndustryList[]) => {
                        return NewInvestmentApplicationAction.getIndustryListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    professionList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getOccupationList().pipe(
                    map((response: OccupationList[]) => {
                        return NewInvestmentApplicationAction.getOccupationListDataSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAllDropDownDataFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    addressTypeList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getAddressTypeList().pipe(
                    map((response: AddressTypeList[]) => {
                        return NewInvestmentApplicationAction.getAddressTypeListSuccess({ data: response });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getAddressTypeListFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    statesList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NewInvestmentApplicationAction.getAllDropDownData),
            exhaustMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.investmentApiService.getStatesList().pipe(
                    map((response) => {
                        return NewInvestmentApplicationAction.getStatesListSuccess({ data: response  });
                    }),
                    catchError((error: HttpErrorResponse) => of(NewInvestmentApplicationAction.getStatesListFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });


    constructor(
        private actions$: Actions,
        private investmentApiService: NewApplicationService,
        private readonly store: Store
    ) {

    }
}
