import { Component } from '@angular/core';
import { Breadcrumb, ICustomerDetails } from '../../../shared/models/breadcrumb.model';

@Component({
  selector: 'cimb-office-new-account-search-customer',
  templateUrl: './new-account-search-customer.component.html',
  styleUrls: ['./new-account-search-customer.component.scss']
})
export class NewAccountSearchCustomerComponent {

    breadcrumbs: Breadcrumb[] = [
        {
            title: 'APPLICATION',
            route: '',
        }
    ]

    customerDetails: ICustomerDetails = {
        route:'/customer',
        isEnable: true
    }
}



