import { createAction, props } from '@ngrx/store';
import { CitizenList, CountryList, GenderList, ICustomerType, IndustryList, MaritalList, OccupationList, RaceList, ReligionList, TitleSalutations, IUtAccountOpening, IUtAccountOpeningResponse, AddressTypeList, StateList } from '../model/new-investment.model';

export const getAllDropDownData = createAction(
    '[NewInvestment Application/API] Get New Investment Application',
    props<{ data: null }>(),
);

export const getCustomerTypeDataSuccess = createAction(
    '[NewInvestment Application/API] Get ICustomerType Success',
    props<{ data: ICustomerType[] }>(),
)

export const getTitleSalutationsDataSuccess = createAction(
    '[NewInvestment Application/API] Get TitleSalutations Success',
    props<{ data: TitleSalutations[] }>(),
)

export const getGenderListDataSuccess = createAction(
    '[NewInvestment Application/API] Get GenderList Success',
    props<{ data: GenderList[] }>(),
)

export const getCountryListDataSuccess = createAction(
    '[NewInvestment Application/API] Get CountryList Success',
    props<{ data: CountryList[] }>(),
)

export const getCitizenListDataSuccess = createAction(
    '[NewInvestment Application/API] Get CitizenList Success',
    props<{ data: CitizenList[] }>(),
)

export const getRaceListDataSuccess = createAction(
    '[NewInvestment Application/API] Get RaceList Success',
    props<{ data: RaceList[] }>(),
)

export const getReligionListDataSuccess = createAction(
    '[NewInvestment Application/API] Get ReligionList Success',
    props<{ data: ReligionList[] }>(),
)

export const getMaritalListDataSuccess = createAction(
    '[NewInvestment Application/API] Get MaritalList Success',
    props<{ data: MaritalList[] }>(),
)

export const getIndustryListDataSuccess = createAction(
    '[NewInvestment Application/API] Get IndustryList Success',
    props<{ data: IndustryList[] }>(),
)

export const getOccupationListDataSuccess = createAction(
    '[NewInvestment Application/API] Get OccupationList Success',
    props<{ data: OccupationList[] }>(),
)

export const getAllDropDownDataFailure = createAction(
    '[NewInvestment Application/API] Get New Investment Application Failure',
    props<{ data: string }>(),
);

export const getUtAccountOpeningData = createAction(
    '[NewInvestment Application/API] Get getUtAccountOpeningData',
    props<{ data: IUtAccountOpening }>(),
);

export const getAddressTypeListSuccess = createAction(
    '[NewInvestment Application/API] Get AddressTypeList Success',
    props<{ data: AddressTypeList[] }>(),
)

export const getAddressTypeListFailure = createAction(
    '[NewInvestment Application/API] Get AddressTypeList Failure',
    props<{ data: string }>(),
);

export const getStatesListSuccess = createAction(
    '[NewInvestment Application/API] Get StatesList Success',
    props<{ data: StateList[] }>(),
)

export const getStatesListFailure = createAction(
    '[NewInvestment Application/API] Get StatesList Failure',
    props<{ data: string }>(),
);
