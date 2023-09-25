import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MintOfficeBreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { MintOfficePageTitleComponent } from '../shared/components/page-title/page-title.component';


import { RiskProfileComponent } from './risk-profile.component';

describe('RiskProfileComponent', () => {
  let component: RiskProfileComponent;
  let fixture: ComponentFixture<RiskProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RiskProfileComponent,
        MintOfficeBreadcrumbComponent,
        MintOfficePageTitleComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({cifNumber: '123'})
          }
      }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
