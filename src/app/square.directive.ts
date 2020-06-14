import { AfterViewChecked, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appSquare]'
})
export class SquareDirective implements OnInit, AfterViewChecked {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.element.nativeElement.addEventListener('load', this.setHeight.bind(this));
    this.element.nativeElement.addEventListener('resize', this.setHeight.bind(this));
  }

  ngAfterViewChecked(): void {
    this.setHeight();
  }

  setHeight() {
    this.element.nativeElement.style.height = this.element.nativeElement.width + 'px';
  }
}
