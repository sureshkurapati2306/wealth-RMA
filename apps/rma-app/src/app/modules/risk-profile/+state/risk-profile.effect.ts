import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, finalize, map, switchMap } from "rxjs/operators";
import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as RiskProfileAction from './risk-profile.action';
import { RiskProfileService } from "../services/risk-profile.service";
import { IRiskProfileDataResponse, RPQTnxResponse, CustomerStatusResponse } from "../models/risk-inquiry-detail.model";
import { IRiskProfileSummaryResponse, ICustomerMobileResponse } from "../models/risk-profile-summary.model";
import { loadingBarActions } from "@cimb/mint-office";

@Injectable()
export class RiskProfileEffect {

    constructor(
        private actions$: Actions,
        private readonly riskProfileService: RiskProfileService,
        private readonly store: Store
    ) {}

    getRiskProfileInquiryData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.getRiskProfileInquiryDetail),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.getRiskProfileInquiryData(action.data).pipe(
                    map((response: IRiskProfileDataResponse) => {
                        return RiskProfileAction.getRiskProfileInqiryDetailSuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.getRiskProfileInqiryDetailFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    getRiskProfileSummary$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.getRiskProfileSummary),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.getCustomerRiskProfileSummary(action.data).pipe(
                    map((response: IRiskProfileSummaryResponse) => {
                        return RiskProfileAction.getRiskProfileSummarySuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.getRiskProfileSummaryFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    getRiskProfileMobileNo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.getRiskProfileMobileNo),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.getCustomerRiskProfileMobile(action.data).pipe(
                    map((response: ICustomerMobileResponse) => {
                        return RiskProfileAction.getRiskProfileMobileNoSuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.getRiskProfileMobileNoFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    updateRiskProfileMobile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.updateRiskProfileMobile),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.updateRiskProfileMobile(action.data).pipe(
                    map((response: ICustomerMobileResponse) => {
                        return RiskProfileAction.updateRiskProfileMobileSuccess({data: response})
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.updateRiskProfileMobileFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    updateActivatedApprovalLink$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.updateActivatedApprovalLink),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.updateActivatedApprovalLink(action.data).pipe(
                    map((response) => {
                        return RiskProfileAction.updateActivatedApprovalLinkSuccess({data: response});
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.updateActivatedApprovalLinkFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    activateApprovalLink$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.activateApprovalLink),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.activateApprovalLink(action.data).pipe(
                    map((response) => {
                        return RiskProfileAction.updateActivatedApprovalLinkSuccess({data: response});
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.activateApprovalLinkFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),

        );
    });

    updateRiskProfileQuestionnaire$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.updateRiskProfileQuestionnaireReq),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.riskProfileService.createRPQTnx(action.data).pipe(
                    map((response: RPQTnxResponse) => {
                        return RiskProfileAction.updateRiskProfileQuestionnaireRes({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.updateRiskProfileQuestionnaireFailure({ data: error.message }))),

                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                )
            }),
        );
    });

    getCustomerStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RiskProfileAction.getCustomerStatus),
            switchMap((action) => {
                return this.riskProfileService.checkCustomerStatus(action.data).pipe(
                    map((response: CustomerStatusResponse) => {
                        return RiskProfileAction.getCustomerStatusSuccess({ data: response }) as Action;
                    }),
                    catchError((error: HttpErrorResponse) => of(RiskProfileAction.getCustomerStatusFailure({ data: error.message })))
                )
            }),
        );
    });
}
