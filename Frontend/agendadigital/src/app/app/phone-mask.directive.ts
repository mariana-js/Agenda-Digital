import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\D/g, '');

    if (trimmedValue.length > 10) {
      trimmedValue = trimmedValue.substr(0, 10);
    }

    if (trimmedValue.length > 6) {
      input.value = `(${trimmedValue.slice(0, 2)}) ${trimmedValue.slice(2, 6)}-${trimmedValue.slice(6)}`;
    } else if (trimmedValue.length > 2) {
      input.value = `(${trimmedValue.slice(0, 2)}) ${trimmedValue.slice(2)}`;
    } else {
      input.value = trimmedValue;
    }

    this.ngControl.control?.setValue(input.value);
  }
}
