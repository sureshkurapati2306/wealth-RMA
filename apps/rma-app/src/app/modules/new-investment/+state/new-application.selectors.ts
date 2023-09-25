import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewAppliactionInitState } from '../model/new-investment-state.model';
import { AddressTypeList, CitizenList, CountryList, GenderList, ICustomerType, IndustryList, IUtAccountOpening, MaritalList, OccupationList, RaceList, ReligionList, TitleSalutations, StateList } from '../model/new-investment.model';

export const NEW_INVESTMENT_APPLICATION_STATE = 'newInvestmentApplication';

const getNewInvestmentApplication = createFeatureSelector<NewAppliactionInitState>(NEW_INVESTMENT_APPLICATION_STATE);

export const customerTypeResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.Customertype ? state.Customertype : null;
    }
    return [] as ICustomerType[];
});

export const titleSalutationsResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.titleSalutations ? state.titleSalutations : null;
    }
    return [] as TitleSalutations[];
});

export const genderListResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.genderList ? state.genderList : null;
    }
    return [] as GenderList[];

});

export const nationalityListResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.nationalityList ? state.nationalityList : null;
    }
    return [] as CountryList[];
});

export const citizenListResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.citizenList ? state.citizenList : null;
    }
    return [] as CitizenList[];

});

export const raceListResponse = createSelector(getNewInvestmentApplication, (state) => {
  if (state) {
      return state.raceList ? state.raceList : null;
  }
  return [] as RaceList[];

});

export const religionListResponse = createSelector(getNewInvestmentApplication, (state) => {
  if (state) {
      return state.religionList ? state.religionList : null;
  }
  return [] as ReligionList[];

});

export const martialStatusListResponse = createSelector(getNewInvestmentApplication, (state) => {
  if (state) {
      return state.martialStatusList ? state.martialStatusList : null;
  }
  return [] as  MaritalList[];

});

export const industryListResponse = createSelector(getNewInvestmentApplication, (state) => {
  if (state) {
      return state.industryList ? state.industryList : null;
  }
  return [] as  IndustryList[];

});

export const professionListResponse = createSelector(getNewInvestmentApplication, (state) => {
  if (state) {
      return state.professionList ? state.professionList : null;
  }
  return [] as  OccupationList[];

});

export const addressTypeListResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.addressTypeList ? state.addressTypeList : null;
    }
    return [] as  AddressTypeList[];
  
  });

  export const statesListResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.statesList ? state.statesList : null;
    }
    return [] as  StateList[];
  
  });

  export const utAccountOpeningResponse = createSelector(getNewInvestmentApplication, (state) => {
    if (state) {
        return state.utAccountOpening ? state.utAccountOpening : null;
    }
    return {} as IUtAccountOpening;

  });
