export interface CustomerTypeModel {
    customerTypeCode: string;
    customerTypeName: string;
}

export interface ICustomerProfileData {
    rpqApprovalStatus: string,
    inSanctionCountry: string,
    branchCode: string,
    accountRelation: string,
    birthDate: string,
    profession: string,
    idNo: string,
    idType: string,
    idCntyIssued: string,
    name: string,
    cntyCitizenship: string,
    addresses: ICustomerAddress[],
    prStatus: string,
    staffIndicator: string,
    homePhone: string,
    nationality: string,
    accountStatus: string,
    cardNum: string,
    gender: string,
    race: string,
    maritalStatus: string,
    religion: string,
    email: string,
    cifNo: string,
    clientGroup: string
    occupation: string
}

export interface ICustomerAddress {
    addressType: string,
    address1: string,
    address2: string,
    address3: string,
    address4: string,
    state: string,
    country: string,
    postcode: string
}

export interface CitizenList {
    citizenCode: string;
    citizenId: number;
    citizenLongName: string;
    citizenShortName: string;
    citizenStatus: string;
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
}

export interface GenderList {
    createdBy: string;
    createdDate: string;
    genderCode: string;
    genderId: number;
    genderLongName: string;
    genderShortName: string;
    modifiedBy: string;
    modifiedDate: string;
}

export interface MaritalList {
    createdBy: string;
    createdDate: string;
    maritalCode: string;
    maritalId: number;
    maritalLongName: string;
    maritalShortName: string;
    modifiedBy: string;
    modifiedDate: string;
}

export interface OccupationList {
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    occupationCode: string;
    occupationId: number;
    occupationLongName: string;
    occupationShortName: string;
}

export interface RaceList {
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    raceCode: string;
    raceId: number;
    raceLongName: string;
    raceShortName: string;
}

export interface ReligionList {
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    religionCode: string;
    religionId: number;
    religionLongName: string;
    religionShortName: string;
}

export interface IndustryList {
    createdBy: string;
    createdDate: string;
    employmentCode: string;
    employmentId: number;
    employmentShortName: string;
    modifiedBy: string;
    modifiedDate: string;
}

export interface TitleSalutations {
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    salutationCode: string;
    salutationId: number;
    salutationLongName: string;
    salutationShortName: string;
    salutationType: string;
}

export interface ICustomerType {
    customerTypeCode: string,
    customerTypeName: string
}

export interface CountryList {
    countryId: number,
    countryCode: string,
    countryNo: number,
    countryShortName: string,
    countryLongName: string,
    createdBy: string,
    modifiedBy: string,
    createdDate: string,
    modifiedDate: string
}

export interface IUtAccountOpening {
    rmId: string;
    requestUid: string;
    clientGroup: string;
    salutation: string;
    customerId: string;
    mobilePhone: string;
    housePhone?: string;
    workPhone?: string;
    gender: string;
    nationality?: string;
    race: string;
    citizen: string;
    religion: string;
    maritalStatus: string;
    industry: string;
    profession: string;
    state: string;
    country: string;
    postcode: string;
    address1: string;
    address2?: string;
    address3?: string;
    address4?: string;
    email: string;
    address_line: string;
    mailingAddress: string
}
export interface IUtAccountOpeningResponse {
    status: string;
    message: string;
    trxId: string;
    transactionRefId: string;
    transactionCreateDate: string;
}

export interface IAddress {
    address: string,
    id: number
}

export interface AddressTypeList {
    addressTypeCode: string,
    addressTypeName: string
}

export interface StateList {
    stateId: number,
    countryCode: string,
    stateCode: string,
    stateShortName: string,
    stateLongName: string,
    createdBy: string,
    modifiedBy: string,
    createdDate: string,
    modifiedDate: string
}
