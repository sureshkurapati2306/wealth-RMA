/* eslint-disable @typescript-eslint/unbound-method */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of, Subject } from 'rxjs';
import * as Actions from '../../+state/new-application.actions';
import { MatDialog } from '@angular/material/dialog';
import * as newInvestmentAppSelector from '../../+state/new-application.selectors';
import { filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CitizenList, CountryList, GenderList, ICustomerType, IUtAccountOpening, MaritalList, RaceList, ReligionList, IAddress, IndustryList, OccupationList, TitleSalutations, StateList, AddressTypeList } from '../../model/new-investment.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NewApplicationResolver, TransactionType, DialogMessageComponent, MintOfficeSelectors, CustomerProfile, customerAddress } from '@cimb/mint-office';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { Breadcrumb, ICustomerDetails } from '../../../shared/models/breadcrumb.model';
import { CanDeactivateComponent } from '../../../shared/gaurds/can-deactivate.gaurd';
import { MatSelectChange } from '@angular/material/select';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'cimb-office-new-application',
    templateUrl: './new-application.component.html',
    styleUrls: ['./new-application.component.scss'],
})
export class NewApplicationComponent implements OnInit, OnDestroy, CanDeactivateComponent {
    breadcrumbs: Breadcrumb[] = [
        {
            title: 'Application',
            route: '',
        }
    ]

    customerDetails: ICustomerDetails = {
        route: '/new-application',
        isEnable: true
    }

    customer: CustomerProfile;
    newAddressText = 'New Address';
    yesConfirm = 'Yes, I confirm';
    goBack = 'Go Back';
    validPhoneNumberPattern = '/^(\\+\\d{1,3}[- ]?)?\\d{10}$/';
    validMobilePattern = '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{3}[)]?))\\s*[)]?[-\\s\\.]?[(]?[0-9]{1,3}[)]?([-\\s\\.]?[0-9]{3})([-\\s\\.]?[0-9]{3,6})';
    selectedPreviousAddress: string;
    selectedCurrentAddress: string;

    gender: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    nationality: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    citizen: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    race: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    religion: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    marital: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    newCountry: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
    addresses: IAddress[] = [];

    customerProfileData$ = this.store.select(MintOfficeSelectors.customerProfile);
    customerTypeResponse$ = this.store.select(newInvestmentAppSelector.customerTypeResponse);
    titleSalutations$ = this.store.select(newInvestmentAppSelector.titleSalutationsResponse);
    genderList$ = this.store.select(newInvestmentAppSelector.genderListResponse);
    nationalityList$ = this.store.select(newInvestmentAppSelector.nationalityListResponse);
    citizenList$ = this.store.select(newInvestmentAppSelector.citizenListResponse);
    raceList$ = this.store.select(newInvestmentAppSelector.raceListResponse).pipe(filter(x => !!x));
    religionList$ = this.store.select(newInvestmentAppSelector.religionListResponse);
    martialStatusList$ = this.store.select(newInvestmentAppSelector.martialStatusListResponse);
    industryList$ = this.store.select(newInvestmentAppSelector.industryListResponse);
    professionList$ = this.store.select(newInvestmentAppSelector.professionListResponse);
    addressTypeList$: Observable<AddressTypeList[]> = this.store.select(newInvestmentAppSelector.addressTypeListResponse);
    statesList$: Observable<StateList[]> = this.store.select(newInvestmentAppSelector.statesListResponse);

    filteredGenders$: Observable<GenderList[]> = this.gender.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterGender(value))
    );

    filteredNationalities$: Observable<CountryList[]> = this.nationality.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterNationality(value))
    );

    newCountries$: Observable<CountryList[]> = this.newCountry.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterNationality(value))
    );

    filteredRaces$: Observable<RaceList[]> = this.race.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterRace(value))
    );

    filteredCitizen$: Observable<CitizenList[]> = this.citizen.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterCitizen(value))
    );

    filteredMarital$: Observable<MaritalList[]> = this.marital.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterMarital(value))
    );

    filteredReligion$: Observable<ReligionList[]> = this.religion.valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterReligion(value))
    );

    public newApplicationFormGroup: UntypedFormGroup = new UntypedFormGroup({
        customerType: new UntypedFormControl('', Validators.required),
        personalDetails: new UntypedFormGroup({
            title: new UntypedFormControl('', Validators.required),
        }),
        contactInformation: new UntypedFormGroup({
            mobileNumber: new UntypedFormControl('',Validators.required),
            emailId: new UntypedFormControl('', [Validators.required, Validators.maxLength(60), Validators.email]),
            housePhone: new UntypedFormControl('', {
                validators: [Validators.pattern(this.validMobilePattern)]
            }),
            officePhone: new UntypedFormControl('', [Validators.pattern(this.validMobilePattern)]),
        }),
        otherPersonalDetails: new UntypedFormGroup({
            genderText: this.gender,
            gender: new UntypedFormControl(''),
            nationalityText: this.nationality,
            nationality: new UntypedFormControl(''),
            citizenText: this.citizen,
            citizen: new UntypedFormControl(''),
            raceText: this.race,
            race: new UntypedFormControl(''),
            religionText: this.religion,
            religion: new UntypedFormControl(''),
            maritalText: this.marital,
            maritalStatus: new UntypedFormControl(''),
        }),
        addressText: new UntypedFormControl(''),
        mailingAddress: new UntypedFormGroup({
            address1: new UntypedFormControl(''),
            address2: new UntypedFormControl(''),
            address3: new UntypedFormControl(''),
            address4: new UntypedFormControl(''),
            postcode: new UntypedFormControl(''),
            state: new UntypedFormControl(''),
            country: new UntypedFormControl(''),
        }),
        addressTypeForm: new UntypedFormGroup({
            addressType: new UntypedFormControl(''),
        }),
        newAddress: new UntypedFormGroup({
            country: new UntypedFormControl(''),
            newCountryText: this.newCountry,
            address1: new UntypedFormControl(''),
            address2: new UntypedFormControl('', Validators.maxLength(40)),
            address3: new UntypedFormControl('', Validators.maxLength(40)),
            address4: new UntypedFormControl('', Validators.maxLength(40)),
            postcode: new UntypedFormControl(''),
            state: new UntypedFormControl(''),
        }),
        employmentDetails: new UntypedFormGroup({
            industry: new UntypedFormControl('', Validators.required),
            profession: new UntypedFormControl('', Validators.required),
        }),
    });

    cifNumber: string;

    private _unSubscribeAll$: Subject<void> = new Subject();

    filteredHousePhone$: Observable<string[]> = this.newApplicationFormGroup.controls['contactInformation'].get('housePhone').valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterHousePhone(value || ''))
    )

    filteredEmailIds$: Observable<string[]> = this.newApplicationFormGroup.controls['contactInformation'].get('emailId').valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterEmailIds(value || ''))
    )

    filteredOfficePhone$: Observable<string[]> = this.newApplicationFormGroup.controls['contactInformation'].get('officePhone').valueChanges.pipe(
        startWith(''),
        switchMap((value: string) => this.filterOfficePhone(value || ''))
    )
    get contactForm(): UntypedFormGroup {
        return this.newApplicationFormGroup.controls['contactInformation'] as UntypedFormGroup;
    }

    get newAddressForm(): UntypedFormGroup {
        return this.newApplicationFormGroup.controls['newAddress'] as UntypedFormGroup;
    }

    get mailingAddressForm(): UntypedFormGroup {
        return this.newApplicationFormGroup.controls['mailingAddress'] as UntypedFormGroup;
    }

    get addressTypeForm(): UntypedFormGroup {
        return this.newApplicationFormGroup.controls['addressTypeForm'] as UntypedFormGroup;
    }

    get otherPersonalDetailsForm(): UntypedFormGroup {
        return this.newApplicationFormGroup.controls['otherPersonalDetails'] as UntypedFormGroup;
    }

    get employementDetailsForm(): UntypedFormGroup {
        return this.newApplicationFormGroup.controls['employmentDetails'] as UntypedFormGroup;
    }
    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private store: Store,
        public dialog: MatDialog,
        private transactionService: TransactionService,
        private customerResolver: NewApplicationResolver,
    ) {
        this.activateRoute.data.subscribe(res => this.cifNumber = res.cifNumber as string);
    }

    ngOnInit(): void {

        this.customerProfileData$.pipe(
            takeUntil(this._unSubscribeAll$),
            filter(x => !!x),
            map(customerProfile => {
                this.customer = customerProfile;

                this.patchNewApplicationFormGroupValues();
                
                if (customerProfile.addresses && customerProfile.addresses.length) {
                    const customer_address = customerProfile.addresses;
                    let address_label: string;
                    customer_address.forEach((a, i) => {
                        address_label = a.address1 + ', ' + a.address2 + ', ' + a.address3 + ', ' + a.address4 + ', ' + a.postcode + ', ' + a.state + ', ' + a.country
                        this.addresses.push({ address: address_label, id: i })
                    })

                    if (customerProfile.category === 'ETP') {
                        this.addressTypeFormValidation();
                        this.setEtpAddress(this.customer);
                        this.setEtpCustomFilteredData(customerProfile);
                        
                    }

                    if (customerProfile.category === 'NTP') {
                        this.addresses.push({ address: this.newAddressText, id: this.addresses.length + 1 })
                        this.addressTypeFormValidation();

                        this.store.dispatch(Actions.getAllDropDownData({ data: null }));
                        this.setNtpNewAddress();
                    }

                }
            })
        ).subscribe()

        this.newApplicationFormGroup.get('addressText').valueChanges.pipe(
            takeUntil(this._unSubscribeAll$),
            filter(x => !!x),
            tap(() => {
                this.addressTypeForm.reset();
                this.newAddressForm.reset();

                if (this.selectedCurrentAddress) {
                    this.selectedPreviousAddress = this.selectedCurrentAddress;
                    this.addressTypeForm.get(this.selectedCurrentAddress)?.setValidators([Validators.required]);
                }

                if (this.newApplicationFormGroup.get('addressText').value === this.newAddressText) {
                    this.newAddressForm.get('country').setValidators([Validators.required]);
                    this.newAddressForm.get('newCountryText').setValidators([Validators.required]);
                    this.newAddressForm.get('address1').setValidators([Validators.required, Validators.maxLength(40)]);
                    this.newAddressForm.get('postcode').setValidators([Validators.required, Validators.maxLength(10)]);
                    this.newAddressForm.get('state').setValidators([Validators.required]);
                }

                if (this.newApplicationFormGroup.get('addressText').value !== this.newAddressText) {
                    const form_controls = ['country', 'newCountryText', 'address1', 'postcode', 'state'];

                    form_controls.forEach(control => {
                        this.newAddressForm.get(control).setErrors(null);
                    })
                }

                this.newApplicationFormGroup.updateValueAndValidity();
            })
        ).subscribe();

    }

    filterHousePhone(value: string): Observable<string[]> {
        const filterValue = value.toLowerCase();

        return of(this.customer.housePhone.filter((option: string) => option.toLowerCase().includes(filterValue)));
    }

    filterEmailIds(value: string): Observable<string[]> {
        const filterValue = value.toLowerCase();

        const result = this.customer.emailId.filter((option: string) => option.toLowerCase().includes(filterValue));
        return of(result)
    }

    filterOfficePhone(value: string): Observable<string[]> {
        const filterValue = value.toLowerCase();

        const result = this.customer.offPhone.filter((option: string) => option.toLowerCase().includes(filterValue));
        return of(result)
    }

    onSelectTypeChange(event: MatSelectChange): void {
        this.selectedPreviousAddress = this.selectedCurrentAddress;
        this.addressTypeForm.get('addressType').setValue(event.value);
        this.addressTypeForm.get(this.selectedCurrentAddress)?.setValue(event.value);

        Object.keys(this.addressTypeForm.controls).forEach(key => {
            if (key !== this.selectedCurrentAddress) {
                this.addressTypeForm.get(key).setErrors(null);
            }
        });

        this.newApplicationFormGroup.updateValueAndValidity();
    }

    radioAddressChange(event: MatRadioChange): void {
        this.addresses.forEach(res => {
            if (res.address === event.value) {
                this.selectedCurrentAddress = 'addressType' + String(res.id);
            }
        })

        this.newApplicationFormGroup.get('addressText').patchValue(event.value)

        if (this.customer.category === 'NTP' && event.value !== this.newAddressText) {

            const result = this.transformAddress(event.value as string);

            this.setMailingAddressForm(result);
        }
    }

    transformAddress(value: string): customerAddress {
        const address: string[] = value.split(', ');

        return Object.keys(this.mailingAddressForm.controls).reduce((obj, key, index) => {
            obj[key] = address[index];
            return obj;
        }, {}) as customerAddress;
    }

    addressTypeFormValidation(): void {
        this.addresses.forEach((a, i) => {
            this.addressTypeForm.addControl('addressType' + String(i), new UntypedFormControl('', [Validators.required]));
        });
    }

    onSubmit(): void {
        this.openCancelDialog(false).pipe(
            takeUntil(this._unSubscribeAll$),
            filter(x => !!x),
            map(res => {
                if (res === 'Yes, Create Subscription') {
                    this.newApplicationFormGroup.reset();
                    this.routeToTransactionPage().then(() => {return true}).catch(() => {return false});
                }
            })
        ).subscribe();
    }

    routeToTransactionPage(): Promise<boolean> {
        this.store.dispatch(Actions.getUtAccountOpeningData({
            data: {
                rmId: sessionStorage.getItem('rmId').toString(),
                requestUid: new Date().toISOString() + (Math.random() * 100).toFixed(0).toString(),
                clientGroup: this.newApplicationFormGroup.get('customerType').value as string,
                salutation: (this.newApplicationFormGroup.get('personalDetails') as UntypedFormGroup).get('title').value as string,
                customerId: this.cifNumber,
                gender: this.otherPersonalDetailsForm.get('gender').value as string,
                nationality: this.otherPersonalDetailsForm.get('nationality').value as string,
                race: this.otherPersonalDetailsForm.get('race').value as string,
                citizen: this.otherPersonalDetailsForm.get('citizen').value as string,
                religion: this.otherPersonalDetailsForm.get('religion').value as string,
                maritalStatus: this.otherPersonalDetailsForm.get('maritalStatus').value as string,
                industry: (this.newApplicationFormGroup.get('employmentDetails') as UntypedFormGroup).get('industry').value as string,
                profession: (this.newApplicationFormGroup.get('employmentDetails') as UntypedFormGroup).get('profession').value as string,
                mailingAddress: this.newApplicationFormGroup.get('addressText').value as string,
                email: this.contactForm.get('emailId').value as string,
                mobilePhone: this.contactForm.get('mobileNumber').value as string,
                housePhone: this.contactForm.get('housePhone').value as string,
                workPhone: this.contactForm.get('officePhone').value as string,
                address_line: this.addressTypeForm.get('addressType').value as string,
                address1: this.mailingAddressForm.get('address1').value as string,
                address2: this.mailingAddressForm.get('address2').value as string,
                address3: this.mailingAddressForm.get('address3').value as string,
                address4: this.mailingAddressForm.get('address4').value as string,
                state: this.mailingAddressForm.get('state').value as string,
                country: this.mailingAddressForm.get('country').value as string,
                postcode: this.mailingAddressForm.get('postcode').value as string

            } as IUtAccountOpening
        }));

        this.transactionService.cifNumber = this.cifNumber;
        this.transactionService.transactionType = TransactionType.NEW_ACCOUNT as TransactionType;

        return this.router.navigateByUrl('/transaction');
    }

    onCancel(): void {
        this.openCancelDialog(true).pipe(
            filter(x => !!x),
            tap(res => {
                if (res === this.yesConfirm) {
                    this.newApplicationFormGroup.reset();
                    this.customerResolver.cifNumber = this.cifNumber
                    void this.router.navigateByUrl('/customer');
                }
            })
        ).subscribe();
    }

    onClickName(): void {
        return this.newApplicationFormGroup.dirty ? this.onCancel() : void this.router.navigateByUrl('/customer');
    }

    openCancelDialog(command: boolean): Observable<any> {
        return this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog'],
            maxWidth: command ? '560px' : '570px',
            minHeight: command ? '240px' : '180px',
            autoFocus: false,
            data: {
                title:
                    command
                        ? 'Confirm to cancel New Investment Account'
                        : 'Create Subscription Application',
                description:
                    command
                        ? '<div class="content-main-div"><div class="content-divs">Do you want to cancel this application and return to the Customer Profile Page?</div><br/><div class="content-divs">Filled values will be removed if you proceed.<br/></div></div>'
                        : '<div class="content-main-div"><div class="content-divs">Would you like to create a subscription application for this new account?</div></div>',
                btnOkLabel: command ? this.yesConfirm : 'Yes, Create Subscription',
                btnCancelLable: command ? this.goBack : 'Cancel',
            },
        }).afterClosed();
    }

    dirtyCheckDialog(): Observable<boolean> {
        this.onClickName();
        return of(false)
    }

    patchNewApplicationFormGroupValues(): void {
        combineLatest([
            this.customerProfileData$,
            this.customerTypeResponse$,
            this.genderList$,
            this.nationalityList$,
            this.industryList$,
            this.professionList$,
            this.raceList$,
            this.citizenList$,
            this.religionList$,
            this.martialStatusList$,
            this.titleSalutations$
        ]).pipe(
            filter(customerResponse => !!customerResponse),
            tap(([
                customer,
                customerResponse,
                genders,
                nationalities,
                industryList,
                professionList,
                races,
                citizens,
                religions,
                maritalstatuses,
                titleSalutations
            ]) => {

                if (!customer) return;

                const customerProfile = customer as CustomerProfile;
                let customerType: ICustomerType = {} as ICustomerType;

                if (customerResponse) {
                    const cType = (customerResponse as ICustomerType[]).find(c => c.customerTypeCode === customerProfile.clientGroup);
                    customerType = cType ? cType : customerType;
                }

                if (!!customerType && customerType.customerTypeCode) {
                    this.newApplicationFormGroup.patchValue({ customerType: customerType.customerTypeCode });
                }

                this.newApplicationFormGroup.patchValue({
                    contactInformation: {
                        emailId: customerProfile.email,
                        mobileNumber: customerProfile.mobileNumber,
                        housePhone: customerProfile.housePhone[0],
                        officePhone: customerProfile.offPhone[0],
                    },
                });

                this.setGenders(genders ? genders as GenderList[] : [], customerProfile);

                this.setNationalities(nationalities ? nationalities as CountryList[] : [], customerProfile);

                this.setProfession(professionList ? professionList as OccupationList[] : [], customerProfile);

                this.setIndustry(industryList ? industryList as IndustryList[] : [], customerProfile);

                this.setRace(races ? races as RaceList[] : [], customerProfile);

                this.setCitizen(citizens ? citizens as CitizenList[] : [], customerProfile);

                this.setReligion(religions ? religions as ReligionList[] : [], customerProfile);

                this.setMaritalstatuses(maritalstatuses ? maritalstatuses as MaritalList[] : [], customerProfile);

                this.setSalutation(titleSalutations ? titleSalutations as TitleSalutations[] : [], customerProfile)
            })
        ).subscribe()
    }

    setSalutation(salutations: TitleSalutations[], customerProfile: CustomerProfile): void {
        let title: TitleSalutations = {} as TitleSalutations;
        if (salutations && customerProfile.salutation) {
            const t = salutations.find(g => g.salutationShortName.toLowerCase() === customerProfile.salutation.toLowerCase());
            title = t ? t : title;
        }

        if (!!title && title.salutationCode) {
            this.newApplicationFormGroup.get('personalDetails').patchValue({ title: title.salutationCode });
        }
    }

    setGenders(genders: GenderList[], customerProfile: CustomerProfile): void {
        let gender: GenderList = {} as GenderList;
        if (genders && customerProfile.gender) {
            const g = genders.find(g => g.genderCode.toLowerCase() === customerProfile.gender.toLowerCase());
            gender = g ? g : gender;
        }

        if (!!gender && gender.genderCode) {
            this.newApplicationFormGroup.patchValue({ otherPersonalDetails: { genderText: gender.genderLongName, gender: gender.genderCode } });
        }
    }

    setNationalities(nationalities: CountryList[], customerProfile: CustomerProfile): void {
        let nationality: CountryList = {} as CountryList;
        if (nationalities && customerProfile.nationality) {
            const n = nationalities.find(n => n.countryCode.toLowerCase() === customerProfile.nationality.toLowerCase());
            nationality = n ? n : nationality;
        }

        if (!!nationality && nationality.countryCode) {
            this.newApplicationFormGroup.patchValue({ otherPersonalDetails: { nationalityText: nationality.countryLongName, nationality: nationality.countryCode } });
        }
    }

    setMaritalstatuses(maritalstatuses: MaritalList[], customerProfile: CustomerProfile): void {
        let maritalStatus: MaritalList = {} as MaritalList;
        if (maritalstatuses && customerProfile.maritalStatus) {
            const r = maritalstatuses.find(n => n.maritalLongName.toLowerCase() === customerProfile.maritalStatus.toLowerCase());
            maritalStatus = r ? r : maritalStatus;
        }

        if (!!maritalStatus && maritalStatus.maritalCode) {
            this.newApplicationFormGroup.patchValue({ otherPersonalDetails: { maritalText: maritalStatus.maritalLongName, maritalStatus: maritalStatus.maritalCode } })
        }
    }

    setReligion(religions: ReligionList[], customerProfile: CustomerProfile): void {
        let religion: ReligionList = {} as ReligionList;
        if (religions && customerProfile.religion) {
            const r = religions.find(n => n.religionCode.toLowerCase() === customerProfile.religion.toLowerCase());
            religion = r ? r : religion;
        }

        if (!!religion && religion.religionCode) {
            this.newApplicationFormGroup.patchValue({ otherPersonalDetails: { religionText: religion.religionLongName, religion: religion.religionCode } });
        }
    }

    setCitizen(races: CitizenList[], customerProfile: CustomerProfile): void {
        let citizen: CitizenList = {} as CitizenList;
        if (races) {
            const r = races.find(n => n.citizenCode.toLowerCase() === customerProfile.cntyCitizenship.toLowerCase());
            citizen = r ? r : citizen;
        }

        if (!!citizen && citizen.citizenCode) {
            this.newApplicationFormGroup.patchValue({ otherPersonalDetails: { citizenText: citizen.citizenLongName, citizen: citizen.citizenCode } });
        }
    }

    setIndustry(industries: IndustryList[], customerProfile: CustomerProfile): void {
        let industry: IndustryList = {} as IndustryList;
        if (industries && customerProfile.industry) {
            const i = industries.find(n => n.employmentShortName.toLowerCase() === customerProfile.industry.toLowerCase());
            industry = i ? i : industry;
        }

        if (!!industry && industry.employmentCode) {
            this.newApplicationFormGroup.controls['employmentDetails'].patchValue({
                industry: industry.employmentCode
            }, { emitEvent: false })
        }
    }

    setProfession(professions: OccupationList[], customerProfile: CustomerProfile): void {
        let profession: OccupationList = {} as OccupationList;
        if (professions && customerProfile.occupation) {
            const p = professions.find(p => p.occupationShortName.toLowerCase() === customerProfile.occupation.toLowerCase());
            profession = p ? p : profession;
        }

        if (!!profession && profession.occupationShortName) {
            this.newApplicationFormGroup.controls['employmentDetails'].patchValue({
                profession: profession.occupationCode
            }, { emitEvent: false })
        }
    }

    setRace(races: RaceList[], customerProfile: CustomerProfile): void {
        let race: RaceList = {} as RaceList;
        if (races && customerProfile.race) {
            const r = races.find(n => n.raceCode.toLowerCase() === customerProfile.race.toLowerCase());
            race = r ? r : race
        }

        if (!!race && race.raceCode) {
            this.newApplicationFormGroup.patchValue({ otherPersonalDetails: { raceText: race.raceLongName, race: race.raceCode } });
        }
    }

    setEtpAddress(customerProfile: CustomerProfile): void {
        if (customerProfile.addresses.length) {
            this.setMailingAddressForm(customerProfile.addresses[0]);
            this.addressTypeForm.get('addressType0').setValue(customerProfile.addresses[0].addressType);
        }
    }

    setNtpNewAddress(): void {
        this.newAddressForm.valueChanges.pipe(
            takeUntil(this._unSubscribeAll$),
            filter(x => !!x && this.customer.category === 'NTP'),
            tap((res: customerAddress) => {
                this.setMailingAddressForm(res);
            })
        ).subscribe()
    }

    setMailingAddressForm(address: customerAddress): void {
        this.newApplicationFormGroup.controls['mailingAddress'].patchValue({
            address1: address.address1,
            address2: address.address2,
            address3: address.address3,
            address4: address.address4,
            postcode: address.postcode,
            country: address.country,
            state: address.state,
        }, { eventEmit: false });
    }

    transformData(data: string, type: string): string {
        if (!data) return "";
        if (type === 'address') return data.replace(", ,", ",");
    }

    filterGender(value: string): Observable<GenderList[]> {
        return this.genderList$.pipe(
            map(allGenders => {
                if (!allGenders.length) return [];

                if (value && value !== undefined) {
                    return allGenders.filter(option => option?.genderLongName?.toLowerCase().includes(value.toString().toLowerCase()) || option?.genderCode?.toLowerCase().includes(value.toString().toLowerCase()));
                } else {
                    return allGenders
                }
            })
        );
    }

    filterNationality(value: string): Observable<CountryList[]> {
        return this.nationalityList$.pipe(
            map(allNationalities => {
                if (!allNationalities.length) return [];

                if (value && value !== undefined) {
                    return allNationalities.filter(option => option?.countryLongName?.toLowerCase().includes(value.toString().toLowerCase()) || option?.countryCode?.toLowerCase().includes(value.toString().toLowerCase()));
                } else {
                    return allNationalities
                }
            })
        );
    }

    filterCitizen(value: string): Observable<CitizenList[]> {

        return this.citizenList$.pipe(
            map(allCitizens => {
                if (!allCitizens.length) return [];

                if (value && value !== undefined) {
                    return allCitizens.filter(option => option?.citizenLongName?.toLowerCase().includes(value.toString().toLowerCase()) || option?.citizenCode?.toLowerCase().includes(value.toString().toLowerCase()));
                } else {
                    return allCitizens
                }
            })
        );
    }

    filterRace(value: string): Observable<RaceList[]> {
        return this.raceList$.pipe(
            map(allRaces => {
                if (!allRaces.length) return [];

                if (value && value !== undefined) {
                    return allRaces.filter(option => option?.raceLongName?.toLowerCase().includes(value.toString().toLowerCase()) || option?.raceCode?.toLowerCase().includes(value.toString().toLowerCase()));
                } else {
                    return allRaces
                }
            })
        );
    }

    filterMarital(value: string): Observable<MaritalList[]> {
        return this.martialStatusList$.pipe(
            map(allMaritalStatuses => {
                if (!allMaritalStatuses.length) return [];

                if (value && value !== undefined) {
                    return allMaritalStatuses.filter(option => option?.maritalLongName?.toLowerCase().includes(value.toString().toLowerCase()) || option?.maritalCode?.toLowerCase().includes(value.toString().toLowerCase()));
                } else {
                    return allMaritalStatuses
                }
            })
        );
    }

    filterReligion(value: string): Observable<ReligionList[]> {
        return this.religionList$.pipe(
            map(allReligions => {
                if (!allReligions.length) return [];

                if (value && value !== undefined) {
                    return allReligions.filter(option => option?.religionLongName?.toLowerCase().includes(value.toString().toLowerCase()) || option?.religionCode?.toLowerCase().includes(value.toString().toLowerCase()));
                } else {
                    return allReligions
                }
            })
        );
    }

    onGenderChange(data: MatAutocompleteSelectedEvent): void {
        const g = data.option.value as GenderList;
        this.gender.patchValue(g.genderLongName);
        this.otherPersonalDetailsForm.controls['gender'].patchValue(g.genderCode)
    }

    onNationalityChange(data: MatAutocompleteSelectedEvent): void {
        const n = data.option.value as CountryList;
        this.nationality.patchValue(n.countryLongName);
        this.otherPersonalDetailsForm.controls['nationality'].patchValue(n.countryCode)
    }

    onCitizenChange(data: MatAutocompleteSelectedEvent): void {
        const c = data.option.value as CitizenList;
        this.citizen.patchValue(c.citizenLongName);
        this.otherPersonalDetailsForm.controls['citizen'].patchValue(c.citizenCode)
    }

    onRaceChange(data: MatAutocompleteSelectedEvent): void {
        const c = data.option.value as RaceList;
        this.race.patchValue(c.raceLongName);
        this.otherPersonalDetailsForm.controls['race'].patchValue(c.raceCode)
    }

    onReligionChange(data: MatAutocompleteSelectedEvent): void {
        const rel = data.option.value as ReligionList;
        this.religion.patchValue(rel.religionLongName);
        this.otherPersonalDetailsForm.controls['religion'].patchValue(rel.religionCode)
    }

    onMaritalChange(data: MatAutocompleteSelectedEvent): void {
        const mar = data.option.value as MaritalList;
        this.marital.patchValue(mar.maritalLongName);
        this.otherPersonalDetailsForm.controls['maritalStatus'].patchValue(mar.maritalCode);
    }

    onCountryChange(data: MatAutocompleteSelectedEvent): void {
        const n = data.option.value as CountryList;
        this.newCountry.patchValue(n.countryLongName);
        this.newAddressForm.controls['country'].patchValue(n.countryCode)
    }

    clearSearch(data: (GenderList | CountryList | CitizenList | RaceList | ReligionList | MaritalList)[], controlName: string): void {
        let selectedData: (GenderList | CountryList | CitizenList | RaceList | ReligionList | MaritalList)[];
        switch (controlName) {
            case 'gender':
                selectedData = data.filter((g: GenderList) => g.genderLongName === this.gender.value);
                if (!selectedData.length) {
                    this.gender.patchValue('');
                }
                break;
            case 'nationality':
                selectedData = data.filter((n: CountryList) => n.countryLongName === this.nationality.value);
                if (!selectedData.length) {
                    this.nationality.patchValue('');
                }
                break;
            case 'citizen':
                selectedData = data.filter((c: CitizenList) => c.citizenLongName === this.citizen.value);
                if (!selectedData.length) {
                    this.citizen.patchValue('');
                }
                break;
            case 'race':
                selectedData = data.filter((r: RaceList) => r.raceLongName === this.race.value);
                if (!selectedData.length) {
                    this.race.patchValue('');
                }
                break;
            case 'religion':
                selectedData = data.filter((rel: ReligionList) => rel.religionLongName === this.religion.value);
                if (!selectedData.length) {
                    this.religion.patchValue('');
                }
                break;
            case 'marital':
                selectedData = data.filter((m: MaritalList) => m.maritalLongName === this.marital.value);
                if (!selectedData.length) {
                    this.marital.patchValue('');
                }
                break;
            case 'country':
                selectedData = data.filter((nc: CountryList) => nc.countryLongName === this.newCountry.value);
                if (!selectedData.length) {
                    this.newCountry.patchValue('');
                }
                break;

            default:
                break;
        }
    }

    setEtpCustomFilteredData(customerProfile: CustomerProfile): void {
        const selectType = {
            addressTypeCode: customerProfile.addresses[0].addressType,
            addressTypeName: customerProfile.addresses[0].addressType
        }

        const gender = {
            createdBy: customerProfile.gender,
            createdDate: customerProfile.gender,
            genderId: 0,
            genderShortName: customerProfile.gender,
            modifiedBy: customerProfile.gender,
            modifiedDate: customerProfile.gender,
            genderCode: customerProfile.gender,
            genderLongName: customerProfile.gender
        }

        const nationality = {
            countryNo: 0,
            createdBy: customerProfile.nationality,
            createdDate: customerProfile.nationality,
            modifiedDate: customerProfile.nationality,
            modifiedBy: customerProfile.nationality,
            countryId: 0,
            countryShortName: customerProfile.nationality,
            countryCode: customerProfile.nationality,
            countryLongName: customerProfile.nationality
        }

        const race = {
            createdBy: customerProfile.race,
            createdDate: customerProfile.race,
            raceId: 0,
            raceShortName: customerProfile.race,
            modifiedBy: customerProfile.race,
            modifiedDate: customerProfile.race,
            raceCode: customerProfile.race,
            raceLongName: customerProfile.race
        }

        const religion = {
            createdBy: customerProfile.religion,
            createdDate: customerProfile.religion,
            religionId: 0,
            religionShortName: customerProfile.religion,
            modifiedBy: customerProfile.religion,
            modifiedDate: customerProfile.religion,
            religionCode: customerProfile.religion,
            religionLongName: customerProfile.religion
        }

        const marital = {
            createdBy: customerProfile.maritalStatus,
            createdDate: customerProfile.maritalStatus,
            maritalId: 0,
            maritalShortName: customerProfile.maritalStatus,
            modifiedBy: customerProfile.maritalStatus,
            modifiedDate: customerProfile.maritalStatus,
            maritalCode: customerProfile.maritalStatus,
            maritalLongName: customerProfile.maritalStatus
        }

        const salutation = {
            createdBy: customerProfile.salutation,
            createdDate: customerProfile.salutation,
            modifiedBy: customerProfile.salutation,
            modifiedDate: customerProfile.salutation,
            salutationId: 0,
            salutationShortName: customerProfile.salutation,
            salutationCode: customerProfile.salutation,
            salutationLongName: customerProfile.salutation,
            salutationType: customerProfile.salutation
        }

        const citizen = {
            createdBy: customerProfile.gender,
            createdDate: customerProfile.gender,
            modifiedBy: customerProfile.gender,
            modifiedDate: customerProfile.gender,
            citizenId: 0,
            citizenShortName: customerProfile.gender,
            citizenStatus: 'Status',
            citizenCode: customerProfile.gender,
            citizenLongName: customerProfile.gender
        }

        const industry = {
            createdBy: customerProfile.industry,
            createdDate: customerProfile.industry,
            modifiedBy: customerProfile.industry,
            modifiedDate: customerProfile.industry,
            employmentId: 0,
            employmentShortName: customerProfile.industry,
            employmentCode: customerProfile.industry,
        }

        const profession = {
            createdBy: customerProfile.occupation,
            createdDate: customerProfile.occupation,
            modifiedBy: customerProfile.occupation,
            modifiedDate: customerProfile.occupation,
            occupationId: 0,
            occupationShortName: customerProfile.occupation,
            occupationCode: customerProfile.occupation,
            occupationLongName: customerProfile.occupation
        }

        const clientGroup = {
            customerTypeCode: customerProfile.clientGroup,
            customerTypeName: customerProfile.clientGroup
        }

        this.filteredGenders$ = of([gender]);
        this.filteredNationalities$ = of([nationality]);
        this.filteredRaces$ = of([race]);
        this.filteredCitizen$ = of([citizen]);
        this.filteredMarital$ = of([marital]);
        this.filteredReligion$ = of([religion]);
        this.addressTypeList$ = of([selectType]);
        this.industryList$ = of([industry]);
        this.professionList$ = of([profession]);
        this.titleSalutations$ = of([salutation]);
        this.filteredOfficePhone$ = of([customerProfile.offPhone[0]]);
        this.filteredHousePhone$ = of([customerProfile.housePhone[0]]);
        this.filteredEmailIds$ = of([customerProfile.email]);
        this.customerTypeResponse$ = of([clientGroup]);

        this.newApplicationFormGroup.patchValue({
            customerType: customerProfile.clientGroup,
            personalDetails: {
                title: customerProfile.salutation,
            },
            contactInformation: {
                mobileNumber: customerProfile.mobileNumber,
                emailId: customerProfile.email,
                housePhone: customerProfile.housePhone[0],
                officePhone: customerProfile.offPhone[0],
            },
            otherPersonalDetails: {
                genderText: customerProfile.gender,
                gender: customerProfile.gender,
                nationalityText: customerProfile.nationality,
                nationality: customerProfile.nationality,
                citizenText: customerProfile.cntyCitizenship,
                citizen: customerProfile.cntyCitizenship,
                raceText: customerProfile.race,
                race: customerProfile.race,
                religionText: customerProfile.religion,
                religion: customerProfile.religion,
                maritalText: customerProfile.maritalStatus,
                maritalStatus: customerProfile.maritalStatus,
            },
            addressTypeForm: {
                addressType: customerProfile.addresses[0].addressType,
            },
            employmentDetails: {
                industry: customerProfile.industry,
                profession: customerProfile.occupation,
            }
        }, {emitEvent: false})
    } 

    canDeactivate() {
        return this.newApplicationFormGroup.dirty;
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnload($event: BeforeUnloadEvent) {
        if (this.canDeactivate()) {
            $event.returnValue = true;
        }
    }

    ngOnDestroy(): void {
        this._unSubscribeAll$.next(null);
        this._unSubscribeAll$.complete();
    }
}
