import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  active: boolean;
  displayClear: boolean;
  readonly search = new FormControl();

  @ViewChild('input') readonly input: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.subscribe(() => this.onInput());
  }

  onFocusIn(): void {
    this.active = true;
    if (this.search.value) {
      this.displayClear = true;
    }
  }

  onFocusOut(): void {
    this.active = false;
    this.displayClear = false;
  }

  onInput(): void {
    this.displayClear = this.search.value;
  }

  clear(): void {
    this.search.setValue(null);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.input.nativeElement.blur();
      this.clear();
    }
  }
}
