import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFillParent]'
})
export class FillParentDirective implements OnInit {
  element;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit(): void {
    const height = this.element.offsetHeight;
    const width = this.element.offsetWidth;
    const orientation: 'horizontal' | 'vertical' = height < width ? 'horizontal' : 'vertical';
    if (orientation === 'horizontal') {
      this.element.style.height = '100%';
    } else {
      this.element.style.width = '100%';
    }
  }

}
