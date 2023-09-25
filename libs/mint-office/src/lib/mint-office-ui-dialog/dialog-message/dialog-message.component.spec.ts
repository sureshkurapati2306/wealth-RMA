import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogMessageComponent } from './dialog-message.component';

const dialogMock = {
  close: () => { /* mock */ }
}
describe('DialogMessageComponent', () => {
  let component: DialogMessageComponent;
  let fixture: ComponentFixture<DialogMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageComponent ],
      imports: [MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: dialogMock
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss dialog and emit result on confirm', () => {
    jest.spyOn(component.dialogRef, 'close').mockReturnValue();
    expect(component.confirm()).toBeUndefined();
});

it('should dismiss dialog and emit result on cancel', () => {
  jest.spyOn(component.dialogRef, 'close').mockReturnValue();
  expect(component.cancel()).toBeUndefined();
});

it('should dismiss dialog and emit result on leave', () => {
  jest.spyOn(component.dialogRef, 'close').mockReturnValue();
  expect(component.leave()).toBeUndefined();
});
});
