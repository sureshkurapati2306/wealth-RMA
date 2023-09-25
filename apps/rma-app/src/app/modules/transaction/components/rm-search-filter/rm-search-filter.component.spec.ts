import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QueryList } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TransactionEffects } from '../../+state/transaction.effects';
import { RmSearchFilterComponent } from './rm-search-filter.component';

describe('RmSearchFilterComponent', () => {
  let component: RmSearchFilterComponent;
  let fixture: ComponentFixture<RmSearchFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          MatSelectModule,
          MatExpansionModule,
          MatDividerModule,
          MatCardModule,
          MatButtonModule,
          MatCheckboxModule,
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          HttpClientTestingModule, RouterTestingModule
        ],
        declarations: [ RmSearchFilterComponent ],
        providers: [
          TransactionEffects,
          provideMockStore({ initialState: {} }),
        ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmSearchFilterComponent);
    component = fixture.debugElement.componentInstance as RmSearchFilterComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
