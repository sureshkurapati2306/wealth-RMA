export interface AccountSummaryRequest {
  bankId: string;
  branchId: string;
  custPermId: string;
  cardNum: string;
  identSerialNum: string;
  govIssueIdentType: string;
}

export interface AccountSummary {
  totalAsset: number;
  totalLiability: number;
  cifNumber: string;
  assetsPct: number;
  liabilitiesPct: number;
  myInvestmentPct: number;
  myDepositPct: number;
  myLoansPct: number;
  myCreditCardsPct: number;
  customerName: string;
  lastUpdated: string;
  assetLiabilities: AssetLiability[];
}

export interface AssetLiability {
  alcName: string;
  alDesc: string;
  alcSeq: number;
  alCode: string;
  alCategory: string;
  accountNumber?: string;
  cardNumber?: string;
  amount: number;
  currencyCode?: string;
  investmentLastUpdated?: string;
  nextPaymentDueDate?: string;
}

export interface WealthPortfolio {
  name: string;
  amount: number;
  classHexa: string;
}

export interface WealthPortfolioBox {
  name: string;
  donutColor: string;
  items: AssetLiability[];
}


export interface RiskProfileRequest {
  cifNumber: string;
  custName?: string;
  custIdType?: string;
  custIdNo?: string;
  custIdIssue?: string;
}

export interface RiskProfile {
  riskProfileStatus: string;
  rpResults: string;
  riskProfile: string;
  rpTnC: string;
  riskProfileDescription: string;
  expectedReturn: number;
  standardDeviation: string;
  lastUpdatedDate: string;
  expiryDate: string;
  rmManagerName: string;
  rmManagerId: string;
  recommendedProducts: any[];
}
