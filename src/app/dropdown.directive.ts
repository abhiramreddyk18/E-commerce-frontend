import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this.updateDropdownState();
  }

  @HostListener('document:click', ['$event']) handleClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.updateDropdownState();
    }
  }

  private updateDropdownState() {
    if (this.isOpen) {
      this.elRef.nativeElement.classList.add('open');
    } else {
      this.elRef.nativeElement.classList.remove('open');
    }
  }
}
