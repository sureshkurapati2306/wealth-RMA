import { createReducer, on } from '@ngrx/store';
import { newAppliactionInitState } from '../mock/new-investment-state.mock';
import * as NewInvestmentApplicationAction from './new-application.actions';

export const NEW_INVESTMENT_APPLICATION_FEATURE_KEY = 'newInvestmentApplication';

export const newInvestmentApplicationReducer = createReducer(
  newAppliactionInitState,
  on(NewInvestmentApplicationAction.getCustomerTypeDataSuccess, (state, action) => {
    return {
      ...state,
      Customertype: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getTitleSalutationsDataSuccess, (state, action) => {
    return {
      ...state,
      titleSalutations: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getGenderListDataSuccess, (state, action) => {
    return {
      ...state,
      genderList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getCountryListDataSuccess, (state, action) => {
    return {
      ...state,
      nationalityList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getCitizenListDataSuccess, (state, action) => {
    return {
      ...state,
      citizenList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getRaceListDataSuccess, (state, action) => {
    return {
      ...state,
      raceList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getReligionListDataSuccess, (state, action) => {
    return {
      ...state,
      religionList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getMaritalListDataSuccess, (state, action) => {
    return {
      ...state,
      martialStatusList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getIndustryListDataSuccess, (state, action) => {
    return {
      ...state,
      industryList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getOccupationListDataSuccess, (state, action) => {
    return {
      ...state,
      professionList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getAddressTypeListSuccess, (state, action) => {
    return {
      ...state,
      addressTypeList: action.data
    }
  }),

    on(NewInvestmentApplicationAction.getStatesListSuccess, (state, action) => {
    return {
      ...state,
      statesList: action.data
    }
  }),

  on(NewInvestmentApplicationAction.getUtAccountOpeningData, (state, action) => {
    return {
      ...state,
      utAccountOpening: action.data
    }
  }),
)