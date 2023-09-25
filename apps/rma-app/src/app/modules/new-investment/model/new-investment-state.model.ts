import { CitizenList, CountryList, GenderList, ICustomerType, IndustryList, MaritalList, OccupationList, RaceList, ReligionList, TitleSalutations, ICustomerProfileData, IUtAccountOpening, AddressTypeList, StateList } from './new-investment.model';

export interface NewAppliactionInitState {
    Customertype: ICustomerType[];
    titleSalutations: TitleSalutations[];
    genderList: GenderList[];
    nationalityList: CountryList[];
    citizenList: CitizenList[];
    raceList: RaceList[];
    religionList: ReligionList[];
    martialStatusList: MaritalList[];
    industryList: IndustryList[];
    professionList: OccupationList[];
    addressTypeList: AddressTypeList[];
    statesList: StateList[];
    utAccountOpening: IUtAccountOpening
}
