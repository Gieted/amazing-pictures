import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService } from '../../account.service';
import { ProgressBar } from '../../progress-bar.service';
import { PicturesService } from '../../pictures/pictures.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture.png';
  active: boolean;
  displayClear: boolean;
  readonly search = new FormControl();

  hide: boolean;
  private lastHeight = 0;
  private scrolledDown = 0;

  @ViewChild('input') readonly input: ElementRef<HTMLInputElement>;

  @ViewChild('pictureInput') readonly pictureInput: ElementRef<HTMLInputElement>;

  constructor(public accountService: AccountService, public progressBar: ProgressBar, private picturesService: PicturesService) { }

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

    if (this.scrolledDown > 100 && this.lastHeight !== 0) {
      this.hide = true;
    }

    this.lastHeight = currentHeight;
  }

  async uploadPicture(event): Promise<void> {
    const file = event.target.files[0];
    await this.picturesService.uploadPicture(file);
  }

  selectPicture() {
    this.pictureInput.nativeElement.click();
  }
}
