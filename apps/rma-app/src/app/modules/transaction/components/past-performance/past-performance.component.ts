import { Component, Input, OnChanges } from '@angular/core';
import { IPastPerformanceResponse } from '../../+state/transaction.models';
import { FundDetail } from '../../models/funds.model';
import { TransactionService } from './../../services/transaction.service';

@Component({
  selector: 'cimb-office-past-performance',
  templateUrl: './past-performance.component.html',
  styleUrls: ['./past-performance.component.scss']
})
export class PastPerformanceComponent implements OnChanges{

    @Input() fundDetails: FundDetail;

    pastPerformance: IPastPerformanceResponse[];
    pastPerformanceHeader = ['1-Month','3-Month','6M','1Y','5Y']

    constructor(
        private transectionService:TransactionService
    ) {}

    ngOnChanges(): void{
      if(this.fundDetails){
        this.transectionService.getPastPerformance(this.fundDetails.fundCode).subscribe((response)=>{
          this.pastPerformance = response;
        })
      }
    }
}
