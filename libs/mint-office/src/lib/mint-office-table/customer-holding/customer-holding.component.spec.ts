import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { FundDetailDialogComponent } from 'apps/rma-app/src/app/modules/transaction/components/fund-detail-dialog/fund-detail-dialog.component';
import { MockCustomerProfile } from '../../core/mock/data/customer-mock-data';
import { CUSTOMER_TYPE } from '../../core/models/customer.model';
import { selectedFunds } from '../mock/customer-holding-mock.data';
import { ProductType } from '../models/application-status.model';
import { CustomerHoldingComponent } from './customer-holding.component';

describe('CustomerHoldingComponent', () => {
    let component: CustomerHoldingComponent;
    let fixture: ComponentFixture<CustomerHoldingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatSortModule,
                MatTableModule,
                MatPaginatorModule,
                MatIconModule,
                MatSelectModule,
                FormsModule,
                RouterTestingModule,
                ReactiveFormsModule,
                MatDialogModule,
                StoreModule.forRoot({}),
                NoopAnimationsModule
            ],
            providers: [

            ],
            declarations: [CustomerHoldingComponent, FundDetailDialogComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerHoldingComponent);
        component = fixture.componentInstance;
        component.customer$ = MockCustomer;
        component.customerProfile$ = MockCustomerProfile;
        component.paginator = { firstPage: () => { /* mock */ } } as MatPaginator;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call loaddata on fund name sorting', () => {
        const spy = jest.spyOn(component, 'loadData');
        component.paginator = { firstPage: () => { /* mock */ } } as MatPaginator;
        const mockSort: Sort = {
            active: 'name',
            direction: 'asc'
        }
        component.sortData(mockSort);
        expect(component.customerHoldingFilter.get('sortingFieldsOrder')?.value).toEqual([`fundName.asc`]);
        expect(spy).toHaveBeenCalled();
    });

    it('should call loaddata on if there is no sort direction', () => {
        const spy = jest.spyOn(component, 'loadData');
        component.paginator = { firstPage: () => { /* mock */ } } as MatPaginator;
        const mockSort: Sort = {
            active: 'name',
            direction: 'desc'
        }
        component.sortData(mockSort);
        expect(component.customerHoldingFilter.get('sortingFieldsOrder')?.value).toEqual([`fundName.desc`]);
        expect(spy).toHaveBeenCalled();
    });

    it('should call loaddata on nav sorting', () => {
        const spy = jest.spyOn(component, 'loadData');
        component.paginator = { firstPage: () => { /* mock */ } } as MatPaginator;
        const mockSort: Sort = {
            active: 'nav',
            direction: 'desc'
        }
        component.sortData(mockSort);
        expect(component.customerHoldingFilter.get('sortingFieldsOrder')?.value).toEqual([`navPrice.desc`]);
        expect(spy).toHaveBeenCalled();
    })

    it('should call loaddata on roi sorting', () => {
        component.paginator = { firstPage: () => { /* mock */ } } as MatPaginator;
        const spy = jest.spyOn(component, 'loadData');
        const mockSort: Sort = {
            active: 'roi',
            direction: 'desc'
        }
        component.sortData(mockSort);
        expect(component.customerHoldingFilter.get('sortingFieldsOrder')?.value).toEqual([`roi.desc`]);
        expect(spy).toHaveBeenCalled();
    })

    it('should call load on pruductTypeChanged', () => {
        const spy = jest.spyOn(component, 'loadData');
        component.setProductType(ProductType.ASNB);
        expect(component.customerHoldingFilter.get('productType')?.value).toEqual(ProductType.ASNB);
        expect(spy).toHaveBeenCalled();
    });

    it('should all load on paginate', () => {
        component.paginator = { pageSize: 3, pageIndex: 1, firstPage: () => { /* mock */ } } as MatPaginator;
        const spy = jest.spyOn(component, 'loadData');
        component.paginate();
        expect(component.customerHoldingFilter.get('pageNo')?.value).toEqual(1);
        expect(component.customerHoldingFilter.get('pageSize')?.value).toEqual(3);
        expect(spy).toHaveBeenCalled();
    });

    it('should go to goToTransactionPage',()=>{
        const suorce = "data";
        expect(component.goToTransactionPage(suorce)).toBeUndefined();
    })

    it('should to call enableCtaStatus',()=>{
        component.enableCtaStatus(selectedFunds);
        expect(component.enableCtaStatus(selectedFunds)).toBeTruthy();
    })

    it('should to call isTransactionPossible',()=>{
        component.isTransactionPossible('W');
        expect(component.isTransactionPossible('W')).toBeFalsy();
    })

    it('should disable the CTA buttons if license is expired', () => {
        component.customerProfile$ = {
            ...MockCustomerProfile,
            licenseValidity: false
        };

        component.length$.next(6);
        fixture.detectChanges();

        const ctaButtoms = fixture.debugElement.queryAll(By.css('.action button'));
        expect(ctaButtoms.length).toBe(3);

        const subscribeButton = ctaButtoms[0]
        const switchButton = ctaButtoms[1]
        const redeemButton = ctaButtoms[2]

        expect((subscribeButton.nativeElement as HTMLButtonElement).disabled).toBeTruthy();
        expect((switchButton.nativeElement as HTMLButtonElement).disabled).toBeTruthy();
        expect((redeemButton.nativeElement as HTMLButtonElement).disabled).toBeTruthy();
    })

});

const MockCustomer =   {
    id: '625d0c46aced26ac70593b96',
    coustomer: 'Hoffman Haney',
    createdDate: 'Thu Apr 23 1998 15:00:58 GMT+0530 (India Standard Time)',
    refID: 6758,
    status: 'Draft',
    type: 'New Account',
    gender: 'male',
    cifNumber: '10330000219671',
    customerType: CUSTOMER_TYPE.ETP,
}
