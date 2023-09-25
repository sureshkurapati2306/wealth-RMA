import { createAction, props } from '@ngrx/store';
import { IRiskProfileInquiryRequest, IRiskProfileInquiryResponse } from '../../transaction/models/risk-profile.model';
import { Country } from '../models/country.modael';
import { CUSTOMER, CustomerInvestment, IUpdateEmailRequest, GetSettingsParam } from '../models/customer.model';

export const getRiskProfileInquiry = createAction(
    '[Customer/API] Get Risk Profile Inquiry',
    props<{ data: IRiskProfileInquiryRequest }>(),
);

export const getRiskProfileInqirySuccess = createAction(
    '[Customer/API] Risk Profile Inquiry Success',
    props<{ data: IRiskProfileInquiryResponse }>(),
)

export const getRiskProfileInqiryFailure = createAction(
    '[Customer/API] Risk Profile Inquiry Failure',
    props<{ data: string }>(),
);


export const getCoustomer = createAction(
    '[Customer/API] Get Selected Customer',
    props<{ cifNumber: string }>()
);

export const customer = createAction(
    '[Customer/API] Get Selected Customer',
    props<{ data: CUSTOMER }>(),
);

export const getCoustomerInvestment = createAction(
    '[Customer/API] Get Customer Investment',
    props<{ cifNumber: string }>()
);

export const coustomerInvestmentSucess = createAction(
    '[Customer/API] Customer Investment Success',
    props<{ data: CustomerInvestment }>()
);

export const coustomerInvestmentError = createAction(
    '[Customer/API] Customer Investment Error',
    props<{ error: string }>()
);

export const updateCustomerEmail = createAction(
    '[Customer/API] Update Customer Email',
    props<{ payload: IUpdateEmailRequest }>()
)

export const updateCustomerEmailSuccess = createAction(
    '[Customer/API] Update Customer Email Success',
    props<{ data: string }>()
)

export const updateCustomerEmailFailure = createAction(
    '[Customer/API] Update Customer Email Failure',
    props<{ error: string }>()
)

export const getSettingsParam = createAction(
    '[Customer/API] Get MaxUtAcc Settings Param',
)

export const getSettingsParamSuccess = createAction(
    '[Customer/API] Get MaxUtAcc Settings Param Success',
    props<{ data: GetSettingsParam }>()
)

export const getSettingsParamFailure = createAction(
    '[Customer/API] Get Settings Param Failure',
    props<{ error: string }>()
)
