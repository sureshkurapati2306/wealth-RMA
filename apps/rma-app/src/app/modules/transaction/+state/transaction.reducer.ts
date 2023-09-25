import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { APPROVER, FundDetail } from '../models/funds.model';
import { IGetTrxDetailResponse, IRiskProfileInquiryResponse } from '../models/risk-profile.model';
import { ISalesChargeDropDowmResponse } from '../models/sales-charge.model';
import * as TransactionActions from './transaction.actions';
import { IFundDataRequest, ISearchFundData, Branch, IPastPerformanceResponse, IProductTransactionRequest, ISalesFormDataRequest, ITransactionAppRequest, ITransactionAppResponse, IDeleteDraftResponse, IAcknowledgeForm, IRefferalTransactionRequest, IDraftTransactionResponse, ITotalFundAmount, INonDefaultAccount, INonDefaultAccountResponse, IRegionalDirectorForm } from './transaction.models';

export const TRANSACTION_FEATURE_KEY = 'transactionSerachFundFeature';


export interface State {
    request: IFundDataRequest | null;
    fundData: ISearchFundData[] | null;
    errorMessage: string;
    branches: Branch[] | null;
    fundDetails?: FundDetail | null;
    pastPerformance : IPastPerformanceResponse[] | null;
    performanceChart?: [] | null;
    subscribeFunds?: ISearchFundData[] | null,
    riskProfileInquiry?: IRiskProfileInquiryResponse | null,
    activeApprovers?: APPROVER[]
    createApplicationData?: ITransactionAppRequest | null,
    createdApplication: ITransactionAppResponse | null,
    productTransactionFormData?: IProductTransactionRequest | null,
    salesFormData?: ISalesFormDataRequest | null,
    acknowledgeFormData: IAcknowledgeForm,
    deletedDraft: IDeleteDraftResponse | null,
    getSavedDraftDetails: IGetTrxDetailResponse | null,
    refferalFormData?: IRefferalTransactionRequest | null,
    savedDraftResponse: IDraftTransactionResponse | null,
    saveDraftErrorResponse?: string | null,
    salesChargeDropDown: Map<string, ISalesChargeDropDowmResponse[]> | null;
    switchOutFunds: Map<string, ISearchFundData[]> | null;
    switchInDeviation?:boolean;
    totalTransactionAmount?: number | undefined;
    totalFundAmount: ITotalFundAmount | null;
    transactionAmountErrorEnable?: boolean;
    searchForm: boolean;
    nondefaultAccount: INonDefaultAccountResponse | null;
    regionalFormdata: IRegionalDirectorForm | null;
}

export const initialState: State = {
    request: null,
    fundData: null,
    errorMessage: '',
    branches: null,
    pastPerformance: null,
    fundDetails: null,
    performanceChart: null,
    subscribeFunds: [],
    riskProfileInquiry: null,
    activeApprovers: [],
    createApplicationData: null,
    createdApplication: null,
    productTransactionFormData: {isValid: false, formData: null},
    salesFormData: {isValid: false, formData: null},
    refferalFormData: null,
    acknowledgeFormData: {isValid: false},
    deletedDraft: null,
    getSavedDraftDetails: null,
    savedDraftResponse: null,
    saveDraftErrorResponse: null,
    salesChargeDropDown: null,
    switchOutFunds: null,
    switchInDeviation: false,
    totalTransactionAmount: undefined,
    totalFundAmount: null,
    transactionAmountErrorEnable: false,
    searchForm: false,
    nondefaultAccount: null,
    regionalFormdata: null
  };

  export const transactionSearchReducer = createReducer(
    initialState,

    on(TransactionActions.getSearchFunds, (state, action) => {
        return {
            ...state,
            request: action.data,
            errorMessage: '',
        };
    }),

    on(TransactionActions.getSearchFundsSuccess, (state, action) => {
        return {
            ...state,
            fundData: action.data.fundData
        };
    }),

    on(TransactionActions.getSearchFundsFailure, (state, action) => {
        return {
            ...state,
            errorMessage: action.data
        };
    }),

    on(TransactionActions.getBranches, (state, action) => {
        return {
            ...state,
            ...{ branches: action.branches }
        }
    }),

    on(TransactionActions.subscribedFunds, (state, action) => {
        return {
            ...state,
            ...{ subscribeFunds: action.data }
        }
    }),

    on(TransactionActions.riskProfileEnqiry, (state, action) => {
        return {
            ...state,
            ...{ riskProfileInquiry: action.data }
        }
    }),

    on(TransactionActions.riskProfileEnqiryFailure, (state) => {
        return {
            ...state,
            ...{ riskProfileInquiry: null }
        }
    }),

    on(TransactionActions.activeApprover, (state, action) => {
        return {
            ...state,
            ...{ activeApprovers: action.data }
        }
    }),

    on(TransactionActions.createApplication, (state, action) => {
        return {
            ...state,
            createApplicationData: action.data,
        };
    }),

    on(TransactionActions.createApplicationSuccess, (state, action) => {
        return {
            ...state,
            createdApplication: action.data
        };
    }),

    on(TransactionActions.saveDraftApplicationSuccess, (state, action) => {
        return {
            ...state,
            savedDraftResponse: action.data,
            saveDraftErrorResponse: null
        };
    }),

    on(TransactionActions.saveDraftApplicationFailure, (state, action) => {
        return {
            ...state,
            savedDraftResponse: null,
            saveDraftErrorResponse: action.data
        };
    }),

    on(TransactionActions.productTransactionFormData, (state, action) => {
        return {
            ...state,
            ...{ productTransactionFormData: action.data }
        }
    }),

    on(TransactionActions.salesFormData, (state, action) => {
        return {
            ...state,
            ...{ salesFormData: action.data }
        }
    }),

    on(TransactionActions.referralTransactionFormData, (state, action) => {
        return {
            ...state,
            ...{ refferalFormData: action.data }
        }
    }),

    on(TransactionActions.acknowledgeFormdata, (state, action) => {
        return {
            ...state,
            ...{ acknowledgeFormData: action.data }
        }
    }),

    on(TransactionActions.deleteCustomerDraftSuccess, (state, action) => {
        return {
            ...state,
            deletedDraft: action.data
        };
    }),

    on(TransactionActions.getDraftTransactionIdDetailsSuccess, (state, action) => {
        return {
            ...state,
            getSavedDraftDetails: action.data
        };
    }),

    on(TransactionActions.salesChargeDropDownValues, (state, action) => {
        if(!state.salesChargeDropDown) {
            return {
                ...state,
                salesChargeDropDown: action.data
            };
        }
        const updatedMap: Map<string, ISalesChargeDropDowmResponse[]> = state.salesChargeDropDown;
        action.data.forEach((value: ISalesChargeDropDowmResponse[], key: string) => {
                updatedMap.set(key, value)
        })

        return {
            ...state,
            salesChargeDropDown: updatedMap
        };
    }),

    on(TransactionActions.switchOutFunds, (state, action) => {
        if(!state.switchOutFunds) {
            return {
                ...state,
                switchOutFunds: action.data
            };
        }
        const updatedMap: Map<string, ISearchFundData[]> = _.cloneDeep(state.switchOutFunds);
        action.data.forEach((value: ISearchFundData[], key: string) => {
                updatedMap.set(key, value)
        })

        return {
            ...state,
            switchOutFunds: updatedMap
        };
    }),

    on(TransactionActions.switchInFundDeviation, (state, action) => {
        return {
            ...state,
            switchInDeviation: action.status
        }
    }),

    on(TransactionActions.getTotalAmountFund, (state, action) => {
        return {
            ...state,
            ...{ totalFundAmount: action.data }
        }
    }),

    on(TransactionActions.getTotalTransactionAmount, (state, action) => {
       return {
        ...state,
        ...{ totalTransactionAmount: action.data }
       }
    }),

    on(TransactionActions.enableTransactionAmountError, (state, action) => {
        return {
            ...state,
            transactionAmountErrorEnable: action.data
        }
    }),

    on(TransactionActions.setSearchDirtyCheck, (state, action) => {
        return {
            ...state,
            searchForm: action.data ? action.data : false
        }
    }),
    on(TransactionActions.getNonDefaultAccountSuccess, (state, action) => {
        return {
            ...state,
            nondefaultAccount: action.data
        }
    }),
    on(TransactionActions.getRegionalDirectorForm, (state, action) => {
        return {
            ...state,
            regionalFormdata: action.data
        }
    })
);
