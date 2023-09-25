import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, LOCALE_ID, OnInit } from '@angular/core';

const _target = "$event.target.value";

@Directive({
    selector: '[cimbAmountDirective]'
})
export class AmountDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef<HTMLInputElement>,
        @Inject(LOCALE_ID) public locale: string,
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        if(this.el.value) {
           this.formatNumber(this.el.value);
        }
    }

    @HostListener("focus", [_target])
    onFocus(value: string): void {
        value = value.replace(/,/g, '');
        this.el.value = value;
    }

    @HostListener("blur", [_target])
    onBlur(value: string): void {
        this.el.value = this.formatNumber(value);
    }

    @HostListener("paste", ["$event"])
    onPaste(e: ClipboardEvent): void {
        const pastevalue = e.clipboardData?.getData('text');
        const regex = /^\d+(\.\d{0,2})?$/;
        if (!regex.test(pastevalue ? pastevalue: '')) {
            e.preventDefault();
        }
    }

    @HostListener("keypress", ["$event"])
    onKeyPress(e: KeyboardEvent): void {
        let totalAmount = this.el.value;

        if (
            totalAmount.length !== 0 &&
            (this.el.selectionStart || this.el.selectionStart === 0) &&
            this.el.selectionStart <= totalAmount.length &&
            (this.el.selectionEnd || this.el.selectionEnd === 0)
        ) {
            const rateArr = totalAmount.split('');
            if (this.el.selectionStart === this.el.selectionEnd) {
                rateArr.splice(this.el.selectionStart, 0, e.key);
            } else {
                rateArr[this.el.selectionStart] = e.key;
                rateArr.splice(
                    this.el.selectionStart + 1,
                    this.el.selectionEnd - this.el.selectionStart + 1,
                );
            }

            totalAmount = rateArr.join('');
        } else {
            totalAmount += e.key;
        }
        const regex = /^\d+(\.\d{0,2})?$/;
        if (!regex.test(totalAmount)) {
            e.preventDefault();
        }
    }

    private formatNumber(value: string): string {
        const v = new DecimalPipe(this.locale).transform(value, '1.2-2')
        return v ? v : '';
    }


}
