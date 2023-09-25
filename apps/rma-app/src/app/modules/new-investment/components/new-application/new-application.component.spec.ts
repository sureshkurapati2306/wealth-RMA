import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewApplicationComponent } from './new-application.component';
import { Action, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Environment, DialogMessageComponent, MockCustomerProfile, CustomerProfile } from '@cimb/mint-office';
import { MockOccupations, MockCoutryLIst, MockRaceList, MockReligionList, MockCitizens, MockEmployementList, MockGenderList, MockMaritalList, MockSalutations, MockCustomerType, MockAddressTypeList, MockStatesList, mockUtAccountOpeningRequest } from '../../mock/new-investment-spec.mock';
import { By } from '@angular/platform-browser';
import * as Actions from '../../+state/new-application.actions';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { MockTransactionService } from '../../../transaction/transaction.component.spec';
import { provideMockActions } from '@ngrx/effects/testing';
import { GenderList, RaceList, CitizenList, ReligionList, CountryList, MaritalList } from '../../model/new-investment.model';

describe('NewApplicationComponent', () => {
  let component: NewApplicationComponent;
  let fixture: ComponentFixture<NewApplicationComponent>;
  let transactionService: TransactionService;
  let actions: Observable<Action>;
  const mockProfileData = {
    ...MockCustomerProfile,
    category: 'NTP'
  } as CustomerProfile;

  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }
  const matOptionText = 'span.mat-option-text';
  const raceListSelector = 'div.racelist input.mat-input-element';
  const genderSelector = 'div.genderlist input.mat-input-element';
  const nationalitySelector = 'div.nationality input.mat-input-element';
  const citizenSelector = 'div.citizenlist input.mat-input-element';
  const maritalSelector = 'div.maritalist input.mat-input-element';
  const religionSelector = 'div.religionlist input.mat-input-element';

  const checkResultNotNull = (spy: any, res: any[]) => {
    expect(spy).toHaveBeenCalled();
    expect(res).not.toBe(null)
  }

  const checkResultEmptyArray = (spy: any, res: any[]) => {
    expect(spy).toHaveBeenCalled();
    expect(res).toEqual([])
  }



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewApplicationComponent, DialogMessageComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatRadioModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatAutocompleteModule,
        StoreModule.forRoot({}),
        MatDialogModule
      ],
      providers: [
        provideMockActions(() => actions),
        {
          provide: 'environment', useValue: environment
        },
        { provide: TransactionService, useClass: MockTransactionService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationComponent);
    component = fixture.componentInstance;

    component.customerProfileData$ = of(mockProfileData);
    component.customerTypeResponse$ = of(MockCustomerType);
    component.titleSalutations$ = of(MockSalutations);
    component.genderList$ = of(MockGenderList);
    component.nationalityList$ = of(MockCoutryLIst);
    component.citizenList$ = of(MockCitizens);
    component.raceList$ = of(MockRaceList);
    component.religionList$ = of(MockReligionList);
    component.martialStatusList$ = of(MockMaritalList);
    component.industryList$ = of(MockEmployementList);
    component.professionList$ = of(MockOccupations);
    component.statesList$ = of(MockStatesList);

    component.filteredGenders$ = of(MockGenderList);
    component.filteredNationalities$ = of(MockCoutryLIst);
    component.newCountries$ = of(MockCoutryLIst);
    component.filteredCitizen$ = of(MockCitizens);
    component.filteredRaces$ = of(MockRaceList);
    component.filteredMarital$ = of(MockMaritalList);
    component.filteredReligion$ = of(MockReligionList);
    component.addressTypeList$ = of(MockAddressTypeList)

    sessionStorage.setItem('rmId', '1');

    mockProfileData.addresses.forEach((a, i) => {
      const address_label = a.address1 + ', ' + a.address2 + ', ' + a.address3 + ', ' + a.address4 + ', ' + a.postcode + ', ' + a.state + ', ' + a.country
      component.addresses.push({ address: address_label, id: i })
    })

    component.addresses.push({ address: component.newAddressText, id: component.addresses.length + 1 });

    component.addresses.forEach((a, i) => {
      component.addressTypeForm.addControl('addressType' + String(i), new UntypedFormControl(''));
    })

    transactionService = TestBed.inject(TransactionService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open openCancelDialog', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    component.openCancelDialog(false);

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call onCancel if true', (done) => {
    const popupSpy = jest.spyOn(component, 'openCancelDialog').mockReturnValue(of('Yes, I confirm'));
    component.onCancel();
    component.openCancelDialog(true).subscribe(res => {
      expect(res).toBe('Yes, I confirm')
      expect(popupSpy).toHaveBeenCalled();
      done();
    });

  });

  it('should call onSubmit if false', (done) => {
    const popupSpy = jest.spyOn(component, 'openCancelDialog').mockReturnValue(of('Yes, Create Subscription'));
    component.onSubmit();
    component.openCancelDialog(false).subscribe(res => {
      expect(res).toBe('Yes, Create Subscription')
      expect(popupSpy).toHaveBeenCalled();
      done();
    });
  });
  it('should go call transformData', () => {
    const transFormText = "form data";
    const mockCustomerProfile = {
      ...MockCustomerProfile,
      idNo: 'form',
      idType: 'data'
    }
    component.customerProfileData$ = of(mockCustomerProfile)
    const spy = jest.spyOn(component, 'transformData').mockReturnValue(transFormText);

    const inputElement = fixture.debugElement.query(By.css('div.customerId input')).nativeElement as HTMLInputElement;
    expect(inputElement).not.toBe(null);

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call beforeUnload return event', async () => {
    const spy = jest.spyOn(component, 'beforeUnload');

    const inputElement = fixture.debugElement.query(By.css(raceListSelector)).nativeElement as HTMLInputElement;
    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matCRaceOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matCRaceOptions.length).toBe(2);

    const optionToClick = matCRaceOptions[0].nativeElement as HTMLElement;
    optionToClick.click();

    window.dispatchEvent(new Event('beforeunload'));

    expect(spy).toHaveBeenCalled();
    expect(component.newApplicationFormGroup.dirty).toBeTruthy();
  });

  it('should call dirtyCheckDialog', (done) => {
    const dialogSpy = jest.spyOn(component, 'openCancelDialog').mockReturnValue(of(component.yesConfirm));
    component.dirtyCheckDialog();

    component.openCancelDialog(true).subscribe(res => {
      expect(res).toBe(component.yesConfirm);
      expect(dialogSpy).toHaveBeenCalled();
      done()
    });
  });

  it('should to call onClickName for truthy', () => {
    component.onClickName();
    component.onCancel();

    expect(component.onClickName()).toBeUndefined();
  });

  it('should to patch race if customer profile is valid', () => {
    const mockRaceData = {
      ...MockCustomerProfile,
      race: 'B',
    } as CustomerProfile;

    component.customerProfileData$ = of(mockRaceData);
    const spy = jest.spyOn(component, 'setRace');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.otherPersonalDetailsForm.controls.race.value).toBe('B');
  });

  it('should to set value for addressText from select options radioAddressChange', async () => {
    component.customerProfileData$ = of(mockProfileData);
    const event: MatRadioChange = {
      value: component.newAddressText
    } as MatRadioChange;
    const spy = jest.spyOn(component, 'radioAddressChange');

    const inputElement = fixture.debugElement.query(By.css('div.matRadio .mat-radio-button'));
    expect(inputElement).not.toBe(null);

    inputElement.triggerEventHandler('change', event)

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.newApplicationFormGroup.get('addressText').valid).toBeTruthy();
  });


  it('should to set value for addressText for not new address on radioAddressChange', async () => {
    component.customerProfileData$ = of(MockCustomerProfile);
    const event: MatRadioChange = {
      value: '8, Jalan U8/10, Petaling Jaya, 47400 Selangor'
    } as MatRadioChange;
    const spy = jest.spyOn(component, 'radioAddressChange');

    const inputElement = fixture.debugElement.query(By.css('div.matRadio .mat-radio-button'));
    expect(inputElement).not.toBe(null);

    inputElement.triggerEventHandler('change', event)

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.newApplicationFormGroup.get('addressText').valid).toBeTruthy();
  });

  it('should to patch value from select options onSelectTypeChange for NTP', async () => {
    component.addressTypeList$ = of(MockAddressTypeList);
    component.newApplicationFormGroup.get('addressText').setValue(component.newAddressText);
    const event: MatSelectChange = {
      value: null
    } as MatSelectChange;

    const spy = jest.spyOn(component, 'onSelectTypeChange');

    const inputElement = fixture.debugElement.query(By.css('div.addresstype .mat-select'));
    const inputNativeElement = inputElement.nativeElement as HTMLSelectElement
    expect(inputElement).not.toBe(null);

    inputElement.triggerEventHandler('selectionChange', event);
    fixture.detectChanges();

    inputNativeElement.dispatchEvent(new Event('focusin'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should to patch nationality when onNationalityChange', async () => {
    component.filteredNationalities$ = of(MockCoutryLIst)
    const spy = jest.spyOn(component, 'onNationalityChange');

    const inputElement = fixture.debugElement.query(By.css(nationalitySelector)).nativeElement as HTMLInputElement;

    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = 'Aden';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matOptions.length).toBe(2);

    const optionToClick = matOptions[0].nativeElement as HTMLElement;
    optionToClick.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.nationality.value).toBe('Aden');
    expect(component.otherPersonalDetailsForm.controls['nationality'].value).toBe('AB');
  });

  it('should to patch gender when onGenderChange', async () => {
    component.filteredGenders$ = of(MockGenderList)
    const spy = jest.spyOn(component, 'onGenderChange');

    const inputElement = fixture.debugElement.query(By.css(genderSelector)).nativeElement as HTMLInputElement;

    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matGenderOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matGenderOptions.length).toBe(2);

    const optionToClick = matGenderOptions[0].nativeElement as HTMLElement;
    optionToClick.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.gender.value).toBe('Female');
    expect(component.otherPersonalDetailsForm.controls['gender'].value).toBe('F');

  });

  it('should to patch citizen when onCitizenChange', async () => {
    component.filteredCitizen$ = of(MockCitizens)
    const spy = jest.spyOn(component, 'onCitizenChange');

    const inputElement = fixture.debugElement.query(By.css(citizenSelector)).nativeElement as HTMLInputElement;

    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matCitizenOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matCitizenOptions.length).toBe(2);

    const optionToClick = matCitizenOptions[0].nativeElement as HTMLElement;
    optionToClick.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.citizen.value).toBe('Permanent Resident');
    expect(component.otherPersonalDetailsForm.controls['citizen'].value).toBe('1');
  });

  it('should to patch race when onRaceChange', async () => {
    component.filteredRaces$ = of(MockRaceList)
    const spy = jest.spyOn(component, 'onRaceChange');

    const inputElement = fixture.debugElement.query(By.css(raceListSelector)).nativeElement as HTMLInputElement;

    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matCRaceOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matCRaceOptions.length).toBe(2);

    const optionToClick = matCRaceOptions[0].nativeElement as HTMLElement;
    optionToClick.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.race.value).toBe('TestLN');
    expect(component.otherPersonalDetailsForm.controls['race'].value).toBe('B');
  });

  it('should to patch religion when onReligionChange', async () => {
    component.customerProfileData$ = of(MockCustomerProfile)
    component.filteredReligion$ = of(MockReligionList)
    const spy = jest.spyOn(component, 'onReligionChange');

    const inputElement = fixture.debugElement.query(By.css(religionSelector)).nativeElement as HTMLInputElement;

    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matReligionOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matReligionOptions.length).toBe(2);

    const optionToClick = matReligionOptions[0].nativeElement as HTMLElement;
    optionToClick.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.religion.value).toBe('Buddhist');
    expect(component.otherPersonalDetailsForm.controls['religion'].value).toBe('B');

  });

  it('should to patch marital when onMaritalChange', async () => {
    component.filteredMarital$ = of(MockMaritalList)
    const spy = jest.spyOn(component, 'onMaritalChange');

    const inputElement = fixture.debugElement.query(By.css(maritalSelector)).nativeElement as HTMLInputElement;

    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matMaritalOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matMaritalOptions.length).toBe(2);

    const optionToClick = matMaritalOptions[1].nativeElement as HTMLElement;
    optionToClick.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.marital.value).toBe('Single');
    expect(component.otherPersonalDetailsForm.controls['maritalStatus'].value).toBe('Single');
  });

  it('should to patch country when onCountryChange', async () => {
    component.newCountries$ = of(MockCoutryLIst)
    component.newApplicationFormGroup.get('addressText').setValue(component.newAddressText);

    const spy = jest.spyOn(component, 'onCountryChange');

    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('div.countrylist input.mat-input-element')).nativeElement as HTMLInputElement;
    expect(inputElement).not.toBe(null);

    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const matCountryOptions = fixture.debugElement.queryAll(By.css(matOptionText));
    expect(matCountryOptions.length).toBe(2);

    const optionToClick = matCountryOptions[1].nativeElement as HTMLElement;
    optionToClick.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.newCountry.value).toBe('Malaysia');
    expect(component.newAddressForm.controls['country'].value).toBe('Malaysia');
  });

  it('should to call routeToTransactionPage on valid form', async () => {

    component.customerProfileData$ = of(MockCustomerProfile);
    component.newApplicationFormGroup.setErrors(null);
    const spy = jest.spyOn(component, 'routeToTransactionPage');

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('div.newaccount button.primary2')).nativeElement as HTMLButtonElement;
    expect(buttonElement).not.toBe(null);
    buttonElement.click();

    actions = of(Actions.getUtAccountOpeningData({
      data: mockUtAccountOpeningRequest
    }));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.newApplicationFormGroup.dirty).toBeFalsy();
  })

  it('should to patch marital empty when clearSearch', () => {
    component.filteredMarital$ = of([MockMaritalList[0]] as MaritalList[]);
    const spy = jest.spyOn(component, 'clearSearch');

    const inputMaritalElement = fixture.debugElement.query(By.css(maritalSelector)).nativeElement as HTMLInputElement;
    expect(inputMaritalElement).not.toBe(null);

    inputMaritalElement.dispatchEvent(new Event('focusin'));
    inputMaritalElement.value = 'abcd';
    inputMaritalElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.marital.value).toBe('');
  });

  it('should to patch gender empty when clearSearch', () => {

    component.filteredGenders$ = of([MockGenderList[0]] as GenderList[]);

    const spy = jest.spyOn(component, 'clearSearch');

    const inputElementGender = fixture.debugElement.query(By.css(genderSelector)).nativeElement as HTMLInputElement;
    expect(inputElementGender).not.toBe(null);

    inputElementGender.dispatchEvent(new Event('focusin'));

    inputElementGender.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.gender.value).toBe('');
  });

  it('should to patch nationality empty when clearSearch', () => {
    component.filteredNationalities$ = of([MockCoutryLIst[0]] as CountryList[]);
    const spy = jest.spyOn(component, 'clearSearch');

    const inputNationalityElement = fixture.debugElement.query(By.css(nationalitySelector)).nativeElement as HTMLInputElement;
    expect(inputNationalityElement).not.toBe(null);

    inputNationalityElement.dispatchEvent(new Event('focusin'));
    inputNationalityElement.value = 'abcd';
    inputNationalityElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.nationality.value).toBe('');
  });

  it('should to patch citizen empty when clearSearch', () => {

    component.filteredCitizen$ = of([MockCitizens[0]] as CitizenList[]);
    const spy = jest.spyOn(component, 'clearSearch');

    const inputCitizenElement = fixture.debugElement.query(By.css(citizenSelector)).nativeElement as HTMLInputElement;
    expect(inputCitizenElement).not.toBe(null);

    inputCitizenElement.dispatchEvent(new Event('focusin'));
    inputCitizenElement.value = 'abcd';
    inputCitizenElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.citizen.value).toBe('');
  });

  it('should to patch race empty when clearSearch', () => {
    component.filteredRaces$ = of(MockRaceList);
    const spy = jest.spyOn(component, 'clearSearch');

    const inputRaceElement = fixture.debugElement.query(By.css(raceListSelector)).nativeElement as HTMLInputElement;
    expect(inputRaceElement).not.toBe(null);

    inputRaceElement.dispatchEvent(new Event('focusin'));
    inputRaceElement.value = 'abcd';
    inputRaceElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.race.value).toBe('');
  });

  it('should to patch religion empty when clearSearch', () => {
    const mockCustomerData = {
      ...MockCustomerProfile,
      religion: 'test_religion_doesnt_exist'
    } as CustomerProfile;

    component.customerProfileData$ = of(mockCustomerData)
    component.filteredReligion$ = of([MockReligionList[0]] as ReligionList[]);

    const spy = jest.spyOn(component, 'clearSearch');

    const inputReligionElement = fixture.debugElement.query(By.css(religionSelector)).nativeElement as HTMLInputElement;
    expect(inputReligionElement).not.toBe(null);

    inputReligionElement.dispatchEvent(new Event('focusin'));
    inputReligionElement.value = 'abcd';
    inputReligionElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.religion.value).toBe('');
  });

  it('should to patch country empty when clearSearch', () => {
    component.newCountries$ = of(MockCoutryLIst)
    component.newApplicationFormGroup.get('addressText').setValue('New Address');

    const spy = jest.spyOn(component, 'clearSearch');
    fixture.detectChanges();

    const inputElementCountry = fixture.debugElement.query(By.css('div.countrylist input.mat-input-element')).nativeElement as HTMLInputElement;

    expect(inputElementCountry).not.toBe(null);

    inputElementCountry.dispatchEvent(new Event('focusin'));
    inputElementCountry.value = 'abcd';
    inputElementCountry.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.newCountry.value).toBe('');
  });

  it('should to patch country empty when clearSearch', () => {

    const spy = jest.spyOn(component, 'clearSearch');
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css(raceListSelector));
    expect(inputElement).not.toBe(null);

    inputElement.triggerEventHandler('blur', { target: { data: [], controlName: 'xyz' } })

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should to set industry on setIndustry', () => {
    const mock_customer_profile = {
      ...MockCustomerProfile,
      category: 'NTP',
      industry: 'SW'
    } as CustomerProfile

    component.customerProfileData$ = of(mock_customer_profile);
    const spy = jest.spyOn(component, 'setIndustry');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.employementDetailsForm.get('industry').value).toBe('SW');
  });

  it('should to set profession from list available on setProfession', () => {
    const mock_customer_profile = {
      ...MockCustomerProfile,
      category: 'NTP',
      occupation: 'E'
    } as CustomerProfile
    component.customerProfileData$ = of(mock_customer_profile);
    const spy = jest.spyOn(component, 'setProfession');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.employementDetailsForm.get('profession').value).toBe('E');
  });

  it('should to set citizen from list available on setCitizen', () => {
    // const mock_citizen_list = [{
    //   ...MockCitizens[0],

    // }]
    const spy = jest.spyOn(component, 'setCitizen');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.otherPersonalDetailsForm.get('citizen').value).toBe('IND');
  });

  it('should to set religion from list available on setReligion', () => {
    const spy = jest.spyOn(component, 'setReligion');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.otherPersonalDetailsForm.get('religion').value).toBe('H');
  });

  it('should to set marital status from list available on setMaritalstatuses', () => {
    const spy = jest.spyOn(component, 'setMaritalstatuses');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.otherPersonalDetailsForm.get('maritalStatus').value).toBe('Single');
  });

  it('should to set nationality from list available on setNationalities', () => {
    const mock_countrylist = [{
      ...MockCoutryLIst[0],
      countryCode: 'MY',
      countryShortName: "MY",
      countryLongName: "MY",
    }];

    component.nationalityList$ = of(mock_countrylist);
    const spy = jest.spyOn(component, 'setNationalities');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.otherPersonalDetailsForm.get('nationality').value).toBe('MY');
  });

  it('should to call setEtpAddress for etp customer', () => {
    component.customerProfileData$ = of(MockCustomerProfile);

    const spy = jest.spyOn(component, 'setEtpAddress');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.mailingAddressForm.get('address1').value).toBe('test_line1');
  });

  it('should be able to get filtered race on filterRace', (done) => {
    component.raceList$ = of(MockRaceList);
    const spy = jest.spyOn(component, 'filterRace');

    component.race.setValue('')
    fixture.detectChanges();

    component.filterRace('TestLN').subscribe((res: RaceList[]) => {
      checkResultNotNull(spy, res)
      done();
    })
  });

  it('should be able to get filtered gender on filterGender', (done) => {
    const spy = jest.spyOn(component, 'filterGender');

    component.gender.setValue('F')
    fixture.detectChanges();

    component.filterGender('F').subscribe((res: GenderList[]) => {
      checkResultNotNull(spy, res)
      done();
    })

  })

  it('should be able to get filtered nationality on filterNationality', (done) => {
    const spy = jest.spyOn(component, 'filterNationality');

    component.nationality.setValue('Malaysia')
    fixture.detectChanges();

    component.filterNationality('Malaysia').subscribe((res: CountryList[]) => {
      checkResultNotNull(spy, res)
      done();
    })
  });

  it('should be able to get filtered religion on filterReligion', (done) => {
    const spy = jest.spyOn(component, 'filterReligion');

    component.religion.setValue('Buddhist')
    fixture.detectChanges();

    component.filterReligion('Buddhist').subscribe((res: ReligionList[]) => {
      checkResultNotNull(spy, res)
      done();
    })
  });

  it('should be able to get filtered marital status on filterMarital', (done) => {
    const spy = jest.spyOn(component, 'filterMarital');

    component.marital.setValue('Single')
    fixture.detectChanges();

    component.filterMarital('Single').subscribe((res: MaritalList[]) => {
      checkResultNotNull(spy, res)
      done();
    })
  });

  it('should be able to get filtered citizen status on filterCitizen', (done) => {
    const spy = jest.spyOn(component, 'filterCitizen');

    component.citizen.setValue('Permanent')
    fixture.detectChanges();

    component.filterCitizen('Permanent Resident').subscribe((res: CitizenList[]) => {
      checkResultNotNull(spy, res)
      done();
    })
  });

  it('should be able to get empty filtered race on filterRace', (done) => {
    const spy = jest.spyOn(component, 'filterRace')

    component.race.setValue('')
    fixture.detectChanges();

    component.filterRace('').subscribe((res: RaceList[]) => {
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(MockRaceList)
      done();
    })
  });

  it('should be able to get empty filtered gender on filterGender', (done) => {
    const spy = jest.spyOn(component, 'filterGender')

    component.gender.setValue('F')
    fixture.detectChanges();

    component.filterGender('').subscribe((res: GenderList[]) => {
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(MockGenderList)
      done();
    })

  })

  it('should be able to get empty filtered nationality on filterNationality', (done) => {
    const spy = jest.spyOn(component, 'filterNationality')

    component.nationality.setValue('Malaysia')
    fixture.detectChanges();

    component.filterNationality('').subscribe((res: CountryList[]) => {
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(MockCoutryLIst)
      done();
    })
  });

  it('should be able to get empty filtered religion on filterReligion', (done) => {
    const spy = jest.spyOn(component, 'filterReligion')

    component.religion.setValue('Buddhist')
    fixture.detectChanges();

    component.filterReligion('').subscribe((res: ReligionList[]) => {
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(MockReligionList)
      done();
    })
  });

  it('should be able to get empty filtered marital status on filterMarital', (done) => {
    const spy = jest.spyOn(component, 'filterMarital');

    component.marital.setValue('Single')
    fixture.detectChanges();

    component.filterMarital('').subscribe((res: MaritalList[]) => {
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(MockMaritalList)
      done();
    })
  });

  it('should be able to get empty filtered citizen status on filterCitizen', (done) => {
    const spy = jest.spyOn(component, 'filterCitizen')

    component.citizen.setValue('Permanent')
    fixture.detectChanges();

    component.filterCitizen('').subscribe((res: CitizenList[]) => {
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(MockCitizens)
      done();
    })
  });

  it('should be able to return [] on filterMarital', (done) => {
    component.martialStatusList$ =  of([] as MaritalList[]);
    const spy = jest.spyOn(component, 'filterMarital');

    component.marital.setValue('Permanent')
    fixture.detectChanges();

    component.filterMarital(null).subscribe((res: MaritalList[]) => {
      checkResultEmptyArray(spy, res);
      done();
    })
  });

  it('should be able to return [] on filterCitizen', (done) => {
    component.citizenList$ = of([] as CitizenList[]);
    const spy = jest.spyOn(component, 'filterCitizen');

    component.citizen.setValue('Permanent')
    fixture.detectChanges();

    component.filterCitizen(null).subscribe((res: CitizenList[]) => {
      checkResultEmptyArray(spy, res);
      done();
    })
  });

  it('should be able to return [] on filterRace', (done) => {
    component.raceList$ =  of([] as RaceList[]);
    const spy = jest.spyOn(component, 'filterRace');

    component.race.setValue('Permanent')
    fixture.detectChanges();

    component.filterRace(null).subscribe((res: RaceList[]) => {
      checkResultEmptyArray(spy, res);
      done();
    })
  });


  it('should be able to return [] on filterGender', (done) => {
    component.genderList$ = of([] as GenderList[]);

    const spy = jest.spyOn(component, 'filterGender');

    component.gender.setValue('Permanent')
    fixture.detectChanges();

    component.filterGender(null).subscribe((res: GenderList[]) => {
      checkResultEmptyArray(spy, res);
      done();
    })
  });

  it('should be able to return [] on filterReligion', (done) => {
    component.religionList$ =  of([] as ReligionList[]);
    const spy = jest.spyOn(component, 'filterReligion');

    component.religion.setValue('Permanent')
    fixture.detectChanges();

    component.filterReligion(null).subscribe((res: ReligionList[]) => {
      checkResultEmptyArray(spy, res);
      done();
    })
  });

  it('should be able to return [] on filterNationality', (done) => {
    component.nationalityList$ = of([] as CountryList[]);

    const spy = jest.spyOn(component, 'filterNationality');

    component.nationality.setValue('Permanent')
    fixture.detectChanges();

    component.filterNationality(null).subscribe((res: CountryList[]) => {
      checkResultEmptyArray(spy, res);
      done();
    })
  });
  it('should to set newAddressForm validations based on mailingAddressForm valueChanges', () => {
    component.newApplicationFormGroup.get('addressText').setValue(component.newAddressText);
    fixture.detectChanges();

    const controlCountry = component.newAddressForm.get('country');
    const controlCode = component.newAddressForm.get('postcode');
    const controlState = component.newAddressForm.get('state');
    const controlAddress1 = component.newAddressForm.get('address1');

    controlState.setValue(null);
    fixture.detectChanges();

    controlCode.setValue('12345678900000');
    fixture.detectChanges();

    controlCountry.setValue(null);
    fixture.detectChanges();

    controlAddress1.setValue(null);
    fixture.detectChanges();

    component.ngOnInit();

    expect(controlState.invalid).toBeTruthy();
    expect(controlCode.invalid).toBeTruthy();
    expect(controlCountry.invalid).toBeTruthy();
    expect(controlAddress1.invalid).toBeTruthy();
  });

  it('should to patch newAddressForm customerType based on customerType match', () => {
    const mockCustomerProfile = {...MockCustomerProfile,clientGroup: 'N'};
    component.customerProfileData$ = of(mockCustomerProfile)
    component.customerTypeResponse$ = of([MockCustomerType[1]]);

    component.ngOnInit();

    expect(component.newApplicationFormGroup.controls.customerType.value).toBe('N');
  })

});
