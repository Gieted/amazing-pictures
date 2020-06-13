import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AccountService } from '../../account.service';
import { Observable } from 'rxjs';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('continueButton', { read: ElementRef }) readonly continueButton: ElementRef<HTMLButtonElement>;
  @ViewChild('pictureInput') readonly pictureInput: ElementRef<HTMLInputElement>;

  readonly displayNameForm = new FormControl();
  readonly profile = new FormGroup({
    displayName: this.displayNameForm,
    picture: new FormControl(),
  });

  uploadTask?: AngularFireUploadTask;
  uploadPercent?: Observable<number | null>;

  @Input() mode: 'edit' | 'complete';
  @Input() displayName?: string;

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>,
              private storage: AngularFireStorage,
              public accountService: AccountService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.continueButton.nativeElement.click();
      }
    });

    this.displayNameForm.setValue(this.displayName);
  }

  selectPicture(): void {
    this.pictureInput.nativeElement.click();
  }

  onInputKeydown(event): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  async uploadPicture(event): Promise<void> {
    this.uploadTask = this.storage.upload(`/users/${this.accountService.user.uid}/profile-picture`, event.target.files[0]);
    this.uploadPercent = this.uploadTask.percentageChanges();
    const result: UploadTaskSnapshot = await this.uploadTask;
    this.uploadPercent = null;
    const url = await result.ref.getDownloadURL();
    await this.accountService.user.updateProfile({
      photoURL: url
    });
    this.uploadTask = null;
    this.profileService.profileEdit.emit();
  }

  async updateProfile(): Promise<void> {
    if (this.profile.valid) {
      this.dialogRef.close();
      this.continueButton.nativeElement.disabled = true;
      await this.profileService.updateDisplayName(this.displayNameForm.value);
      if (this.mode === 'edit') {
        this.profileService.profileEdit.emit();
      }
    }
  }
}
