import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../account.service';
import { ProgressBar } from '../../progress-bar.service';
import { PicturesService } from '../../pictures.service';

@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.css']
})
export class HeaderDesktopComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture.png';

  @ViewChild('pictureInput') readonly pictureInput: ElementRef<HTMLInputElement>;

  constructor(public accountService: AccountService, public progressBar: ProgressBar, private picturesService: PicturesService) { }

  ngOnInit(): void {}

  async uploadPicture(event): Promise<void> {
    const file = event.target.files[0];
    await this.picturesService.uploadPicture(file);
  }

  selectPicture() {
    this.pictureInput.nativeElement.click();
  }
}
