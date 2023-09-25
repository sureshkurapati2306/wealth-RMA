import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RiskProfileToRatingPipe } from '@cimb/core';
import { TransactionType } from '@cimb/mint-office';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { ISearchFundData } from '../../+state/transaction.models';
import { MockFundDetailData, MockISearchFundData, MockRiskProfileInquiry } from '../../mock/fund-details.mock';
import { MockSalesChargeResponse } from "../../mock/sales-charge.mock";
import { FundCardStatus, FundDetail } from '../../models/funds.model';
import { IRiskProfileInquiryResponse, RiskProfile } from '../../models/risk-profile.model';
import { TransactionService } from '../../services/transaction.service';
import { FundCardComponent } from './fund-card.component';

describe('FundCardComponent', () => {
  let component: FundCardComponent;
  let fixture: ComponentFixture<FundCardComponent>;
  let transactionService: TransactionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FundCardComponent,
        RiskProfileToRatingPipe
    ],
      imports: [
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        TransactionService,
        provideMockStore({ initialState: {
            riskProfileInquiry: MockRiskProfileInquiry
        }}),
      ]
    })
    .compileComponents();

    transactionService = TestBed.inject(TransactionService);
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(FundCardComponent);
    component = fixture.componentInstance;
    component.fundDeatil = MockISearchFundData[0];
    component.accountForm = new FormGroup({
        totalAmount: new FormControl(''),
        salesChargeId: new FormControl('default'),
        salesChargeRate: new FormControl(''),
        salesChargeAmount: new FormControl(''),
        remark: new FormControl('')
    });
    component.pageType = "Subscribe";
    fixture.detectChanges();
  });

  it('should create', () => {
    component.openFundDetails(MockISearchFundData[0]);
    expect(component).toBeTruthy();
  });

  it('on after viewInit', () => {
    const spy = jest.spyOn(component, 'emitDeviationStatus');
    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit event on remove recod', () => {
    const spy = jest.spyOn(component.remove, 'emit');
    component.removeRecord();
    expect(spy).toHaveBeenCalledWith(MockISearchFundData[0]);
  })

  it('should change status od deviation', ()=> {
    component.emitDeviationStatus();
    expect(component.isDeviation).toBe(false);
  });

  it('disable form controls on init except totalAmount', () => {
    component.ngAfterContentChecked();
    const subsControl = component.accountForm.controls['totalAmount'] as FormControl;
    expect(subsControl.disabled).toBe(false);
  });

  it('disable all form controls on init when fund is inactive', () => {
    component.fundDeatil.fundStatus = 'C'
    component.ngAfterContentChecked();
    const subsControl = component.accountForm.controls['salesChargeRate'] as FormControl;
    expect(subsControl.disabled).toBe(true);
  });

  it('enable all fields when scuscription amount is changed', () => {
    component.enableForm();
    const subsControl = component.accountForm.controls['salesChargeRate'] as FormControl;
    expect(subsControl.disabled).toBe(true);
  });

  it('should set sales charge when any change haapen in salesChargeRate or totalAmount', () => {
    component.accountForm.patchValue({totalAmount: "2,000.00", salesChargeRate: '1.5%'});
    expect(component.f.salesChargeAmount.value).toBe("30.00");
  });

  it('should set sales charge to 0 when salesChargeRate are not a valid number', () => {
    component.accountForm.patchValue({totalAmount: "2,000.00", salesChargeRate: '1.5s%'});
    expect(component.f.salesChargeAmount.value).toBe("");
  })

  it('should set sales charge to 0 when totalAmount are not a valid number', () => {
    component.accountForm.patchValue({totalAmount: '', salesChargeRate: '1.5%'});
    expect(component.f.salesChargeAmount.value).toBe("");
  });

  it('should add % as prefix when focus changed from salesChargeRate', async() => {
    const rateElement = fixture.debugElement.query(By.css('div.rate input.mat-input-element')).nativeElement as HTMLInputElement;
    const spy = jest.spyOn(component, 'formatRate');

    expect(rateElement.value).toBe('');

    rateElement.value = '12.5';
    component.f.salesChargeRate.setValue('12.5');
    rateElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
    expect(component.f.salesChargeRate.value).toBe('12.50');
  });

  it('should detect length of remark', () => {
    const key: Partial<KeyboardEvent> = {
        key: 'R',
        preventDefault: () => { /* */}
    };
    const spy = jest.spyOn(key, 'preventDefault');
    let longString = '';
    for (let index = 0; index < 500; index++) {
        longString += 's';

    }

    component.f.remark.setValue(longString);
    component.formatDescription(key as KeyboardEvent);
    expect(spy).toHaveBeenCalled();
  });


  it('should not format salesChargeRate if there is no valid salesChargeRate value', () => {
    const key: Partial<KeyboardEvent> = {
        key: 's',
        preventDefault: () => { /* */}
    };
    const spy = jest.spyOn(key, 'preventDefault');
    component.f.salesChargeRate.setValue('12.5%');

    component.formatDecimalError(key as KeyboardEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should prevent typing if salesChargeRate is greater then 100%', () => {
    const key: Partial<KeyboardEvent> = {
        key: '1',
        preventDefault: () => { /* */}
    };
    const spy = jest.spyOn(key, 'preventDefault');
    component.f.salesChargeRate.setValue('100%');

    component.formatDecimalError(key as KeyboardEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should prevent typing if salesChargeRate already have one decimal number', () => {
    const key: Partial<KeyboardEvent> = {
        key: '1',
        preventDefault: () => { /* */}
    };
    const spy = jest.spyOn(key, 'preventDefault');
    component.f.salesChargeRate.setValue('99.11%');

    component.formatDecimalError(key as KeyboardEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should path default value when selected default as sales charge', () => {
    component._salesChargeDropDown = MockSalesChargeResponse;
    component.onSalesChargeIdChange('default');

    expect(component.f.salesChargeRate.disabled).toBe(true);
    expect(component.f.salesChargeRate.value).toBe('3.00');
  });

  it('should path default value when selected other then default as sales charge', () => {
    component._salesChargeDropDown = MockSalesChargeResponse;
    component.onSalesChargeIdChange('adhoc');

    expect(component.f.salesChargeRate.disabled).toBe(false);
    expect(component.f.salesChargeRate.value).toBe('1.48');
  });


  it('should path default value when selected other then default as sales charge with no min rate', () => {
    component._salesChargeDropDown = MockSalesChargeResponse;
    component.onSalesChargeIdChange('dummy');

    expect(component.f.salesChargeRate.disabled).toBe(false);
    expect(component.f.salesChargeRate.value).toBe('0.00');
  });

  it('get valid number from string', ()=> {
    const spy = jest.spyOn(component, 'getUnitInNumber');
    component.getUnitInNumber('12,345.00');

    expect(spy).toReturnWith(12345.00);
  })

  it('should set form on redeem all change', () => {
    component.redeemForm =  new FormGroup({
        outUnit: new FormControl(''),
        redeemAll: new FormControl(false),
    })
    const event = {
        checked: true,
        source: null,
    }

    component.onRedeemChange(event as unknown as MatCheckboxChange);

    expect(component.rForm.outUnit.disabled).toBe(true);

  })

  it('should set form on redeem all change', () => {
    component.redeemForm =  new FormGroup({
        outUnit: new FormControl(''),
        redeemAll: new FormControl(false),
    })
    const event = {
        checked: false,
        source: null,
    }

    component.onRedeemChange(event as unknown as MatCheckboxChange);

    expect(component.rForm.outUnit.disabled).toBe(false);

  });


  it('should set form on switch all change', () => {
    component.switchForm =  new FormGroup({
        outUnit: new FormControl(''),
    })
    const event = {
        checked: false,
        source: null,
    }

    component.onSwitchAllChange(event as unknown as MatCheckboxChange);

    expect(component.sForm.outUnit.disabled).toBe(false);

  })


  it('should set form on switch all change', () => {
    component.switchForm =  new FormGroup({
        outUnit: new FormControl(''),
    })
    const event = {
        checked: true,
        source: null,
    }

    component.onSwitchAllChange(event as unknown as MatCheckboxChange);

    expect(component.sForm.outUnit.disabled).toBe(true);

  });

  it('should patch the correct switch in', () => {
    component.switchForm =  new FormGroup({
        switchSearchParam: new FormControl(''),
        switchInFundCode: new FormControl(''),
    })
    const event = {
        option: {
            value: {
                fundName: 'fundName',
                fundCode: 'fundCode'
            }
        }
    }

    component.getSelectedSwitchOut(event as MatAutocompleteSelectedEvent);

    expect(component.sForm.switchSearchParam.value).toEqual('fundName');
    expect(component.sForm.switchInFundCode.value).toEqual('fundCode');
  });

  it('should disable switch all', () => {
    component.switchForm =  new FormGroup({
        switchAll: new FormControl(false),
        switchSearchParam: new FormControl('')
    });

    component.fundDeatil = {...component.fundDeatil, ...{unitsHeld: 5000, maxSwitchOut: 3000}}

    component.setSwitchForm();

    expect(component.sForm.switchAll.disabled).toBe(true);
  })

  it('should enable switch all', () => {
    component.switchForm =  new FormGroup({
        switchAll: new FormControl(false),
        switchSearchParam: new FormControl('')
    });

    component.fundDeatil = {...component.fundDeatil, ...{unitsHeld: 2000, maxSwitchOut: 3000}}

    component.setSwitchForm();

    expect(component.sForm.switchAll.disabled).toBe(true);
  })

  it('should disable redeem all', () => {
    component.redeemForm =  new FormGroup({
        redeemAll: new FormControl(false)
    });

    component.fundDeatil = {...component.fundDeatil, ...{unitsHeld: 5000, maxRedeem: 3000}}

    component.setRedeemForm();

    expect(component.rForm.redeemAll.disabled).toBe(true);
  })

  it('should enable redeem all', () => {
    component.redeemForm =  new FormGroup({
        redeemAll: new FormControl(false)
    });

    component.fundDeatil = {...component.fundDeatil, ...{unitsHeld: 2000, maxRedeem: 3000}}

    component.setRedeemForm();

    expect(component.rForm.redeemAll.disabled).toBe(true);
  });


  it('should calculate the status when form change for subscribe', () => {
    component.accountForm = new FormGroup({
        totalAmount: new FormControl('123'),
        salesChargeId: new FormControl('default'),
        salesChargeRate: new FormControl('0%'),
        salesChargeAmount: new FormControl('0.00'),
        remark: new FormControl(''),
        currencyCode: new FormControl(''),
        fundCode: new FormControl('FD1234'),
        units: new FormControl('1234'),
    });

    component.switchForm = new FormGroup({
        outUnit: new FormControl('')
    });
    component.redeemForm = new FormGroup({
        outUnit: new FormControl('')
    });

    transactionService.transactionType = TransactionType.SUBSCRIBE;
    component.triggerFundStatus();

    const expectedResponse: FundCardStatus = {
        status: 'VALID',
        data: {
            totalAmount: '123',
            salesChargeId: 'default',
            salesChargeRate: '0%',
            salesChargeAmount: '0.00',
            remark: '',
            currencyCode: '',
            fundCode: 'FD1234',
            units: '1234',
            fundStatus:'Active',
            outUnit: ''
        }
    }

    expect(component.status).toEqual(expectedResponse);
  });


  it('should calculate the status when form change for redeem', () => {
    component.accountForm = new FormGroup({
        totalAmount: new FormControl(''),
        salesChargeId: new FormControl(''),
        salesChargeRate: new FormControl('0%'),
        salesChargeAmount: new FormControl('0.00'),
        remark: new FormControl(''),
        currencyCode: new FormControl(''),
        fundCode: new FormControl(''),
        units: new FormControl(''),
    });

    component.switchForm = new FormGroup({
        outUnit: new FormControl('4321'),
        switchInFundCode: new FormControl('AB1234'),
    });

    component.redeemForm = new FormGroup({
        outUnit: new FormControl('1234555'),
        redeemAll: new FormControl(),
    });

    transactionService.transactionType = TransactionType.REEDEEM;
    component.triggerFundStatus();

    const expectedResponse: FundCardStatus = {
        status: 'VALID',
        data: {
            totalAmount: '',
            salesChargeId: '',
            salesChargeRate: '0%',
            salesChargeAmount: '0.00',
            remark: '',
            currencyCode: '',
            fundCode: '',
            units: '',
            switchInFundCode: 'AB1234',
            fundStatus:'Active',
            outUnit: '1234555'
        }
    }

    expect(component.status).toEqual(expectedResponse);
  })

  it('should calculate the status when form change for switch', () => {
    component.accountForm = new FormGroup({
        totalAmount: new FormControl(''),
        salesChargeId: new FormControl(''),
        salesChargeRate: new FormControl('0%'),
        salesChargeAmount: new FormControl('0.00'),
        remark: new FormControl(''),
        currencyCode: new FormControl(''),
        fundCode: new FormControl(''),
        units: new FormControl(''),
    });

    component.switchForm = new FormGroup({
        outUnit: new FormControl('4321'),
        switchInFundCode: new FormControl('AB1234'),
    });

    component.redeemForm = new FormGroup({
        outUnit: new FormControl('1234555'),
        redeemAll: new FormControl(),
    });

    transactionService.transactionType = TransactionType.SWITCH;
    component.triggerFundStatus();

    const expectedResponse: FundCardStatus = {
        status: 'VALID',
        data: {
            totalAmount: '',
            salesChargeId: '',
            salesChargeRate: '0%',
            salesChargeAmount: '0.00',
            remark: '',
            currencyCode: '',
            fundCode: '',
            units: '',
            switchInFundCode: 'AB1234',
            fundStatus:'Active',
            outUnit: '4321'
        }
    }

    expect(component.status).toEqual(expectedResponse);
  });

  it('should get fund details', () => {
    jest.spyOn(transactionService, 'getFundDetails').mockReturnValue(of(MockFundDetailData));
    component.switchOutFunds$ = of(MockISearchFundData);

    const spy = jest.spyOn(component, 'getSwitchInFundDetails');

    component.populateSelectedSwitchInFund('FD1234');

    expect(spy).toHaveBeenCalled();
    expect(component.selectedSwitchInFund).toBeDefined();

  });

  it('should set selected fund undefined is api gives error', () => {
    const errorResponse = new HttpErrorResponse({
        error: '404 error',
        status: 404
    });
    jest.spyOn(transactionService, 'getFundDetails').mockReturnValue(throwError(errorResponse));
    component.switchOutFunds$ = of(MockISearchFundData);
    const spy = jest.spyOn(component, 'getSwitchInFundDetails');
    component.populateSelectedSwitchInFund('FD1234');

    expect(spy).toHaveBeenCalled();
    expect(component.selectedSwitchInFund).toBe(null);
  });

  it('should give risk deviation status true for defensive profile', () => {
    const profile: Partial<IRiskProfileInquiryResponse> = {
        riskProfile: 'Defensive' as RiskProfile
    };
    const detail: Partial<FundDetail> = {
        riskRating: "3"
    }
    const fund: Partial<ISearchFundData> = {
        details: detail as FundDetail
    };

    const spy = jest.spyOn(component, 'isRiskDeviation');
    component.isRiskDeviation(profile as IRiskProfileInquiryResponse, fund as ISearchFundData);

    expect(spy).toReturnWith(true);
  })

  it('should give risk deviation status flase for growdth profile', () => {
    const profile: Partial<IRiskProfileInquiryResponse> = {
        riskProfile: 'Growth' as RiskProfile
    };
    const detail: Partial<FundDetail> = {
        riskRating: "3"
    }
    const fund: Partial<ISearchFundData> = {
        details: detail as FundDetail
    };

    const spy = jest.spyOn(component, 'isRiskDeviation');
    component.isRiskDeviation(profile as IRiskProfileInquiryResponse, fund as ISearchFundData);

    expect(spy).toReturnWith(false);
  });


  it('should give risk deviation status flase null values', () => {
    const profile: Partial<IRiskProfileInquiryResponse> | null = null;
    const detail: Partial<FundDetail> = {
        riskRating: "3"
    }
    const fund: Partial<ISearchFundData> = {
        details: detail as FundDetail
    };

    const spy = jest.spyOn(component, 'isRiskDeviation');
    component.isRiskDeviation(profile ? profile as IRiskProfileInquiryResponse : {} as IRiskProfileInquiryResponse, fund as ISearchFundData);

    expect(spy).toReturnWith(false);
  });


  it('should fix he rate for salesChargeRate', () => {
    component.accountForm = new FormGroup({
      salesChargeRate: new FormControl(''),
    })

    component.accountForm.get('salesChargeRate')?.patchValue('98.76%');

    component.removePercentage();

    expect(component.accountForm.get('salesChargeRate')?.value).toEqual('98.76')
  });

  it('should fix he rate for salesChargeRate when zero is entered', () => {
    component.accountForm = new FormGroup({
      salesChargeRate: new FormControl(''),
    })

    component.accountForm.get('salesChargeRate')?.patchValue('0.00%');

    component.removePercentage();

    expect(component.accountForm.get('salesChargeRate')?.value).toEqual('');
  })

  it('should get Defensive when rating is 1', () => {
    const spy = jest.spyOn(component, 'getRiskType');

    component.getRiskType('1');

    expect(spy).toHaveReturnedWith('Defensive');
  })

  it('should get Balanced when rating is 3', () => {
    const spy = jest.spyOn(component, 'getRiskType');

    component.getRiskType('3');

    expect(spy).toHaveReturnedWith('Balanced');
  })

  it('should get Growth when rating is 4', () => {
    const spy = jest.spyOn(component, 'getRiskType');

    component.getRiskType('4');

    expect(spy).toHaveReturnedWith('Growth');
  })

  it('should get Aggressive when rating is 5', () => {
    const spy = jest.spyOn(component, 'getRiskType');

    component.getRiskType('5');

    expect(spy).toHaveReturnedWith('Aggressive');
  })

  it('should get empty string when rating is default', () => {
    const spy = jest.spyOn(component, 'getRiskType');

    component.getRiskType('default');

    expect(spy).toHaveReturnedWith('');
  })

  it('should get SalesChargeDropDown list', () => {
    jest.spyOn(transactionService, 'getSalesChargeDropDown').mockReturnValue(of(MockSalesChargeResponse));

    const spy = jest.spyOn(component, 'onBlur');
    component.onBlur();
    expect(spy).toHaveBeenCalled();
    expect(component._salesChargeDropDown).toBeDefined();

  });

  it('should get setPreviousValue', () => {
    const spy = jest.spyOn(component, 'setPreviousValue').mockReturnValue('1.00');

    component.setPreviousValue('adhoc','1.00');
    expect(spy).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

});
