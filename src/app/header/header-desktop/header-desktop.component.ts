import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../../account.service';
import { ProgressBar } from '../../progress-bar.service';
import { PictureUploadService } from '../../picture-upload/picture-upload.service';

@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.css']
})
export class HeaderDesktopComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture.png';

  @ViewChild('pictureInput') readonly pictureInput: ElementRef<HTMLInputElement>;

  @Output() homePressed: EventEmitter<void> = new EventEmitter();

  constructor(public accountService: AccountService, public progressBar: ProgressBar, private uploadService: PictureUploadService) { }

  ngOnInit(): void {}

  async uploadPicture(event): Promise<void> {
    const file = event.target.files[0];
    await this.uploadService.uploadPicture(file);
  }

  selectPicture() {
    this.pictureInput.nativeElement.click();
  }
}
