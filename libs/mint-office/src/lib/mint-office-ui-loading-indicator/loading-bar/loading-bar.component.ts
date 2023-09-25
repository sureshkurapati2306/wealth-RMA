import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as LoadingBarSelectors from './+state/loading-bar.selectors';

@Component({
  selector: 'cimb-office-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent {

  loadingBarState$: Observable<boolean>;

  constructor(
    private store: Store
  ) { 

    this.loadingBarState$ = this.store
      .pipe(
        select(LoadingBarSelectors.selectLoadingBarState),
        map(data => {
          return data.visibility === 'visible' ? true : false;
        })
      );
    
  }

}
