import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { riskProfileDataResponse, getCustomerStatus } from '../../+state/risk-profile.selector';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as RiskProfileAction from '../../+state/risk-profile.action';
import { MatDialog } from '@angular/material/dialog';
import { IRiskProfileDataResponse, CustomerStatusResponse } from '../../models/risk-inquiry-detail.model';
import { IRPQuestionarie } from '../../models/risk-profile-summary.model';
import { CustomerResolver, DialogMessageComponent } from '@cimb/mint-office';

@Component({
  selector: 'cimb-office-risk-profile-detail',
  templateUrl: './risk-profile-detail.component.html',
  styleUrls: ['./risk-profile-detail.component.scss']
})
export class RiskProfileDetailComponent implements OnInit {

    cifNumber: string;
    public riskProfile$: Observable<IRiskProfileDataResponse | null> = this.store.select(riskProfileDataResponse);
    public getCustomerStatus$:Observable<CustomerStatusResponse | null> = this.store.select(getCustomerStatus);

    constructor(
            private readonly store: Store,
            private readonly route: ActivatedRoute,
            public router: Router,
            private customerResolver: CustomerResolver,
            public readonly dialog: MatDialog,
    ) {
       this.route.data.subscribe(res => this.cifNumber = res.cifNumber as string);
    }

    ngOnInit(): void {
        this.store.dispatch(RiskProfileAction.getCustomerStatus({data:{
            cif: this.customerResolver.cifNumber ? this.customerResolver.cifNumber : ""
        }}))
    }

    getQuestioniore(): Observable<IRPQuestionarie[]> {
        return this.riskProfile$.pipe(
            filter(res => !!res),
            map(data => {
                if(!data) return [];
                const questionWithOption = data.RPQuestionaire.jsonFinal;
                const rpqQuestionaire: IRPQuestionarie[]  = []
                questionWithOption.forEach((q, index) => {
                    const answerOption = q.answer_options.find(o => o.answer_no === q.previous_answer_selected[0]);
                    const obj: IRPQuestionarie = {
                        additional: q.additional ? q.additional : "",
                        questionDesc: q.question_desc,
                        questionNumber: index + 1,
                        optionsDesc: answerOption ? answerOption.answer_desc : "",
                    }
                    rpqQuestionaire.push(obj);
                })
                return rpqQuestionaire;
        }))
    }

    gotoCustomerProfile(): void {
        this.customerResolver.cifNumber = this.cifNumber
        void this.router.navigate(['/customer'])
    }

    updateConfirmation(custStatus: CustomerStatusResponse): void {
        if(custStatus.rpqApprovalStatus === 'Y') {
            this.denyPopUp();
        } else {
            this.verifyPopUp();
        }
    }

    verifyPopUp(): void {
        this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '32.5rem',
            maxWidth: '32.5rem',
            minHeight: '16.5rem',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: "Verify Customer’s Details",
                icon: "icon-danger-1",
                description: `<p><strong>Important:</strong> Please verify the full customer’s details before proceeding.</p><p>Also, check and confirm the customer’s mobile number or select a different number (if available) for their digital approval.</p>`,
                btnOkLabel: "Yes, I have verified",
                btnCancelLable: "Return to Risk Profiling"
            },
        }).afterClosed()
        .subscribe((response: string) => {
            /* istanbul ignore if */
            if(response === 'Yes, I have verified') {
                this.customerResolver.cifNumber = this.cifNumber;

                void this.router.navigate([`/risk-profile/edit`]);
            }
        });
    }

    denyPopUp(): void {
        this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '32.5rem',
            maxWidth: '32.5rem',
            minHeight: '16.5rem',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: "Customer Approval Pending",
                icon: "icon-danger-1",
                description: `<p><strong>Important:</strong> You are not able to update your Risk Profile because the update request is still pending for customer approval.</p><br><br><br>`,
            },
        }).afterClosed()
        .subscribe();
    }

}
