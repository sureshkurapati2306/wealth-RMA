import { CategoryValue, ClassValue, FundTypeValue } from "../enum/filter-value.enum";

export interface Filter {
    isChecked: boolean;
    name: string;
    value: CategoryValue | ClassValue | FundTypeValue;
}

export interface CifNumber{
    cif: string | null;
}
