import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MockApprovers } from '../../mock/approvers.mock'
import { AdhocApprovalComponent } from './adhoc-approval.component';

describe('AdhocApprovalComponent', () => {
  let component: AdhocApprovalComponent;
  let fixture: ComponentFixture<AdhocApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhocApprovalComponent ],
      imports: [
        StoreModule.forRoot({}),
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocApprovalComponent);
    component = fixture.componentInstance;

    // SET UP THE ENVIRONEMT
    // component.approvers$ = of(MockApprovers);
    component._allApprovers$ = of(MockApprovers);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected option', () => {
    // SET UP THE ENVIROMENT
    const selectEvent = {
        option: {
            value: MockApprovers[1]
        }
    };

    // CALLING THE FUNCTION
    component.getSelectedOption(selectEvent as MatAutocompleteSelectedEvent);

    // EXPECT THE RESULT
    expect(component.searchValue.value).toBe(MockApprovers[1].approverName);
    expect(component.selectedApprover).toBe(MockApprovers[1]);
  });

  it('should listen for approvers', (done) => {
    component.searchValue.patchValue("a");
    component.approvers$.subscribe((res) => {
        expect(res[0].approverName).toBe(MockApprovers[2].approverName);
        done();
    });
  })
});
