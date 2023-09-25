import { CategoryValue, ClassValue, FundTypeValue } from "../enum/filter-value.enum";
import { Filter } from "../models/filters.model";

export const CategoryFilters: Filter[] = [
    { name: 'All Categories', isChecked: true, value: CategoryValue.All_CATEGORY },
    { name: "Match customer’s risk category", isChecked: false, value: CategoryValue.MCRC },
    { name: "Defensive", isChecked: false, value: CategoryValue.DEFENSIVE },
    { name: "Conservative", isChecked: false, value: CategoryValue.CONSERVATIVE },
    { name: "Balanced", isChecked: false, value: CategoryValue.BALANCED },
    { name: "Growth", isChecked: false, value: CategoryValue.GROWTH },
    { name: "Aggressive", isChecked: false, value: CategoryValue.AGGRESSIVE }
];

export const ClassFilters: Filter[] = [
    { name: 'All Classes', isChecked: true, value: ClassValue.ALL_CLASSES },
    { name: "Alternative", isChecked: false, value: ClassValue.ALTERNATIVE },
    { name: "Local Equity", isChecked: false, value: ClassValue.LOCAL_EQUITY },
    { name: "Fixed Income", isChecked: false, value: ClassValue.FIXED_INCOME },
    { name: "Regional Equity", isChecked: false, value: ClassValue.REGIONAL_EQUITY },
    { name: "Global Equity", isChecked: false, value: ClassValue.GLOBAL_EQUITY },
    { name: "Cash", isChecked: false, value: ClassValue.CASH }
]

export const FundTypeFilters: Filter[] = [
    { name: 'All Types', isChecked: true, value: FundTypeValue.ALL_FUND },
    { name: "Conventional", isChecked: false, value: FundTypeValue.CONVENTIONAL },
    { name: "Shariah Complaint", isChecked: false, value: FundTypeValue.SHARIAH_COMPLAINT },
    { name: "CIMB Focus Funds", isChecked: false, value: FundTypeValue.CIMB_FOCUS_FUNDS }
]
