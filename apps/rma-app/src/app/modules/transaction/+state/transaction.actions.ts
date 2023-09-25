import { createAction, props } from '@ngrx/store';
import { APPROVER, ISwitchOutFundRequest } from '../models/funds.model';
import { IGetTrxDetailResponse, IRiskProfileInquiryRequest, IRiskProfileInquiryResponse } from '../models/risk-profile.model';
import { Branch, IFundDataRequest, IFundDataResponse, SettlementAccount, ISearchFundData, IProductTransactionRequest, ISalesFormDataRequest, ITransactionAppRequest, ITransactionAppResponse, IDeleteDraftResponse, IAcknowledgeForm, IGetTransactionIdRequest, IRefferalTransactionRequest, IDraftTransactionResponse, ITotalFundAmount, INonDefaultAccount, INonDefaultAccountResponse, IRegionalDirectorForm } from './transaction.models';
import { ISalesChargeDropDowmRequest, ISalesChargeDropDowmResponse } from '../models/sales-charge.model';
import { IActivatedApprovalLinkRequest } from '../../risk-profile/models/risk-profile-summary.model';

export const getSearchFunds = createAction(
    '[Transaction/API] Get Search Funds',
    props<{ data: IFundDataRequest }>(),
);

export const getSearchFundsSuccess = createAction(
    '[Transaction/API] Get Search Funds Success',
    props<{ data: IFundDataResponse }>(),
);

export const getSearchFundsFailure = createAction(
    '[Transaction/API] Get Search Funds Failure',
    props<{ data: string }>(),
);

export const fetchBranches = createAction(
    '[Transaction/API] fetch Branches'
)

export const getBranches = createAction(
    '[Transaction/API] get Branches',
    props<{ branches: Branch[] }>()
)

export const subscribedFunds = createAction(
    '[Transaction/API] Subscribed Funds',
    props<{ data: ISearchFundData[] }>()
)

export const riskProfileEnqiry = createAction(
    '[Transaction/API] Risk Inuqiry',
    props<{ data: IRiskProfileInquiryResponse }>()
)

export const riskProfileEnqiryRequest = createAction(
    '[Transaction/API] Fetch Risk Inuqiry',
    props<{ data: IRiskProfileInquiryRequest }>()
)

export const riskProfileEnqiryFailure = createAction(
    '[Transaction/API] Fetch Risk Inuqiry Failure',
    props<{ data: string }>()
)

export const fetchActiveApprover = createAction(
    '[Transaction/API] Fetch Active Approvers'
)

export const fetchActiveApproverFailure = createAction(
    '[Transaction/API] Fetch Active Approvers Failure Message',
    props<{ data: string }>()
)

export const activeApprover = createAction(
    '[Transaction/API] Get Active Approvers',
    props<{ data: APPROVER[] }>()
)

export const createApplication = createAction(
    '[Transaction/API] create application transaction request',
    props<{ data: ITransactionAppRequest }>()
)

export const createApplicationSuccess = createAction(
    '[Transaction/API] create application transaction response',
    props<{ data: ITransactionAppResponse }>()
)

export const createApplicationFailure = createAction(
    '[Transaction/API]  create application transaction Failure',
    props<{ data: string }>()
)

export const saveDraftApplicationSuccess = createAction(
    '[Transaction/API] save draft application transaction response',
    props<{ data: IDraftTransactionResponse }>()
)

export const saveDraftApplicationFailure = createAction(
    '[Transaction/API]  save draft application transaction Failure',
    props<{ data: string }>()
)

export const productTransactionFormData = createAction(
    '[Transaction/API] productTransactionForm data',
    props<{ data: IProductTransactionRequest }>()
)

export const acknowledgeFormdata = createAction(
    '[Transaction/API] acknowledgeForm data',
    props<{ data: IAcknowledgeForm }>()
)

export const salesFormData = createAction(
    '[Transaction/API] sales Form data',
    props<{ data: ISalesFormDataRequest }>()
)


export const referralTransactionFormData = createAction(
    '[Transaction/API] refferal Form data',
    props<{ data: IRefferalTransactionRequest }>()
)


export const deleteCustomerDraft = createAction(
    '[Transaction/API] delete Customer Draft',
    props<{ data: IActivatedApprovalLinkRequest }>()
)

export const deleteCustomerDraftSuccess = createAction(
    '[Transaction/API] delete Customer Draft successfully',
    props<{ data: IDeleteDraftResponse }>()
)

export const deleteCustomerDraftFailure = createAction(
    '[Transaction/API] delete Customer Draft unsuccessful',
    props<{ data: string }>()
)

export const getDraftTransactionIdDetails = createAction(
    '[Transaction/API] getDraftTransactionIdDetails Draft',
    props<{ data: IGetTransactionIdRequest }>()
)

export const getDraftTransactionIdDetailsSuccess = createAction(
    '[Transaction/API] getDraftTransactionIdDetails Draft successfully',
    props<{ data: IGetTrxDetailResponse }>()
)

export const getDraftTransactionIdDetailsFailure = createAction(
    '[Transaction/API]getDraftTransactionIdDetails unsuccessful',
    props<{ data: string }>()
)

export const getSalesChargeDropDown = createAction(
    '[Transaction/API] get sales charge data',
    props<{ data: ISalesChargeDropDowmRequest }>()
)

export const salesChargeDropDownValues = createAction(
    '[Transaction/API] sales charge data success',
    props<{ data: Map<string, ISalesChargeDropDowmResponse[]> }>()
)

export const getSwitchOutFunds = createAction(
    '[Transaction/API] switch out fund request',
    props<{ data: ISwitchOutFundRequest }>()
)

export const switchOutFunds = createAction(
    '[Transaction/API] switch out fund response',
    props<{ data: Map<string, ISearchFundData[]> }>()
)

export const switchInFundDeviation = createAction(
    '[Transaction/API] switch in fund deviation status',
    props<{ status: boolean }>()
)

export const getTotalAmountFund = createAction(
    '[Transaction/API] Get Total Amount Fund',
    props<{ data: ITotalFundAmount }>()
)

export const getTotalTransactionAmount = createAction(
    '[Transaction/API] Get Total Transaction Amount',
    props<{ data: number | undefined }>()
)

export const enableTransactionAmountError = createAction(
    '[Transaction/API] Get Total Transaction Amount Error Enable',
    props<{ data: boolean | undefined }>()
)

export const setSearchDirtyCheck = createAction(
    '[Transaction/API] Get setSearchDirtyCheck status',
    props<{ data: boolean | undefined }>()
)

export const getNonDefaultAccount = createAction(
    '[Transaction/API] Get Non Default Account',
    props<{ payload: INonDefaultAccount }>(),
);

export const getNonDefaultAccountSuccess = createAction(
    '[Transaction/API] Get Non Default Account Success',
    props<{ data: INonDefaultAccountResponse }>(),
);

export const getNonDefaultAccountFailure = createAction(
    '[Transaction/API] Get Non Default Account Failure',
    props<{ data: string }>(),
);

export const getRegionalDirectorForm = createAction(
    '[Transaction/API] Get Search Value',
    props<{ data: IRegionalDirectorForm }>(),
);
