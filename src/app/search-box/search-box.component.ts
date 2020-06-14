import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  active: boolean;
  displayClear: boolean;
  readonly search = new FormControl();
  pictureView: boolean;

  @Input() homePressed: EventEmitter<void>;

  @ViewChild('input') readonly input: ElementRef<HTMLInputElement>;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.search.valueChanges.subscribe(() => this.onInput());
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.pictureView) {
          this.pictureView = false;
        } else if (event.url.includes('picture')) {
          this.pictureView = true;
        } else {
          this.clear();
        }
      }
    });
    this.homePressed.subscribe(() => {
      if (this.router.url !== '/') {
        return;
      }
      if (this.pictureView) {
        this.pictureView = false;
      } else {
        this.clear();
      }
    });
  }

  onFocusIn(): void {
    this.active = true;
  }

  onFocusOut(): void {
    this.active = false;
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
