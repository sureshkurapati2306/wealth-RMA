import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { DialogAlertComponent } from './dialog-alert.component';

const dialogMock = {
  close: () => { /* mock */ },
  backdropClick: () => {return of({})},
  goToConsumerContactCentreLink: () => {/* mock */}
};
describe('DialogAlertComponent', () => {
  let component: DialogAlertComponent;
  let fixture: ComponentFixture<DialogAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAlertComponent],
      imports: [MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: dialogMock
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with mock data', () => {
    component.data = {
      dialogImage: 'test',
      dialogHeading: 'test',
      dialogHeadingSubText : 'test',
      dialogContent : 'test',
      dialogButtonCancel : true,
      dialogButtonProceed : true,
      dialogButtonCancelText : 'test',
      dialogButtonProceedText : 'test',
      dialogClickAction : 'test',
      dialogFooter : 'test',
      dialogFooterSubText : 'abc',
      dialogFooterContent : 'xyz',
      uiLoaded : true,
      dialogShowCloseButtonCancel : true,
      isInactive : false,
    }

    component.ngOnInit();
    expect(component.data.dialogImage).toEqual('test');
  });

  it('should dismiss dialog and emit result', () => {
    jest.spyOn(component.dialogRef, 'close').mockReturnValue();
    expect(component.cancel()).toBeUndefined();
  });

  it('should dismiss dialog and emit result', () => {
    jest.spyOn(component.dialogRef, 'close').mockReturnValue();
    expect(component.proceed(false)).toBeUndefined();
  });

  it('should dismiss dialog and goto Consumer Contact', () => {
    jest.spyOn(component.dialogRef, 'close').mockReturnValue();
    expect(component.goToConsumerContactCentreLink()).toBeUndefined();
  });

});
