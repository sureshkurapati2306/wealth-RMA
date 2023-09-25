import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { IYearToDate, YData } from './../../+state/dashboard.models';

@Component({
  selector: 'cimb-office-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges,AfterViewInit {
    @Input() transaction: IYearToDate | null;
    title = 'Browser market shares at a specific website, 2021';
    type = ChartType.ColumnChart;
    data :Array<any>;
    month:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    longMonth = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    column = ['value', 'count', {type:'string',role:'tooltip'}];
    options = {
        chartArea:{width:"90.5%"},
        colors: ['#5CD3CD'],
        is3D: true,
        bar: { groupWidth: '30%' },
        legend: 'none' ,
        hAxis: {
            title: '',
            titleTextStyle: {
              color: '##4e4e4e',
              bold: true,
              italic: false,
              fontSize: 12,
            },
        },
        vAxis: {
            title: '',
            format:'short',
            titleTextStyle: {
                color: '##4e4e4e',
                bold: true,
                italic: false,
                fontSize: 12,
              },
        },
    };
    width = 0;
    height = 200;

    ngAfterViewInit(): void {
        const ele: HTMLElement = document.getElementsByClassName('chartboard')[0] as HTMLElement;
        this.width = ele.offsetWidth;
        this.height = 200;
    }

    ngOnChanges(): void {
        this.options.hAxis.title = this.transaction?.year ? this.transaction?.year?.toString() : "";
        this.options.vAxis.title = this.transaction?.currency ? this.transaction?.currency : 'MYR';
        this.transactionChart(( this. transaction && this.transaction.data) ? this.transaction.data : []);
    }

    transactionChart(year: YData[]): void {
        this.data = [];
        let chartMonth: YData;
        let amount :string;
        this.month.forEach((e, index) => {
            const c = year?.find((s) => s.month === index + 1);
            chartMonth = c ? c : {} as YData;
            amount = chartMonth?.totalAmount ? chartMonth?.totalAmount.toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}) : '0.00';
            this.data.push([e, (chartMonth?.month === index + 1 ? chartMonth?.totalAmount : 0.00),`Total transaction amount in ${this.longMonth[index]} is ${this.transaction?.currency} ${(chartMonth?.month === index+1  ? amount : 0.00)}`])
        })
    }
}
