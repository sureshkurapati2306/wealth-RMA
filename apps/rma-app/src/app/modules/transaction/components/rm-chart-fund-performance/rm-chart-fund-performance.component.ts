/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, Input, OnChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { IPerformanceChart } from '../../+state/transaction.models';
import { FundDetail } from '../../models/funds.model';
import { TransactionService } from './../../services/transaction.service';

@Component({
    selector: 'cimb-office-chart-fund-performance',
    templateUrl: './rm-chart-fund-performance.component.html',
    styleUrls: ['./rm-chart-fund-performance.component.scss']
})
export class RmChartFundPerformanceComponent implements OnChanges, AfterViewInit {

    constructor(private transectionService:TransactionService,private cd: ChangeDetectorRef) { }
    @Input() fundDetails:FundDetail;
    graphData: any;
    chartData: Array<[string, number]> = [];
    month = 1;
    lineChartData: Array<[Date, number, string]> = [];
    options: any;
    chartType = ChartType.LineChart;
    columns = ['NAV Price', 'Sales'];
    column = ['NAV Price', 'Sales', { type: 'string', role: 'tooltip' }];
    ChartMonth: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    currentChart = 1;
    GraphConfig = {
        curveType: 'function',
        lineStyle: "dotted",
        chartArea:{width:"87%"},
        hAxis: {
            title: 'Date',
            titleTextStyle: {
                color: '##4e4e4e',
                bold: true,
                italic: false,
                fontSize: 12,
            },
            ticks:[] as ({ v: Date; f: string; })[],
            gridlines: {
                color: 'transparent',
                count: null as any
            },
            format: 'MMM d',
        },
        vAxis: {
            title: 'NAV Price',
            titleTextStyle: {
                color: '##4e4e4e',
                bold: true,
                italic: false,
                fontSize: 12,
            },
            format: "MYR #,###",
            direction: 1,
            minorGridlines: {
                count: 1,
                minSpacing: 20
            },
            viewWindowMode: 'pretty'
        },
        colors: ['#49ccb5'],
        legend: { position: "none" }
    };
    width :number;
    height = 234;

    ngOnChanges(): void {
        if(this.fundDetails){
            this.toogleData(this.month);
        }
    }
    ngAfterViewInit(): void {
        const ele: HTMLElement = document.getElementsByClassName('chart')[0] as HTMLElement;
        this.width = ele.offsetWidth;
        this.cd.detectChanges();
    }

    /* istanbul ignore next */
    // eslint-disable-next-line sonarjs/cognitive-complexity
    loadChartData(month: number): void {
        let chartVAxis: Date;
        let ChartAmount: string
        this.graphData = [];
        this.lineChartData = [];
        let years:number[];
        this.currentChart = month;
        this.GraphConfig.hAxis.ticks = [];
        this.GraphConfig.hAxis.gridlines.count = null;
        if (month && this.chartData) {
            years = [];
            this.chartData.forEach((data) => {
                chartVAxis = new Date(`${data[0].slice(0, 4)}/${data[0].slice(4, 6)}/${data[0].slice(6, 8)}`);
                ChartAmount = data[1].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.lineChartData.push([chartVAxis, data[1], `MYR ${ChartAmount}`]);

                if(!years.includes(chartVAxis.getFullYear()) && month === 60){
                    years.push(chartVAxis.getFullYear());
                    this.GraphConfig.hAxis.ticks.push({
                        v: chartVAxis,
                        f: chartVAxis.getFullYear().toString()
                      })
                }
                if(!years.includes(chartVAxis.getMonth()) && month === 6){
                    years.push(chartVAxis.getMonth());
                    this.GraphConfig.hAxis.ticks.push({
                        v: chartVAxis,
                        f: this.ChartMonth[chartVAxis.getMonth()]
                      })
                }
            });
            this.graphData = this.lineChartData;
            if(month === 1 || month === 3) {
                this.GraphConfig.hAxis.gridlines.count = 14;
                this.GraphConfig.hAxis.ticks = [];
                this.GraphConfig.hAxis.format = 'MMM dd';
                this.GraphConfig.hAxis.title = 'Date';
            } else if(month === 6 || month === 12) {
                this.GraphConfig.hAxis.gridlines.count = null;
                if(month === 12){
                    this.GraphConfig.hAxis.ticks = [];
                } else if(month === 6 && this.GraphConfig.hAxis.ticks.length > 6) {
                    this.GraphConfig.hAxis.ticks.shift();
                }
                this.GraphConfig.hAxis.format = 'MMM';
                this.GraphConfig.hAxis.title = 'Month';
            } else if(month === 60) {
                this.GraphConfig.hAxis.gridlines.count = null;
                this.GraphConfig.hAxis.format = 'YYYY';
                this.GraphConfig.hAxis.title = 'Year';
            }
        }
    }

    /* istanbul ignore next */
    toogleData(data: number): void {
        this.month = data;
        const fundRequest: IPerformanceChart = {
            fundCode: this.fundDetails.fundCode,
            month: data
        }
        if(this.fundDetails){
            this.transectionService.getPerformanceChart(fundRequest).subscribe((response)=>{
              this.chartData = response;
              this.loadChartData(this.month);
            })
          }
    }
}
