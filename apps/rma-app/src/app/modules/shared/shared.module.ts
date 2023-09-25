/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintOfficeBreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MintOfficePageTitleComponent } from './components/page-title/page-title.component';
import { RouterModule } from '@angular/router';
import { CustomerApprovalLinkComponent } from './components/customer-approval-link/customer-approval-link.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        MintOfficeBreadcrumbComponent,
        MintOfficePageTitleComponent,
        CustomerApprovalLinkComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatExpansionModule,
        MatSelectModule,
        QRCodeModule,
        
    ],
    exports: [
        MintOfficeBreadcrumbComponent,
        MintOfficePageTitleComponent,
        CustomerApprovalLinkComponent,
    ],
})
export class SharedModule {}
