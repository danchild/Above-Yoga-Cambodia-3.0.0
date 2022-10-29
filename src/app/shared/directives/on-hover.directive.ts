import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appOnHover]'
})
export class OnHoverDirective {
  @HostBinding('style.color') color: string;
  @HostBinding('style.textDecoration') textDecoration: string;

  constructor() {
  }

  @HostListener('mouseenter') mouseEnter(): void {
    if (window.innerWidth > 992) {
      this.color = 'rgb(40, 174, 228)';
      this.textDecoration = 'none';
    } else {
      this.textDecoration = 'underline';
    }
  }

  @HostListener('mouseleave') mouseLeave(): void {
    this.color = 'white';
    this.textDecoration = 'none';
  }
}
