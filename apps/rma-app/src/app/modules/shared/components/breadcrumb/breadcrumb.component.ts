import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'cimb-office-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class MintOfficeBreadcrumbComponent {
    @Input() breadcrumbs: Breadcrumb[] = [];

}
