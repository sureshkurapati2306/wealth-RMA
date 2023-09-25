import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Customer, CustomerResolver, DialogMessageComponent, MintOfficeSelectors, RiskProfileResolver, RiskProfileSummaryResolver, StorageService } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CanDeactivateComponent } from '../../../shared/gaurds/can-deactivate.gaurd';
import { RPQuestionnaireResponse, RPQuestionnaireRequest, RPQTnxResponse, RPQuestionnaireDetail, RPQTnxReq } from '../../models/risk-inquiry-detail.model';
import { RiskProfileService } from '../../services/risk-profile.service';
import * as RiskProfileAction from './../../+state/risk-profile.action';
import { updateRiskProfileQuestionnaire } from './../../+state/risk-profile.selector';

@Component({
  selector: 'cimb-office-risk-profile-edit',
  templateUrl: './risk-profile-edit.component.html',
  styleUrls: ['./risk-profile-edit.component.scss']
})

export class RiskProfileEditComponent implements OnInit, CanDeactivateComponent, OnDestroy {

  enableUpdateBtn = false;
  isFormDirty: boolean;

  public riskProfileQuestionnaire$: Observable<RPQuestionnaireResponse>;

  cifNumber: RPQuestionnaireRequest;

  public customer$: Observable<Customer | null> = this.store.select(MintOfficeSelectors.customer);
  public updateRiskProfileQuestionnaire$: Observable<RPQTnxResponse | null> = this.store.select(updateRiskProfileQuestionnaire).pipe(filter(x => !!x));

  rpQuestionnaireDetails: RPQuestionnaireDetail[];

  okBtnLabel = "Yes, Return to Customer Profile";
  yesConfirm = 'Yes, I confirm';
  returnTitle = 'Confirm to return to Customer Profile';

  private _redirectUrl = '/customer';

  constructor(
    public dialog: MatDialog,
    public location: Location,
    private riskProfileService: RiskProfileService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private customerResolver: CustomerResolver,
    private riskProfileResolver: RiskProfileResolver,
    private riskProfileSummaryResolver: RiskProfileSummaryResolver,
    private readonly storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((res: Data) => {
      this.cifNumber = res["riskProfileData"] as RPQuestionnaireRequest;
      this.getRiskQuestionnaire();
    })
  }

  getRiskQuestionnaire(): void {
    if (!this.cifNumber) return;

    let payload: RPQuestionnaireRequest;
    if (!this.cifNumber.isEdit) {
      payload = { cifNumber: this.cifNumber.cifNumber };
    } else {
      payload = { transactionId: this.cifNumber.transactionId };
    }
    this.riskProfileQuestionnaire$ = this.riskProfileService.getMockRiskProfileData(payload, this.cifNumber.isEdit);
  }

  onCancel(): void {
    this.openDialog(true).pipe(
      filter(x => !!x),
      map(result => {
        if (result === this.okBtnLabel) {
          this.isFormDirty = false;
          this.customerResolver.cifNumber = this.cifNumber.cifNumber;
          void this.router.navigateByUrl('/customer');
        }
      })
    ).subscribe();
  }

  openDialog(isCancel: boolean): Observable<any> {
    return this.dialog.open(DialogMessageComponent, {
      panelClass: ['custom-dialog'],
      maxWidth: isCancel ? '520px' : '560px',
      minHeight: isCancel ? '245px' : '240px',
      autoFocus: false,
      data: {
        title: isCancel ? this.returnTitle : 'Confirm to update risk profile',
        description: isCancel ? '<div class="content-main-div"><div class="content-divs">Do you want to cancel this risk profiling and return to Customer profile page?</div><br/><div class="content-divs">Filled values will not be saved if you proceed.<br/></div</div>' : '<div class="content-main-div"><div class="content-divs">Are you sure you want to update the customer’s risk profile?</div><br/><div class="content-divs">Please check all of your information is correct before proceeding.<br/></div><br/><div class="content-divs">A QR code and an approval link will be created for customer’s approval.<br/></div></div>',
        dialogLeaveButton: false,
        btnOkLabel: isCancel ? this.okBtnLabel : this.yesConfirm,
        btnCancelLable: 'Cancel',
        dialogLeaveButtonText: null
      },
    }).afterClosed();
  }

  riskProfileFormData(formData: UntypedFormGroup): void {
    this.enableUpdateBtn = formData?.valid;
    this.isFormDirty = formData.dirty;
    this.createRPQuestionnaireDetail(formData);
  }

  createRPQuestionnaireDetail(formData: UntypedFormGroup): void {
    this.rpQuestionnaireDetails = [];
    Object.keys(formData.controls).forEach(key => {
      const qNumber: number = parseInt(key.slice(1, key.length));
      const selectedOption: number = formData.controls[key].value as number;

      const rpQuestionaireDetail: RPQuestionnaireDetail = {
        multiSelect: "N",
        options: [selectedOption],
        questionNumber: qNumber
      };
      this.rpQuestionnaireDetails.push(rpQuestionaireDetail);
    });
  }

  /* istanbul ignore next */
  createRPQTnx(): void {
    const date = new Date().toISOString();
    const rmId = this.storageService.getItem<string>('rmId');
    const rpqTnxReq: RPQTnxReq = {
      trxId: this.cifNumber.isEdit ? +this.cifNumber.transactionId : undefined,
      requestUid: date + (Math.random() * 100).toFixed(0).toString(),
      rmId: rmId ? rmId : "",
      sibsCif: this.cifNumber?.cifNumber,
      rpqQuestionAnswerDetail: this.rpQuestionnaireDetails
    };

    this.openDialog(false).
      pipe(
        map(res => {
          if (res === this.yesConfirm && !!this.rpQuestionnaireDetails) {
            this.store.dispatch(RiskProfileAction.updateRiskProfileQuestionnaireReq({
              data: rpqTnxReq
            }));

            return true;
          }

          return false;
        }),
        switchMap(status => {
          if (!status) return of(null);

          return this.updateRiskProfileQuestionnaire$.pipe(
            filter(x => !!x),
          )
        })
      ).subscribe((response: RPQTnxResponse | null) => {
        if (!response) return
        if(Object.keys(response).length > 0) {
            this.riskProfileResolver.cifNumber = this.cifNumber?.cifNumber;
            this.riskProfileSummaryResolver.trxId = response?.trxId.toString();

            this.isFormDirty = false;
            this._redirectUrl = '/risk-profile/summary';
            void this.router.navigateByUrl('/risk-profile/summary');
        }
      })

  }

  openDirtyCheckPopup(): void {
    return this.isFormDirty ? this.onCancel() : void this.router.navigateByUrl(this._redirectUrl);
  }

  /* istanbul ignore next */
  dirtyCheckDialog(): Observable<boolean> {
    this.openDirtyCheckPopup();
    return of(false);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload($event: BeforeUnloadEvent) {
    if (this.canDeactivate()) {
      $event.returnValue = true;
    }
  }

  canDeactivate() {
    return this.isFormDirty;
  }

  ngOnDestroy(): void {
    this.riskProfileResolver.isEdit = false;
  }
}
