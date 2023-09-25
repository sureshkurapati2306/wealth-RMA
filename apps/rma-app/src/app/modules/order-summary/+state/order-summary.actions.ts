import { createAction, props } from '@ngrx/store';
import { IGetOrderSummary, TrxRefId, SendRemainder, IActivatedApprovalLinkRequest, IActivatedApprovalLinkResponse } from '../../risk-profile/models/risk-profile-summary.model';


export const getOrderSummaryData = createAction(
    '[NewInvestment Application/API] Get getOrderSummaryData',
    props<{ data: string }>(),
);

export const getOrderSummaryDataSuccess = createAction(
    '[NewInvestment Application/API] Get getOrderSummaryData Success',
    props<{ data: IGetOrderSummary }>(),
)

export const getOrderSummaryDataFailure = createAction(
    '[NewInvestment Application/API] Get getOrderSummaryData Failure',
    props<{ data: string }>(),
);
export const sendingRemainder = createAction(
    '[NewInvestment Application/API] Post sendRemainderData',
    props<{ data: TrxRefId }>(),
);
export const sendingRemainderSuccess = createAction(
    '[NewInvestment Application/API] Post sendRemainderData Success',
    props<{ data: SendRemainder }>(),
);
export const sendingRemainderFailure = createAction(
    '[NewInvestment Application/API] Post sendRemainderData Failure',
    props<{ data: string }>(),
);

export const orderActivatedApprovalLink = createAction(
    '[RiskProfile/API] order Update Activated Approval Link',
    props<{ data: IActivatedApprovalLinkRequest }>(),
);

export const orderActivatedApprovalLinkSuccess = createAction(
    '[RiskProfile/API] order Update Activated Approval Link Success',
    props<{ data: IActivatedApprovalLinkResponse }>(),
)

export const orderActivatedApprovalLinkFailure = createAction(
    '[RiskProfile/API] order Update Activated Approval Link Failure',
    props<{ data: string }>(),
);
