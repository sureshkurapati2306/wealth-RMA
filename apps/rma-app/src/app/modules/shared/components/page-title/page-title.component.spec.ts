import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerProfile } from '@cimb/mint-office';
import { Observable, of } from 'rxjs';
import { MockCustomerProfile } from '../../../new-investment/mock/new-investment-spec.mock';

import { MintOfficePageTitleComponent } from './page-title.component';
import { StoreModule } from '@ngrx/store';

describe('MintOfficePageTitleComponent', () => {
  let component: MintOfficePageTitleComponent;
  let fixture: ComponentFixture<MintOfficePageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficePageTitleComponent ],
      imports: [
        StoreModule.forRoot({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficePageTitleComponent);
    component = fixture.componentInstance;
    component.pageTitle = 'pageTitle';
    component.showCustomerDetails = {
      route: "string",
      isEnable: true
    };

    component.customerDetails = {
      name: "string",
      id: "xxxx1234"
    };
    component.customerProfile$ = of(MockCustomerProfile) as Observable<CustomerProfile>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to mask id', () => {
    component.maskId('tes1234');

    expect(component.maskId('tes1234')).toBe('tes1234');
  });

  it('should to onClick', () => {
    component.onClick({} as Event);

    expect(component.onClick({} as Event)).toBeUndefined();
  });

});
