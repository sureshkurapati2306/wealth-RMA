import { Component, Input } from '@angular/core';
import { IRiskProfileDataResponse } from '../../models/risk-inquiry-detail.model';
import { IRPQuestionarie } from '../../models/risk-profile-summary.model';

@Component({
    selector: 'cimb-office-risk-profile-questionnaire',
    templateUrl: './risk-profile-questionnaire.component.html',
    styleUrls: ['./risk-profile-questionnaire.component.scss']
})
export class RiskProfileQuestionnaireComponent {

    @Input() customerApprovalLinkQuestionarie: IRPQuestionarie[] | null;

    @Input() riskProfile: IRiskProfileDataResponse;

    /* istanbul ignore next */
    getImageId(option: string): number {
        if(option.startsWith('Portfolio A')) return 1;
        if(option.startsWith('Portfolio B')) return 2;
        if(option.startsWith('Portfolio C')) return 3;
        if(option.startsWith('Portfolio D')) return 4;
        if(option.startsWith('Portfolio E')) return 5;
        return 0;
    }
}
