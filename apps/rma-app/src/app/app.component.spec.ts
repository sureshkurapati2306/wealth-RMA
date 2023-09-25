/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Action, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Idle } from '@ng-idle/core';
import { DialogAlertComponent, Environment } from '@cimb/mint-office';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterEvent } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'libs/mint-office/src/lib/core/services/auth.service';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
const events = new Subject<RouterEvent>();
const onIdleEnd = new Subject<void>();
const onTimeout = new Subject<void>();
const onIdleStart = new Subject<void>();
const onTimeoutWarning = new Subject<void>();
const apiUrl = '/?refresh_token=eyJhbGc';
const routerMock = {
    events: events.asObservable(),
    url: apiUrl,
    navigate: function() {
      return true;
    }
}

const dialogeMock = {
    open: () => { /* mock */ }
}

const idleMock = {
    onIdleEnd: onIdleEnd.asObservable(),
    onTimeout: onTimeout.asObservable(),
    onIdleStart: onIdleStart.asObservable(),
    onTimeoutWarning: onTimeoutWarning.asObservable(),
    setIdle: (value) => {console.log(value)},
    setTimeout: (value) => {console.log(value)},
    setInterrupts: (value) => {console.log(value)},
    clearInterrupts: () => {console.log("clearInterrupts called")},
    watch: () => { /* mock */ }
}

describe('AppComponent', () => {
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl };
  let actions: Observable<Action>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          StoreModule.forRoot({}),
          MatDialogModule
        ],
      declarations: [AppComponent, DialogAlertComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        AuthService,
        provideMockActions(() => actions),
        provideMockStore({ initialState: {} }),
        {provide: 'environment', useValue: environment},
        { provide: Router, useValue: routerMock },
        { provide: Idle, useValue: idleMock },
        {
          provide: MatDialog,
          useValue: dialogeMock,
        },
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
     fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rma-app'`, () => {
    expect(component.title).toEqual('rma-app');
  });


  it("should check on idle onIdleEnd", () => {
    component.setIdleTime();
    onIdleEnd.next();
    expect(component.idleState).toEqual('No longer idle.');
  })

  it("should check on idle onTimeout", () => {
    component.setIdleTime();
    onTimeout.next();
    expect(component.idleState).toEqual('Timed out!');
    expect(component.timedOut).toBe(true);
  })

  it("should check on idle onIdleStart", () => {
      component.setIdleTime();
      onIdleStart.next();
      expect(component.idleState).toEqual("You've gone idle!");
  })

});

