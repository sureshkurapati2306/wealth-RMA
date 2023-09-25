import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingBarComponent } from './loading-bar.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as Selectors from './+state/loading-bar.selectors';
import { State } from './+state/loading-bar.reducer';
import { Observable } from 'rxjs';
import { MemoizedSelector } from '@ngrx/store';

const mockState: State = {
  visibility: 'hidden'
};
let mockLoadingStateSelector: MemoizedSelector<any, State>;


describe('LoadingBarComponent', () => {
  let component: LoadingBarComponent;
  let fixture: ComponentFixture<LoadingBarComponent>;
  let actions$: Observable<any>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingBarComponent ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: mockState
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore) as MockStore<State>;
    mockLoadingStateSelector = store.overrideSelector(
      Selectors.selectLoadingBarState,
      { visibility: 'hidden' } as State
    );
    fixture = TestBed.createComponent(LoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading', (done) => {

    mockLoadingStateSelector.setResult({visibility: 'visible'});

    store.refreshState();
    fixture.detectChanges();

    component.loadingBarState$
      .subscribe(data => {
        expect(data).toBeTruthy()
        done();
      })

  });

  it('should hide loading', (done) => {

    mockLoadingStateSelector.setResult({visibility: 'hidden'});

    store.refreshState();
    fixture.detectChanges();

    component.loadingBarState$
      .subscribe(data => {
        expect(data).toBeFalsy()
        done();
      })

  });
});
