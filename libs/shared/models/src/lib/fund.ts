export interface FundModel {
  name: string;
  isChecked: boolean;
}
export interface AsseClassModel {
  name: string;
  isChecked: boolean;
}
export interface FundData {
  id: number;
  fundName: string;
  assetClass: string;
  navPrice: number;
  perf1Mth: number;
  perf3Mth: number;
  amount: number;
  action: string;
  isHoliday: boolean;
  highlighted?: boolean;
  hovered?: boolean;
  isCurrentHolding: boolean;
}

export interface fundsList {
  name: string;
}