/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { newInvestmentApplicationReducer } from './new-application.reducer';
import { newAppliactionInitState } from '../mock/new-investment-state.mock';
import * as NewInvestmentApplicationAction from './new-application.actions';
import { MockCustomerType, MockSalutations, MockGenderList, MockCoutryLIst, MockCitizens, MockRaceList, MockReligionList, MockMaritalList, MockEmployementList, MockOccupations, MockCustomerProfile, mockUtAccountOpeningRequest, MockAddressTypeList, MockStatesList } from '../mock/new-investment-spec.mock';


describe('New Investment Application Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

            expect(result).toBe(newAppliactionInitState);
        });
    });
});

describe('Get new investment all dropdowns data', () => {
    it('should successfully load data from getCustomerType API', () => {
        const action = NewInvestmentApplicationAction.getCustomerTypeDataSuccess({
            data: MockCustomerType
        });

        const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.Customertype).toEqual(MockCustomerType);
    });

    it('should successfully load data from titleSalutations API', () => {
        const action = NewInvestmentApplicationAction.getTitleSalutationsDataSuccess({
            data: MockSalutations
        });

        const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.titleSalutations).toEqual(MockSalutations);
    });

    it('should successfully load data from genderList API', () => {
        const action = NewInvestmentApplicationAction.getGenderListDataSuccess({
            data: MockGenderList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.genderList).toEqual(MockGenderList);
    });

    it('should successfully load data from nationalityList API', () => {
        const action = NewInvestmentApplicationAction.getCountryListDataSuccess({
            data: MockCoutryLIst
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.nationalityList).toEqual(MockCoutryLIst);
    });

    it('should successfully load data from citizenList API', () => {
        const action = NewInvestmentApplicationAction.getCitizenListDataSuccess({
            data: MockCitizens
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.citizenList).toEqual(MockCitizens);
    });

    it('should successfully load data from raceList API', () => {
        const action = NewInvestmentApplicationAction.getRaceListDataSuccess({
            data: MockRaceList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.raceList).toEqual(MockRaceList);
    });

    it('should successfully load data from religionList API', () => {
        const action = NewInvestmentApplicationAction.getReligionListDataSuccess({
            data: MockReligionList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.religionList).toEqual(MockReligionList);
    });

    it('should successfully load data from martialStatusList API', () => {
        const action = NewInvestmentApplicationAction.getMaritalListDataSuccess({
            data: MockMaritalList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.martialStatusList).toEqual(MockMaritalList);
    });

    it('should successfully load data from industryList API', () => {
        const action = NewInvestmentApplicationAction.getIndustryListDataSuccess({
            data: MockEmployementList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.industryList).toEqual(MockEmployementList);
    });

    it('should successfully load data from professionList API', () => {
        const action = NewInvestmentApplicationAction.getOccupationListDataSuccess({
            data: MockOccupations
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.professionList).toEqual(MockOccupations);
    });

    it('should successfully load data from addressTypeList API', () => {
        const action = NewInvestmentApplicationAction.getAddressTypeListSuccess({
            data: MockAddressTypeList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.addressTypeList).toEqual(MockAddressTypeList);
    });

    it('should successfully load data from statesList API', () => {
        const action = NewInvestmentApplicationAction.getStatesListSuccess({
            data: MockStatesList
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.statesList).toEqual(MockStatesList);
    });

    it('should to set data for getUtAccountOpeningData', () => {
        const action = NewInvestmentApplicationAction.getUtAccountOpeningData({
            data: mockUtAccountOpeningRequest
        });

       const result = newInvestmentApplicationReducer(newAppliactionInitState, action as any);

        expect(result.utAccountOpening).toEqual(mockUtAccountOpeningRequest);
    });

});
