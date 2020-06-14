import { Directive, ElementRef, OnInit } from '@angular/core';
import { ResizeObserver } from '@juggle/resize-observer';

@Directive({
  selector: '[appSquare]'
})
export class SquareDirective implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const ro = new ResizeObserver(this.setHeight.bind(this));
    ro.observe(this.element.nativeElement);
  }

  setHeight() {
    this.element.nativeElement.style.height = this.element.nativeElement.offsetWidth + 'px';
    this.element.nativeElement.firstChild.style.width = this.element.nativeElement.offsetWidth + 'px';
  }
}
