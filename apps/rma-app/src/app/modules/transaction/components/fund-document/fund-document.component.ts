import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FundDetail, FundDocument } from '../../models/funds.model';
import { TransactionService } from '../../services/transaction.service';
import { saveAs } from 'file-saver';
import { SnackbarService } from '../../services/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cimb-office-fund-document',
  templateUrl: './fund-document.component.html',
  styleUrls: ['./fund-document.component.scss']
})
export class FundDocumentComponent implements OnChanges {

    @Input() fundDetails: FundDetail;
    @Input() isSalesChanrgeVisible = false;
    fundDocuments$: Observable<FundDocument[]>;

    constructor(
        private readonly transactionService: TransactionService,
        private readonly sanckbarService: SnackbarService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes && changes.fundDetails && changes.fundDetails.firstChange) {
            const fundDetail = changes.fundDetails.currentValue as FundDetail;
            this.fundDocuments$ = this.getFundDocument(fundDetail).pipe(take(1));
        }
    }

    getRiskCategory(riskRating: string): string[]{
        const obj: {[obj: string]:any} = {
            "1": "DEFENSIVE",
            "2": "CONSERVATIVE",
            "3": "BALANCED",
            "4": "GROWTH",
            "5": "AGGRESSIVE"
        }
       return obj[riskRating] as string[];
    }

    getFundDocument(fundDetail: FundDetail): Observable<FundDocument[]> {
        return this.transactionService.getFundDetailSummury({fundCode: fundDetail.fundCode}).pipe(
            filter(d => !!d),
            take(1),
            map(summuryDetail => summuryDetail.fundDocument)
        )
    }

    downloadDocument(document: FundDocument): void {
        this.transactionService.downloadDocument(document).subscribe(res => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
            saveAs(res,`${document.documentName}.pdf`);
            this.sanckbarService.openSnackBar("Fund document downloaded successfully!", 'success');
        }, (err: Error | HttpErrorResponse) => {
            console.log(err);
            this.sanckbarService.openSnackBar("Fund document failed to download. Please try again.", 'warning');
        })
    }
}
