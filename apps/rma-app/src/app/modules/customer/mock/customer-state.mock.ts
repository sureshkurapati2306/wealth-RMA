import { IUpdateEmailRequest } from './../models/customer.model';
/* eslint-disable sonarjs/no-duplicate-string */
import { IRiskProfileInquiryRequest, IRiskProfileInquiryResponse, RiskProfileStatus, RiskProfile } from '../../transaction/models/risk-profile.model';
import { CustomerState } from '../models/customer-state.model';
import { CUSTOMER, CustomerInvestment, CustomerProfile, CUSTOMER_TYPE, GetSettingsParam } from '../models/customer.model';

export const customerInitialState: CustomerState = {
    riskProfileRequest: {} as IRiskProfileInquiryRequest,
    riskProfileResponse: {} as IRiskProfileInquiryResponse,
    riskProfileError: "",
    customer: {} as CUSTOMER,
    customerProfile: {} as CustomerProfile,
    customerInvestment: {} as CustomerInvestment,
    updateCustomerEmail: {} as IUpdateEmailRequest,
    getSettingsParam: {} as GetSettingsParam
};

export const MockRiskProfileResponse: IRiskProfileInquiryResponse = {
    riskProfileStatus: 'VALID' as RiskProfileStatus,
    rpResults: '-',
    riskProfile: 'Balanced' as RiskProfile,
    rpTnC: '-',
    riskProfileDescription:
        'BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security',
    expectedReturn: 6.047999999999999,
    standardDeviation: 10.368553989683456,
    lastUpdatedDate: '26-Sep-2019',
    expiryDate: '26-Dec-2027',
    rmManagerName: 'ADMIN',
    rmManagerId: 'ADMIN1',
    recommendedProducts: [
        {
            fundName: 'CIMB-PRINCIPAL US FUTURE GOALS FUND',
            fundCode: 'CBT45A',
            currency: 'MYR',
            fundRiskProfile: 'Growth' as RiskProfile,
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 5,
            riskProfile: '4',
        },
        {
            fundName: 'Issuer Date Test289',
            fundCode: 'IssuerDateTest289',
            currency: 'MYR',
            fundRiskProfile: 'Balanced' as RiskProfile,
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Equity 2',
            fundCode: 'ASNE2',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive' as RiskProfile,
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'CIMB-PRINCIPAL BALANCED FUND',
            fundCode: 'CBT03A',
            currency: 'MYR',
            fundRiskProfile: 'Balanced' as RiskProfile,
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 4,
            riskProfile: '3',
        },
    ],
};

export const MockRiskProfileRequest: IRiskProfileInquiryRequest = {
    cifNumber: 10280000511312,
    custName: '',
    custIdIssue: '',
    custIdNo: '',
    custIdType: '',
};

export const MockUpdateCustomerEmail: IUpdateEmailRequest = {
    cif : '',
    email : ''
};

export const CustomerInvestmentMock: CustomerInvestment = {
    currency: 'MYR',
    investmentAmount: 120000.00,
    casaAmount: 44000.00,
    fixedDeposit: 1000.00,
    creditCard: 1000.00,
    loanAndFinance: 1000.00
}

export const MockCustomer: CUSTOMER[] = [
    {
        id: '625d0c46aced26ac70593b96',
        coustomer: 'Hoffman Haney',
        createdDate: 'Thu Apr 23 1998 15:00:58 GMT+0530 (India Standard Time)',
        refID: 6758,
        status: 'Draft',
        type: 'New Account',
        gender: 'male',
        cifNumber: '10330000219671',
        customerType: CUSTOMER_TYPE.ETP,
    },
    {
        id: '625d0c46aced26ac70593b36',
        coustomer: 'Tonny Stark',
        createdDate: 'Thu Apr 23 1998 15:00:58 GMT+0530 (India Standard Time)',
        refID: 6758,
        status: 'Draft',
        type: 'New Account',
        gender: 'male',
        cifNumber: '10280000511312',
        customerType: CUSTOMER_TYPE.NTP,
    },
    {
        id: '625d0c465f295b6b83c93769',
        coustomer: 'Stephenson Wilson',
        createdDate: 'Sat Feb 04 1989 07:38:22 GMT+0530 (India Standard Time)',
        refID: 8712,
        status: 'Pending Approval',
        type: 'Redeem',
        gender: 'male',
        cifNumber: '10110000311801',
        customerType: CUSTOMER_TYPE.NTP,
    },
    {
        id: '625d0c465f295b6b83c93769',
        coustomer: 'Stephenson Wilson',
        createdDate: 'Sat Feb 04 1989 07:38:22 GMT+0530 (India Standard Time)',
        refID: 8712,
        status: 'Pending Approval',
        type: 'Redeem',
        gender: 'male',
        cifNumber: '10300000139447',
        customerType: CUSTOMER_TYPE.NTP,
    },
    {
        id: '625d0c4627e819ecc06e0312',
        coustomer: 'Corinne Lang',
        createdDate: 'Fri Feb 27 1970 03:22:26 GMT+0530 (India Standard Time)',
        refID: 8516,
        status: 'Pending Approval',
        type: 'Redeem',
        gender: 'female',
        cifNumber: '10270000007722',
        customerType: CUSTOMER_TYPE.ETP,
    },
    {
        id: '625d0c465f2651a64645ea45',
        coustomer: 'Adkins Maynard',
        createdDate: 'Sat Feb 03 2018 09:25:05 GMT+0530 (India Standard Time)',
        refID: 5503,
        status: 'Confirmed',
        type: 'Subscribe',
        gender: 'male',
        cifNumber: '10110000182691',
        customerType: CUSTOMER_TYPE.NTP,
    },
    {
        id: '625d0c4662c246ff459713c5',
        coustomer: 'Ilene Hicks',
        createdDate: 'Tue Nov 23 1999 04:31:07 GMT+0530 (India Standard Time)',
        refID: 2647,
        status: 'Confirmed',
        type: 'New Account',
        gender: 'female',
        cifNumber: '10350000024717',
        customerType: CUSTOMER_TYPE.ETP,
    },
    {
        id: '625d0c46c3153840b4d135a8',
        coustomer: 'Gross Clements',
        createdDate: 'Sat Mar 29 1986 04:37:43 GMT+0530 (India Standard Time)',
        refID: 5928,
        status: 'Pending Approval',
        type: 'New Account',
        gender: 'male',
        cifNumber: '10210000020351',
        customerType: CUSTOMER_TYPE.NTP,
    },
    {
        id: '625d0c468f4ddd01171287aa',
        coustomer: 'Middleton Spencer',
        createdDate: 'Wed Sep 30 2009 12:48:05 GMT+0530 (India Standard Time)',
        refID: 2554,
        status: 'Confirmed',
        type: 'Redeem',
        gender: 'male',
        cifNumber: '10170000023648',
        customerType: CUSTOMER_TYPE.NTP,
    },
];

export const MockGetSettingsParam: GetSettingsParam = 
{
    maxUtAcct :5
}

export const MockInvestmentAccount = 
    [
        {
          "accountNumber": "640826135254",
          "jointIndicator": "P",
          "holderType": "Primary",
          "accountStatus": "Closed"
        },
        {
          "accountNumber": "640826135255",
          "jointIndicator": "S",
          "holderType": "Secondary",
          "accountStatus": "Closed"
        },
        {
          "accountNumber": "640826135256",
          "jointIndicator": "P",
          "holderType": "Primary",
          "accountStatus": "Closed"
        },
        {
          "accountNumber": "640826135257",
          "jointIndicator": "S",
          "holderType": "Secondary",
          "accountStatus": "Active"
        },
        {
          "accountNumber": "640826135258",
          "jointIndicator": "S",
          "holderType": "Secondary",
          "accountStatus": "Suspended"
        }
    ];
