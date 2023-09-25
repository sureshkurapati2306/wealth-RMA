import * as Selectors from './new-application.selectors';
import { MockCustomerType, MockSalutations, MockGenderList, MockCoutryLIst, MockCitizens, MockMaritalList, MockEmployementList, MockOccupations, MockRaceList, MockReligionList, MockCustomerProfile, mockUtAccountOpeningRequest, MockAddressTypeList, MockStatesList } from '../mock/new-investment-spec.mock';
import { newAppliactionInitState } from '../mock/new-investment-state.mock';

describe('NewInvestmentApplication Selectors', () => {
    it('should get customerType list', () => {
        const result = Selectors.customerTypeResponse.projector({ ...newAppliactionInitState, Customertype: MockCustomerType });
        expect(result).toBeTruthy();
    });

    it('should get titleSalutations list', () => {
        const result = Selectors.titleSalutationsResponse.projector({ ...newAppliactionInitState, titleSalutations: MockSalutations });
        
        expect(result).toBeTruthy();
    });

    it('should get genderList list', () => {
        const result = Selectors.genderListResponse.projector({ ...newAppliactionInitState, genderList: MockGenderList });

        expect(result).toBeTruthy();
    });

    it('should get martialStatus list', () => {
        const result = Selectors.martialStatusListResponse.projector({ ...newAppliactionInitState, martialStatusList: MockMaritalList });
        expect(result).toBeTruthy();
    });

    it('should get industry list', () => {
        const result = Selectors.industryListResponse.projector({ ...newAppliactionInitState, industryList: MockEmployementList });
        expect(result).toBeTruthy();
    });

    it('should get professionList list', () => {
        const result = Selectors.professionListResponse.projector({ ...newAppliactionInitState, professionList: MockOccupations });

        expect(result).toBeTruthy();
    });

    it('should get nationality list', () => {
        const result = Selectors.nationalityListResponse.projector({ ...newAppliactionInitState, nationalityList: MockCoutryLIst });
        expect(result).toBeTruthy();
    });

    it('should get citizen list', () => {
        const result = Selectors.citizenListResponse.projector({ ...newAppliactionInitState, citizenList: MockCitizens });
        expect(result).toBeTruthy();
    });

    it('should get raceList list', () => {
        const result = Selectors.raceListResponse.projector({ ...newAppliactionInitState, raceList: MockRaceList });

        expect(result).toBeTruthy();
    });

    it('should get religionList list', () => {
        const result = Selectors.religionListResponse.projector({ ...newAppliactionInitState, religionList: MockReligionList });

        expect(result).toBeTruthy();
    });

    it('should get addressTypeList list', () => {
        const result = Selectors.addressTypeListResponse.projector({ ...newAppliactionInitState, addressTypeList: MockAddressTypeList });

        expect(result).toBeTruthy();
    });

    it('should get statesListResponse list', () => {
        const result = Selectors.statesListResponse.projector({ ...newAppliactionInitState, statesList: MockStatesList });

        expect(result).toBeTruthy();
    });

    it('should get utAccountOpeningResponse data', () => {
        const result = Selectors.utAccountOpeningResponse.projector({ ...newAppliactionInitState, utAccountOpening: mockUtAccountOpeningRequest });

        expect(result).toBeTruthy();
    });

});
