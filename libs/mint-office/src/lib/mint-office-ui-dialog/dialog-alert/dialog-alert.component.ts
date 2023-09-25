/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
    AfterViewChecked,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

type dialogData = {
    dialogImage: string;
    dialogHeading: string;
    dialogHeadingSubText: string;
    dialogContent: string;
    dialogButtonCancel: boolean;
    dialogButtonProceed: boolean;
    dialogButtonCancelText: string;
    dialogButtonProceedText: string;
    dialogClickAction: string;
    dialogFooter: string;
    dialogFooterSubText: string;
    dialogFooterContent: string;
    uiLoaded: boolean;
    dialogShowCloseButtonCancel: boolean;
    isInactive: boolean;
}
@Component({
    selector: 'cimb-office-dialog-alert',
    templateUrl: './dialog-alert.component.html',
    styleUrls: ['./dialog-alert.component.scss'],
})
export class DialogAlertComponent implements OnInit, AfterViewChecked {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: dialogData,
        public dialogRef: MatDialogRef<DialogAlertComponent>,
        private elementRef: ElementRef<HTMLElement>,
        private sanitized: DomSanitizer
    ) { }

    dialogImage = '';
    dialogHeading = '';
    dialogHeadingSubText = '';
    dialogContent = '';
    dialogButtonCancel = false;
    dialogButtonProceed = false;
    dialogButtonCancelText = '';
    dialogButtonProceedText = '';
    dialogClickAction = '';
    dialogFooter: string | null = null;
    dialogFooterSubText: string | null = null;
    dialogFooterContent: string | null = null;
    uiLoaded = false;
    dialogShowCloseButtonCancel = false;
    isInactive = false;
    isClose = false;

    @HostListener('document:mouseover', ['$event'])
    mouseEvents() {
        const events = ["mousedown", "mouseenter", "mouseleave", "mousemove",
            "mouseover", "mouseout", "mouseup", "mousewheel", "wheel", "touchcancel",
            "touchend", "touchmove", "touchstart"];

        const handler = (event: { stopPropagation: () => void; preventDefault: () => void; }) => {
            event.stopPropagation();

            return false;
        };

        for (let i = 0, l = events.length; i < l; i++) {
            if (events[i]) {
                document.addEventListener(events[i], handler, true);
            }
        }

        return () => {
            for (let i = 0, l = events.length; i < l; i++) {
                if (events[i]) {
                    document.removeEventListener(events[i], handler, true);
                }
            }
        };
    }


    ngOnInit(): void {
        this.dialogImage = this.data.dialogImage || '';
        this.dialogHeading = this.data.dialogHeading || '';
        this.dialogHeadingSubText = this.data.dialogHeadingSubText || '';
        this.dialogContent = this.data.dialogContent || '';
        this.dialogButtonCancel = this.data.dialogButtonCancel || false;
        this.dialogButtonProceed = this.data.dialogButtonProceed || false;
        this.dialogButtonCancelText = this.data.dialogButtonCancelText || '';
        this.dialogButtonProceedText = this.data.dialogButtonProceedText || '';
        this.dialogClickAction = this.data.dialogClickAction || '';
        this.dialogFooter = this.data.dialogFooter || null;
        this.dialogFooterSubText = this.data.dialogFooterSubText || null;
        this.dialogFooterContent = this.data.dialogFooterContent || null;
        this.dialogShowCloseButtonCancel = this.data.dialogShowCloseButtonCancel || false;
        this.isInactive = this.data.isInactive || false;

        this.dialogRef.backdropClick().subscribe(() => {
            /* istanbul ignore else */
            if (!this.isInactive) {
                this.proceed(false)
            }
        })
    }
    proceed(isClose: boolean): void {
        this.dialogRef.close(!isClose ? this.dialogButtonProceedText : null);
    }
    cancel(): void {
        this.dialogRef.close(this.dialogButtonCancelText);
    }

    ngAfterViewChecked(): void {
        /* istanbul ignore if */
        if (this.elementRef.nativeElement.querySelector('.go_to_consumer_contact_centre_link') && !this.uiLoaded) {
            this.uiLoaded = true;
            this.elementRef.nativeElement?.querySelector('.go_to_consumer_contact_centre_link')?.addEventListener(
                'click',
                this.goToConsumerContactCentreLink.bind(this),
            );
        }

    }

    goToConsumerContactCentreLink(): void {
        this.dialogRef.close(this.dialogButtonCancelText);
        window.open(
            'https://www.cimb.com.my/en/personal/help-support/contact-us.html',
            '_blank',
        );
    }

    transform(value: any): any {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
