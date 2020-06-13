import { AfterContentChecked, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSquare]'
})
export class SquareDirective implements AfterContentChecked {

  constructor(private element: ElementRef) { }

  ngAfterContentChecked(): void {
    this.element.nativeElement.style.height = this.element.nativeElement.width + 'px';
  }

}
