export interface autocompleteNationality {
  name: string;
}
export interface selectCitizen {
  id: number;
  name: string;
}
export interface toggleGender {
  value: number;
  label: string;
}
export interface selectRace {
  id: number;
  name: string;
}
export interface selectReligion {
  id: number;
  name: string;
}
export interface selectMaritalStatus {
  id: number;
  name: string;
}
export interface autocompleteIndustryOption {
  id: number;
  name: string;
}
export interface autocompleteIndustry {
  name: string;
  option: autocompleteIndustryOption[];
}
export interface autocompleteProfession {
  id: number;
  name: string;
}
export interface selectSettlementAccount {
  id: number;
  name: string;
}
export interface selectPrefix {
  id: number;
  name: string;
}