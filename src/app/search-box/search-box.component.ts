import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  active: boolean;
  displayClear: boolean;
  readonly search = new FormControl();

  @Input() homePressed: EventEmitter<void>;

  @ViewChild('input') readonly input: ElementRef<HTMLInputElement>;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.search.valueChanges.subscribe(() => this.onInput());
    this.router.events.subscribe(this.clear.bind(this));
    this.homePressed.subscribe(this.clear.bind(this));
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

    this.searchService.setSearchPhrase(this.search.value);
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
