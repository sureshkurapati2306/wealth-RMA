import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { MintOfficeSelectors } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICustomerDetails, ICustomerData } from '../../models/breadcrumb.model';

@Component({
  selector: 'cimb-office-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class MintOfficePageTitleComponent implements OnDestroy {
  @Input() pageTitle: string;
  @Input() showCustomerDetails: ICustomerDetails;
  @Input() backButtonUrl = '/';

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<string>();

  customerDetails: ICustomerData;

  private _unsubscribeAll$: Subject<any> = new Subject<any>();
  customerProfile$ = this.store.select(MintOfficeSelectors.customerProfile).pipe(filter(res => !!res))

  constructor(private store: Store) { }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next(null);
    this._unsubscribeAll$.complete();
  }


  maskId(id: string): string {
    if (!!id && id.length > 0) {
      return id.replace(/\d(?=.*\d{4})/g, "x");
    }
  }

  onClick(event: Event): string {
    this.clickEvent.emit(event.type);
    return event.type
  }

}
