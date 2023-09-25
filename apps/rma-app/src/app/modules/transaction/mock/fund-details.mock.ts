import { ISearchFundData } from "../+state/transaction.models";
import { FundDetail, FundDetailQueryParam, IFundSummuryDetail, ISwitchOutFundRequest } from "../models/funds.model";
import { IRiskProfileInquiryRequest, IRiskProfileInquiryResponse, RiskProfile, RiskProfileStatus } from "../models/risk-profile.model";

export const MockFundDetailData: FundDetail = {
    assetClass: "Wealth",
    fundId: 12345,
    fundIndicator: "I",
    fundName: "Affin Hwang Select Bond Fund - RM",
    fundStatus: "Active",
    maxInitialSubscription: 5000,
    maxSubsequentSubscription: 6000,
    minHolding: 1500,
    minInitialSubscription: 2300,
    minSubsequentSubscription: 2300,
    nav: 0.8,
    returns: 12.34,
    riskRating: "2",
    totalInvested: 5000,
    unitsHeld: 30000,
    fundCode: "FD1234",
    pledgeUnit: 20000,
    maxRealizationUnit: 2000,
    minRealizationUnit: 500,
    subscribeFlag: "Y",
    siFlag: "N",
    redeemFlag: "N",
    switchInFlag: "N",
    switchOutFlag: "N",
}
const msDocUrl = "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1";
export const MockFundDetailRequest: FundDetailQueryParam = {
    fundCode: "12345",
    utAccountNumber: 12345678
}

export const MockISearchFundData: ISearchFundData[] = [
    {
        closeEnded: 0,
        customerHolding: 0,
        focusFund: 0,
        fundCode: "FD1234",
        fundId: 12345,
        fundName: "Affin Hwang Bond Fund - RM",
        fundStatus: "Active",
        wholeSale: 0,
        details: {
            assetClass: "Wealth",
            fundCode: "FD1234",
            fundId: 12345,
            fundIndicator: "I",
            fundName: "Affin Hwang Select Fund - RM",
            fundStatus: "Active",
            maxInitialSubscription: 5000,
            maxSubsequentSubscription: 6000,
            minHolding: 1500,
            minInitialSubscription: 2300,
            minSubsequentSubscription: 2300,
            nav: 0.8,
            returns: 12.34,
            riskRating: "2",
            totalInvested: 5000,
            unitsHeld: 30000,
            pledgeUnit: 20000,
            maxRealizationUnit: 2000,
            minRealizationUnit: 500,
            subscribeFlag: "Y",
            siFlag: "N",
            redeemFlag: "N",
            switchInFlag: "N",
            switchOutFlag: "N",
        }
    }
]

export const MockRiskProfileInquiry: IRiskProfileInquiryResponse = {
    expectedReturn: 6.8870000000000005,
    expiryDate: "27-Sep-2020",
    lastUpdatedDate: "27-Sep-2019",
    potentialLosses: null,
    potentialReturn: null,
    recommendedProducts: [],
    riskDescription: null,
    riskProfile: "Balanced" as RiskProfile,
    riskProfileDescription: "BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security through a well balanced portfolio of low to high risk investments over a medium to long term investment horizon to overcome your concern.",
    riskProfileStatus: "Expired" as RiskProfileStatus,
    riskTolerance: null,
    riskToleranceDescription: null,
    rmManagerId: "ADMIN1",
    rmManagerName: "ADMIN",
    rpResults: "-",
    rpTnC: "-",
    standardDeviation: 9.294163001159813
}

export const MockRiskInquiryRequest: IRiskProfileInquiryRequest = {
    cifNumber: 12345,
    custName: '',
    custIdIssue: '',
    custIdNo: '',
    custIdType: ''
}

export const MockFundSummuryDetail: IFundSummuryDetail = {
    assetClass: "Fixed Income",
    navPrice: 0.6500,
    navUpdatedDate: "12-07-2021,16:45",
    riskName: "Defensive",
    fundIndicator: "C",
    fundDocument: [
        {

            "msId": 10724,
            "msLink": "F000000AP0",
            "msUrl": msDocUrl,
            "isActive": "Y",
            "docId": 1,
            "documentName": "Master Prospectus",
        },
        {
            "msId": 10725,
            "msLink": "F000000AP0",
            "msUrl": msDocUrl,
            "isActive": "Y",
            "docId": 77,
            "documentName": "Product Highlight Sheet",
        },
        {

            "msId": 10726,
            "msLink": "F000000AP0",
            "msUrl": msDocUrl,
            "isActive": "Y",
            "docId": 4,
            "documentName": "Annual Report",
        },
        {

            "msId": 10727,
            "msLink": "F000000AP0",
            "msUrl": msDocUrl,
            "isActive": "Y",
            "docId": 5,
            "documentName": "Semi-Annual Report",
        },
        {
            "msId": 10728,
            "msLink": "F000000AP0",
            "msUrl": msDocUrl,
            "isActive": "Y",
            "docId": 52,
            "documentName": "Fact sheet",
        }
    ]
}

export const MockSwitchoutFundRequest: ISwitchOutFundRequest = {
    "cifNumber": "10330000219671",
    "custName": "Hoffman Haney",
    "fundCode": "FD1234",
    "fundName": "Affin Hwang Select Bond Fund - RM",
    "custIdIssue": "",
    "custIdNo": "",
    "custIdType": "",
    "accountNo": [
        "640826135254"
    ]
}


export const MockFundDetail : FundDetail = {
    assetClass: "Wealth",
    fundCode: "FD1234",
    fundId: 12345,
    fundIndicator: "I",
    fundName: "Affin Hwang Select Fund - RM",
    fundStatus: "Active",
    maxInitialSubscription: 5000,
    maxSubsequentSubscription: 6000,
    minHolding: 1500,
    minInitialSubscription: 2300,
    minSubsequentSubscription: 2300,
    nav: 0.8,
    returns: 12.34,
    riskRating: "2",
    totalInvested: 5000,
    unitsHeld: 30000,
    pledgeUnit: 20000,
    maxRealizationUnit: 2000,
    minRealizationUnit: 500,
    subscribeFlag: "Y",
    siFlag: "N",
    redeemFlag: "N",
    switchInFlag: "N",
    switchOutFlag: "N",
}

