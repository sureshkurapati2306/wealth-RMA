import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { customerInvestment } from '../../+state/customer.selector';

@Component({
    selector: 'cimb-office-customer-chart',
    templateUrl: './customer-chart.component.html',
    styleUrls: ['./customer-chart.component.scss'],
})
export class CustomerChartComponent implements OnInit {

    public chartConfig: any;
    private investments = 0;
    private savings = 0;
    private expenses = 0;
    private total = this.investments + this.savings + this.expenses;
    private inv = (Math.round(this.investments * 100) / this.total).toFixed(2);
    private sav = (Math.round(this.savings * 100) / this.total).toFixed(2);
    private exp = (Math.round(this.expenses * 100) / this.total).toFixed(2);

    constructor(private store: Store) {}

    private customerInvestments$ = this.store.select(customerInvestment).pipe(filter(x => !!x));

    ngOnInit(): void {

        this.customerInvestments$.pipe(
            map(res => {
                this.investments = res.investmentAmount;
                this.expenses = res.creditCard + res.loanAndFinance;
                this.savings = res.casaAmount + res.fixedDeposit;

                this.total = this.investments + this.savings + this.expenses;

                this.inv = (Math.round(this.investments * 100) / this.total).toFixed(2);
                this.sav = (Math.round(this.savings * 100) / this.total).toFixed(2);
                this.exp = (Math.round(this.expenses * 100) / this.total).toFixed(2);

                this.setChartConfig();

            })
        ).subscribe()

    }

    setChartConfig(): void {
        this.chartConfig = {
            pieFormatters: [
                {
                    formatter: new google.visualization.NumberFormat({ pattern: 'MYR #,###.00' }),
                    colIndex: 1,
                },
            ],
            type: 'PieChart',
            investments: this.investments,
            savings: this.savings,
            expenses: this.expenses,
            total: this.total,
            inv: this.inv,
            sav: this.sav,
            exp: this.exp,
            data: [
                ['Savings (' + this.sav + '%)', this.savings],
                ['Investments (' + this.inv + '%)', this.investments],
                ['Expenses (' + this.exp + '%)', this.expenses],
            ],
            columnNames: ['MYR', '2022'],
            options: {
                colors: ['#4FA14F', '#567DCC', '#955CD6'],
                chartArea: {
                    width: '850',
                    height: '280',
                },
                pieSliceText: 'none',

                legend: {
                    labeledValueText: 'value',
                    textStyle: { color: 'black', fontSize: '16', },
                    position: 'labeled',
                },

                tooltip: {
                    trigger: 'none',
                },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'inAndOut',
                },
                pieStartAngle: 180,
                pieHole: 0.5,
            },
            width: 900,
            height: 300,
        }
    }


}
