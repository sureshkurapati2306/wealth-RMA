import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApplicationStatus, ProductType, Transaction, ITransactionType } from '../models/application-status.model';
import { ApplicationStatusTableComponent } from './application-status-table.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Environment } from '../../core/models/environment.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionService } from '../../../../../../apps/rma-app/src/app/modules/transaction/services/transaction.service';

const mockData: Transaction[] = [
    {
        id: 123,
        refId: 14,
        customerName: "dell",
        creationDate: new Date().toDateString(),
        applicationStatus: 'rejected' as ApplicationStatus,
        transactionType: 'Subscribe',
        rpExpiry: true,
        rpqApprovalStatus: "Y"
    },
    {
        id: 13,
        refId: 234,
        customerName: "HP",
        creationDate: new Date().toDateString(),
        applicationStatus: 'confirmed' as ApplicationStatus,
        transactionType: 'Subscribe',
        rpExpiry: true,
        rpqApprovalStatus: "Y"
    },
    {
        id: 23,
        refId: 124,
        customerName: "Apar",
        creationDate: new Date().toDateString(),
        applicationStatus: 'pending approval' as ApplicationStatus,
        transactionType: 'Subscribe',
        rpExpiry: true,
        rpqApprovalStatus: "Y"
    },
    {
        id: 3,
        refId: 134,
        customerName: "CIMB",
        creationDate: new Date().toDateString(),
        applicationStatus: 'draft' as ApplicationStatus,
        transactionType: 'Subscribe',
        rpExpiry: true,
        rpqApprovalStatus: "Y"
    },
]

class MockTableService {
    getTrxValidaityStatus() { /* mock */ }
}

describe('ApplicationStatusTableComponent', () => {
    let component: ApplicationStatusTableComponent;
    let fixture: ComponentFixture<ApplicationStatusTableComponent>;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };
    let service: TransactionService;

    const dialogeMock = {
        open: () => { /* mock */ }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatDialogModule,
                MatSortModule,
                MatTableModule,
                MatPaginatorModule,
                MatIconModule,
                HttpClientTestingModule,
                MatSelectModule,
                FormsModule,
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                NoopAnimationsModule
            ],
            providers: [
                { provide: 'environment', useValue: environment },
                { provide: TransactionService, useClass: MockTableService },
                {
                    provide: MatDialog,
                    useValue: dialogeMock,
                },

            ],
            declarations: [ApplicationStatusTableComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationStatusTableComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(TransactionService);
        component.getRmDetailsResponse$ = of({rmId: "123"});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset all filed', () => {
        component.reset();
    });

    it('should get color for application status', () => {
        const spy = jest.spyOn(component, 'getStatusColor');
        component.getStatusColor(mockData[0]);
        expect(spy).toReturnWith(['rejected']);
        component.getStatusColor(mockData[1]);
        expect(spy).toReturnWith(['confirmed']);
        component.getStatusColor(mockData[2]);
        expect(spy).toReturnWith(['pending']);
        component.getStatusColor(mockData[3]);
        expect(spy).toReturnWith(['draft']);
        mockData[0].applicationStatus = "approved" as ApplicationStatus;
        component.getStatusColor(mockData[0]);
        expect(spy).toReturnWith(['approved']);
        mockData[0].applicationStatus = "processing" as ApplicationStatus;
        component.getStatusColor(mockData[0]);
        expect(spy).toReturnWith(['processing']);
        mockData[0].applicationStatus = "completed" as ApplicationStatus;
        component.getStatusColor(mockData[0]);
        expect(spy).toReturnWith(['completed']);
    });

    it('should check ofr get status value', () => {
        const spy = jest.spyOn(component, 'getStatus');
        component.getStatus('' as ApplicationStatus);
        expect(spy).toReturnWith('N/A');
    });

    it('should call loaddata on setProductType', () => {
        const spy = jest.spyOn(component, 'loadData');
        const formValue = {
            productType: ProductType.UT,
            rmId: "1234",
            pageNo: 0,
            pageSize: 0,
            days: '',
            sortingFieldsOrder: [],
            transactionType: [0],
            transactionStatus: [0],
        }
        component.setProductType(ProductType.UT);
        component.filterForm.patchValue(formValue);
        expect(component.filterForm.value).toEqual(formValue);
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('should check transection status and type in filter form', () => {
        component.togglePerOne('transactionType');
        component.allSelectedType.select();
        expect(component.allSelectedType.selected).toBe(true);

        const types = ITransactionType;
        const avaialbleTypesOptions = Object.values(types) as string[];
        component.f.get('transactionType')?.patchValue(avaialbleTypesOptions);
        component.togglePerOne('transactionType');
        component.allSelectedType.deselect();
        expect(component.allSelectedType.selected).toBe(false);
        expect(component.f.get('transactionType')?.value).toEqual(avaialbleTypesOptions)

        component.togglePerOne('transactionStatus');
        component.allSelectedStatus.select();
        expect(component.allSelectedStatus.selected).toBe(true);

        component.togglePerOne('transactionStatus');
        component.allSelectedStatus.deselect();
        expect(component.allSelectedStatus.selected).toBe(true);

        const status = ApplicationStatus;
        const avaialbleStatusOptions = Object.values(status) as string[];
        component.f.get('transactionStatus')?.patchValue(avaialbleStatusOptions);
        component.togglePerOne('transactionStatus');
        component.allSelectedStatus.deselect();
        expect(component.allSelectedStatus.selected).toBe(false);
        expect(component.f.get('transactionStatus')?.value).toEqual(avaialbleStatusOptions);
    });

    it('should check transection status & type an all click', () => {
        component.allSelectedType.deselect();
        expect(component.allSelectedType.selected).toBe(true);
        component.toggleAllSelection('transactionType');

        component.allSelectedType.select();
        expect(component.allSelectedType.selected).toBe(true);
        component.toggleAllSelection('transactionType');

        component.allSelectedStatus.deselect();
        expect(component.allSelectedStatus.selected).toBe(true);
        component.toggleAllSelection('transactionStatus');

        component.allSelectedStatus.select();
        expect(component.allSelectedStatus.selected).toBe(true);
        component.toggleAllSelection('transactionStatus');
    });

    it('should call loaddata on creationDate sorting', () => {
        const spy = jest.spyOn(component, 'loadData');
        const mockSort: Sort = {
            active: 'CREATED_ON',
            direction: 'asc'
        }
        component.sortData(mockSort);
        expect(component.filterForm.get('sortingFieldsOrder')?.value).toEqual([`creationDate.asc`]);
        expect(spy).toHaveBeenCalled();
    });

    it('should call loaddata on customerName sorting', () => {
        const spy = jest.spyOn(component, 'loadData');
        const mockSort: Sort = {
            active: 'COUSTOMER',
            direction: 'desc'
        }
        component.sortData(mockSort);
        expect(component.filterForm.get('sortingFieldsOrder')?.value).toEqual([`customerName.desc`]);
        expect(spy).toHaveBeenCalled();
    })

    it('should call loaddata on no sorting direction', () => {
        const spy = jest.spyOn(component, 'loadData');
        const mockSort: Sort = {
            active: 'CREATED_ON',
            direction: 'desc'
        }
        component.sortData(mockSort);
        expect(component.filterForm.get('sortingFieldsOrder')?.value).toEqual([`creationDate.desc`]);
        expect(spy).toHaveBeenCalled();
    });

    it('should call load data', fakeAsync(() => {
        const spy = jest.spyOn(component.datasource, 'loadLession')
        const formValue = {
            productType: ProductType.UT,
            rmId: "1234",
            customerId: "1234",
            pageNo: 0,
            pageSize: 0,
            days: '',
            sortingFieldsOrder: [],
            transactionType: [0],
            transactionStatus: [0],
        }
        component.filterForm.patchValue(formValue);
        component.loadData();
        const source = of(0).pipe(delay(100));
        let received: number | undefined;
        source.subscribe(value => received = value);
        tick(50);
        expect(received).not.toBeDefined();
        tick(50);
        expect(spy).toHaveBeenCalled();
    }));

    it('initially filter button should be disable', () => {
        const spy = jest.spyOn(component, 'isFilterEnable')
        const formValue = {
            productType: ProductType.UT,
            rmId: "1234",
            customerId: "1234",
            pageNo: 0,
            pageSize: 0,
            days: '',
            sortingFieldsOrder: [],
            transactionType: [0],
            transactionStatus: [0],
        }
        component.filterForm.patchValue(formValue);
        component.isFilterEnable();
        expect(spy).toReturnWith(false);
    })

    it('initially filter button should be enable when filter applied', () => {
        const spy = jest.spyOn(component, 'isFilterEnable')
        const formValue = {
            productType: ProductType.UT,
            rmId: "1234",
            customerId: "1234",
            pageNo: 0,
            pageSize: 0,
            days: '7',
            sortingFieldsOrder: [],
            transactionType: ['S'],
            transactionStatus: ['C'],
        }
        component.filterForm.patchValue(formValue);
        component.isFilterEnable();
        expect(spy).toReturnWith(true);
    });

    it('should open license expire popup', async() => {
        const trnsaction = {
            id: 23,
            refId: 124,
            customerName: "Apar",
            creationDate: new Date().toDateString(),
            applicationStatus: 'Draft' as ApplicationStatus,
            transactionType: 'Subscribe',
            rpExpiry: true,
            rpqApprovalStatus: "Y"
        }

        jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Okay')} as MatDialogRef<typeof component>)
        jest.spyOn(service, 'getTrxValidaityStatus').mockReturnValue(of({ statusCode: '9001' }));
        const spy = jest.spyOn(component, 'openLicenceExpiredDialog');

        await component.onActionClick(trnsaction);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(spy).toHaveBeenCalled();
    });

    it('should open AML popup', async() => {
        const trnsaction = {
            id: 23,
            refId: 124,
            customerName: "Apar",
            creationDate: new Date().toDateString(),
            applicationStatus: 'Draft' as ApplicationStatus,
            transactionType: 'Subscribe',
            rpExpiry: true,
            rpqApprovalStatus: "Y"
        }

        jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Okay')} as MatDialogRef<typeof component>);
        jest.spyOn(service, 'getTrxValidaityStatus').mockReturnValue(of({ statusCode: '9002' }));
        const spy = jest.spyOn(component, 'openAmlOrCasaPopup');

        await component.onActionClick(trnsaction);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(spy).toHaveBeenCalledWith();
    })

    it('should open casa account popup', async() => {
        const trnsaction = {
            id: 23,
            refId: 124,
            customerName: "Apar",
            creationDate: new Date().toDateString(),
            applicationStatus: 'Draft' as ApplicationStatus,
            transactionType: 'Subscribe',
            rpExpiry: true,
            rpqApprovalStatus: "Y"
        }

        jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Okay')} as MatDialogRef<typeof component>)
        jest.spyOn(service, 'getTrxValidaityStatus').mockReturnValue(of({ statusCode: '9003' }));
        const spy = jest.spyOn(component, 'openAmlOrCasaPopup');

        await component.onActionClick(trnsaction);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(spy).toHaveBeenCalledWith(true);
    })
});


