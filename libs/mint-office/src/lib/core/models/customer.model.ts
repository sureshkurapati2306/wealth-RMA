export interface Customer {
    id?: string;
    coustomer: string;
    refID: number;
    gender: string;
    type: string;
    status: string;
    createdDate: string;
    cifNumber?: string;
    customerType?: CUSTOMER_TYPE
}

export enum CUSTOMER_TYPE {
    ETP = "ETP",
    NTP = "NTP"
}

export interface customerAddress {
address1: string,
address2: string,
address3: string,
address4: string,
addressType: string,
country: string,
postcode: string,
state: string,
}

export interface CustomerProfile {
    rpqApprovalStatus: string,
    inSanctionCountry: string,
    accountRelation: string,
    accountStatus: string,
    addresses: customerAddress[],
    birthDate: string,
    branchCode: string,
    cardNum: string,
    cifNo: string,
    clientGroup: string,
    cntyCitizenship: string,
    email: string,
    gender: string,
    homePhone: string,
    idCntyIssued: string,
    idNo: string,
    idType: string,
    maritalStatus: string,
    name: string,
    nationality: string,
    occupation: string,
    prStatus: string,
    profession: string,
    race: string,
    religion: string,
    staffIndicator: string,
    licenseValidity: boolean,
    category: 'ETP' | 'NTP',
    casaStatus: 'Y' | 'N' | 'I' | 'J' | 'F',
    investmentAccount: InvestmentAccount[],
    settlementAccount: ISettlementAccount[],
    offPhone: string[],
    housePhone: string[],
    emailId: string[],
    mobileNumber: string,
    mobileNumbers: string[],
    salutation: string,
    industry: string,
    contactDetails:IContactDetails[]
}

export interface InvestmentAccount {
    accountNumber: string,
    jointIndicator: string,
    holderType: string
}

export interface ISettlementAccount {
    accountType: string,
    accountNumber: string,
    settlementAcctType: string,
    signingCondition: string,
    resStatus: string,
    staffInd: string,
    jointIndicator: string,
    accountFormat: string,
    accountName: string,
    accountStatus: string,
    accountBalance: number,
    currencyCode: string,
    holderType: string
}

export interface IContactDetails {
contactType: string,
areaCode:string,
phone:string,
extensionNum:string,
emailAddr:string,
seqNum:string
}
