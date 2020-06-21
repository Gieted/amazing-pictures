import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService } from '../../account.service';
import { ProgressBar } from '../../progress-bar.service';
import { PictureUploadService } from '../../picture-upload/picture-upload.service';
import { SearchService } from '../../search.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture.png';
  displayClear: boolean;
  readonly search = new FormControl();

  displayRefresh = false;

  hide: boolean;
  private lastHeight = 0;
  private scrolledDown = 0;

  private pictureView: boolean;

  @ViewChild('input') readonly input: ElementRef<HTMLInputElement>;

  @ViewChild('pictureInput') readonly pictureInput: ElementRef<HTMLInputElement>;

  @Output() homePressed: EventEmitter<void> = new EventEmitter();

  constructor(public accountService: AccountService,
              public progressBar: ProgressBar,
              private uploadService: PictureUploadService,
              private searchService: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this.displayRefresh = this.router.url === '/';
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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.displayRefresh = this.router.url === '/';
      }
    });
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

  @HostListener('window:scroll')
  onScroll(): void {
    const currentHeight = window.innerHeight + window.scrollY;
    let scrollDirection: 'up' | 'down';
    if (currentHeight < this.lastHeight) {
      scrollDirection = 'up';
    } else {
      scrollDirection = 'down';
    }

    if (scrollDirection === 'down') {
      this.scrolledDown += currentHeight - this.lastHeight;
    } else {
      this.scrolledDown = 0;
      this.hide = false;
    }

    if (this.scrolledDown > 100 && this.lastHeight !== 0 && currentHeight > 800) {
      this.hide = true;
    }

    this.lastHeight = currentHeight;
  }

  async uploadPicture(event): Promise<void> {
    const file = event.target.files[0];
    await this.uploadService.uploadPicture(file);
  }

  selectPicture() {
    this.pictureInput.nativeElement.click();
  }
}
