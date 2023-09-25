import { createAction, props } from '@ngrx/store';
import { IRiskProfileDataRequest, IRiskProfileDataResponse, RPQTnxReq, RPQTnxResponse, CustomerStatusPayload, CustomerStatusResponse } from '../models/risk-inquiry-detail.model';
import { IGetcustomerProfileRequest, ICustomerMobileResponse, IRiskProfileSummaryRequest, IRiskProfileSummaryResponse, IRiskProfileMobileRequest, IActivatedApprovalLinkRequest, IActivatedApprovalLinkResponse, IActivateApprovalLinkRequest } from '../models/risk-profile-summary.model';

export const getRiskProfileInquiryDetail = createAction(
    '[RiskProfile/API] Get Risk Profile Inquiry',
    props<{ data: IRiskProfileDataRequest }>(),
);

export const getRiskProfileInqiryDetailSuccess = createAction(
    '[RiskProfile/API] Risk Profile Inquiry Success',
    props<{ data: IRiskProfileDataResponse }>(),
)

export const getRiskProfileInqiryDetailFailure = createAction(
    '[RiskProfile/API] Risk Profile Inquiry Failure',
    props<{ data: string }>(),
);

export const getRiskProfileMobileNo = createAction(
    '[RiskProfile/API] Get Risk Profile Mobile No',
    props<{ data: IGetcustomerProfileRequest }>(),
);

export const getRiskProfileMobileNoSuccess = createAction(
    '[RiskProfile/API] Get Risk Profile Mobile Success',
    props<{ data: ICustomerMobileResponse }>(),
)

export const getRiskProfileMobileNoFailure = createAction(
    '[RiskProfile/API] Get Risk Profile Mobile Failure',
    props<{ data: string }>(),
);

export const getRiskProfileSummary = createAction(
    '[RiskProfile/API] Get Risk Profile Summary',
    props<{ data: IRiskProfileSummaryRequest }>(),
);

export const getRiskProfileSummarySuccess = createAction(
    '[RiskProfile/API] Get Risk Profile Summary Success',
    props<{ data: IRiskProfileSummaryResponse }>(),
)

export const getRiskProfileSummaryFailure = createAction(
    '[RiskProfile/API] Get Risk Profile Summary Failure',
    props<{ data: string }>(),
);

export const updateRiskProfileMobile = createAction(
    '[RiskProfile/API] Update Risk Profile Mobile',
    props<{ data: IRiskProfileMobileRequest }>(),
);

export const updateRiskProfileMobileSuccess = createAction(
    '[RiskProfile/API] Risk Profile Mobile Success',
    props<{ data: ICustomerMobileResponse }>(),
)

export const updateRiskProfileMobileFailure = createAction(
    '[RiskProfile/API] Risk Profile Mobile Failure',
    props<{ data: string }>(),
);

export const updateActivatedApprovalLink = createAction(
    '[RiskProfile/API] Update Activated Approval Link',
    props<{ data: IActivatedApprovalLinkRequest }>(),
);

export const updateActivatedApprovalLinkSuccess = createAction(
    '[RiskProfile/API] Update Activated Approval Link Success',
    props<{ data: IActivatedApprovalLinkResponse }>(),
)

export const updateActivatedApprovalLinkFailure = createAction(
    '[RiskProfile/API] Update Activated Approval Link Failure',
    props<{ data: string }>(),
);

export const activateApprovalLink = createAction(
    '[RiskProfile/API] activate Approval Link',
    props<{ data: IActivateApprovalLinkRequest }>(),
);

export const activateApprovalLinkSuccess = createAction(
    '[RiskProfile/API] activate Approval Link Success',
    props<{ data: IActivatedApprovalLinkResponse }>(),
)

export const activateApprovalLinkFailure = createAction(
    '[RiskProfile/API] activate Approval Link Failure',
    props<{ data: string }>(),
);

export const updateRiskProfileQuestionnaireReq = createAction(
    '[RiskProfile/API] update Risk Profile Questionnaire Request',
    props<{ data: RPQTnxReq }>(),
);

export const updateRiskProfileQuestionnaireRes = createAction(
    '[RiskProfile/API] update Risk Profile Questionnaire Response',
    props<{ data: RPQTnxResponse }>(),
);

export const updateRiskProfileQuestionnaireFailure = createAction(
    '[RiskProfile/API] update Risk Profile Questionnaire Failure',
    props<{ data: string }>(),
);

export const getCustomerStatus = createAction(
    '[RiskProfile/API] Get Customer Status',
    props<{ data: CustomerStatusPayload }>(),
);

export const getCustomerStatusSuccess = createAction(
    '[RiskProfile/API] Get Customer Status Success',
    props<{ data: CustomerStatusResponse }>(),
)

export const getCustomerStatusFailure = createAction(
    '[RiskProfile/API] Get Customer Status Failure',
    props<{ data: string }>(),
);
