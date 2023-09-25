import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogPromptCommentComponent } from './dialog-prompt-comment.component';

const dialogMock = {
  close: () => { /* mock */ }
};

describe('DialogPromptCommentComponent', () => {
  let component: DialogPromptCommentComponent;
  let fixture: ComponentFixture<DialogPromptCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPromptCommentComponent ],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPromptCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss dialog and emit result', () => {
    jest.spyOn(component.dialogRef, 'close').mockReturnValue();
    expect(component.clickOk()).toBeUndefined();
  });
});
