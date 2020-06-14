import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  element;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('mouseenter', () => this.element.style.outlineWidth = '6px');
    this.element.addEventListener('mouseleave', () => this.element.style.outlineWidth = null);
  }

}
