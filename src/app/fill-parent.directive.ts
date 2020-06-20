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
    this.element.addEventListener('load', () => {
      const height = this.element.offsetHeight;
      const width = this.element.offsetWidth;
      const orientation: 'horizontal' | 'vertical' = height < width ? 'horizontal' : 'vertical';
      if (orientation === 'horizontal') {
        this.element.style.height = '100%';
        this.element.style.width = null;
      } else {
        this.element.style.width = '100%';
        this.element.style.height = null;
      }
      this.element.style.opacity = 1;
    });
  }

}
