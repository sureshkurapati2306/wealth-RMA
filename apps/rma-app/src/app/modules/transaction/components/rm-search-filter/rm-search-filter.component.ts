import { Component, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { CategoryFilters, ClassFilters, FundTypeFilters } from '../../constants/filter';
import { CategoryValue, ClassValue, FundTypeValue } from '../../enum/filter-value.enum';
import { Filter } from '../../models/filters.model';

@Component({
    selector: 'cimb-office-search-filter',
    templateUrl: './rm-search-filter.component.html',
    styleUrls: ['./rm-search-filter.component.scss'],
})

export class RmSearchFilterComponent implements OnDestroy {

    filtersOpen = false;

    categoryRisk: Filter[] = CategoryFilters
    classList: Filter[] = ClassFilters
    fundList: Filter[] = FundTypeFilters;
    category: Filter[] = [CategoryFilters[0]]
    class: Filter[] = [ClassFilters[0]]
    fund: Filter[] = [FundTypeFilters[0]]

    resetEnable = false;
    controls: any;

    @ViewChildren('allCategory') allCategoryCheckbox: QueryList<MatCheckbox>;
    @ViewChildren('allClassCheckbox') allClassCheckbox: QueryList<MatCheckbox>;
    @ViewChildren('allType') allTypeCheckbox: QueryList<MatCheckbox>;

    /* istanbul ignore next */
    onChange_category(value: Filter): void {
        const allCategoryCheckbox = this.allCategoryCheckbox.first

        if(this.category.includes(CategoryFilters[0])) {
            const index = this.category.findIndex(c => c.name === CategoryFilters[0].name)
            this.category.splice(index, 1);

            if(value.name !== CategoryFilters[0].name) {
                allCategoryCheckbox.checked = false;
                this.categoryRisk[0].isChecked = false;
            }
        }
        if(value.name === CategoryFilters[0].name && !value.isChecked) {
            this.categoryRisk.forEach(c => c.isChecked = false)
        }
        value.isChecked = !value.isChecked;

        this.category = [];
        this.categoryRisk.forEach(c => {
            if(c.isChecked) {
                this.category.push(c);
            }
        })

        if(this.category.length === 0) {
            this.allCategoryCheckbox.first.checked = true;
            this.category.push(CategoryFilters[0]);
        }
     }

     /* istanbul ignore next */
    onChange_class(value: Filter): void {
        const allClassCheckbox = this.allClassCheckbox.first

        if(this.class.includes(ClassFilters[0])) {
            const index = this.class.findIndex(c => c.name === ClassFilters[0].name)
            this.class.splice(index, 1);

            if(value.name !== ClassFilters[0].name) {
                allClassCheckbox.checked = false;
                this.classList[0].isChecked = false;
            }
        }
        if(value.name === ClassFilters[0].name && !value.isChecked) {
            this.classList.forEach(c => c.isChecked = false)
        }
        value.isChecked = !value.isChecked;

        this.class = [];
        this.classList.forEach(c => {
            if(c.isChecked) {
                this.class.push(c);
            }
        })

        if(this.class.length === 0) {
            this.allClassCheckbox.first.checked = true;
            this.class.push(ClassFilters[0]);
        }
    }

    /* istanbul ignore next */
    onChange_fund(value: Filter): void {
        const allTypeCheckbox = this.allTypeCheckbox.first

        if(this.fund.includes(FundTypeFilters[0])) {
            const index = this.fund.findIndex(c => c.name === FundTypeFilters[0].name)
            this.fund.splice(index, 1);

            if(value.name !== FundTypeFilters[0].name) {
                allTypeCheckbox.checked = false;
                this.fundList[0].isChecked = false;
            }
        }
        if(value.name === FundTypeFilters[0].name && !value.isChecked) {
            this.fundList.forEach(c => c.isChecked = false)
        }
        value.isChecked = !value.isChecked;

        this.fund = [];
        this.fundList.forEach(c => {
            if(c.isChecked) {
                this.fund.push(c);
            }
        })

        if(this.fund.length === 0) {
            this.allTypeCheckbox.first.checked = true;
            this.fund.push(FundTypeFilters[0]);
        }
    }

    /* istanbul ignore next */
    reset(): void {
        this.category = [CategoryFilters[0]];
        this.class = [ClassFilters[0]];
        this.fund = [FundTypeFilters[0]];
        if(this.filtersOpen) {
            this.allCategoryCheckbox.forEach(e => e.checked = false);
            this.allClassCheckbox.forEach(e => e.checked = false);
            this.allTypeCheckbox.forEach(e => e.checked = false);
            this.allCategoryCheckbox.first.checked = true;
            this.allClassCheckbox.first.checked = true;
            this.allTypeCheckbox.first.checked = true;
        }
        this.category[0].isChecked = true;
        this.class[0].isChecked = true;
        this.fund[0].isChecked = true;

        this.categoryRisk.forEach(c =>  c.isChecked = c.value === CategoryValue.All_CATEGORY);
        this.classList.forEach(c =>  c.isChecked = c.value === ClassValue.ALL_CLASSES);
        this.fundList.forEach(c =>  c.isChecked = c.value === FundTypeValue.ALL_FUND);
    }

    /* istanbul ignore next */
    isResetDisable(): boolean {
        return this.category.includes(CategoryFilters[0]) && this.class.includes(ClassFilters[0]) && this.fund.includes(FundTypeFilters[0]);
    }

    ngOnDestroy(): void {
        this.reset()
    }

}
