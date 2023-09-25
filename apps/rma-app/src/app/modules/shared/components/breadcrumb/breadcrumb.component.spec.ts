import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeBreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: MintOfficeBreadcrumbComponent;
  let fixture: ComponentFixture<MintOfficeBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
