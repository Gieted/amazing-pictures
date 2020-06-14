import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ProgressBar } from '../progress-bar.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AngularFireStorage } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { AccountService } from '../account.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileService } from '../profile/profile.service';
import Profile from '../profile/Profile';
import { BrowserService } from '../browser/browser.service';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent implements OnInit {
  @ViewChild('postButton', { read: ElementRef }) readonly postButton: ElementRef<HTMLButtonElement>;

  readonly file;
  imgUrl?: string;

  readonly titleForm = new FormControl();
  readonly uploadForm = new FormGroup({
    title: this.titleForm,
  });

  imageLoaded = false;

  orientation: 'horizontal' | 'vertical';

  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  errorMessage?: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              public dialogRef: MatDialogRef<PictureUploadComponent>,
              private progressBar: ProgressBar,
              private storage: AngularFireStorage,
              private accountService: AccountService,
              private firestore: AngularFirestore,
              private profileService: ProfileService,
              private dialog: MatDialog,
              private browserService: BrowserService) {

    this.file = data.file;
    this.errorMessage = data.errorMessage;
    if (data.title) {
      this.titleForm.setValue(data.title);
    }

    if (data.tags) {
      this.tags = data.tags;
    }
  }

  ngOnInit(): void {
    this.preview();
    this.onResize();

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.postButton.nativeElement.click();
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.orientation = window.innerWidth > window.innerHeight  && window.innerHeight > 700 ? 'horizontal' : 'vertical';
    window.document.activeElement.scrollIntoView();
  }

  preview(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.addEventListener('load', () => this.imgUrl = reader.result as string);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  async post() {
    if (this.uploadForm.valid) {
      const userId = this.accountService.user.uid;
      this.dialogRef.close();
      this.postButton.nativeElement.disabled = true;
      this.progressBar.show = true;

      const pictureId = uuidv4();
      try {
        await this.storage.upload(`/pictures/${pictureId}`, this.file, {
          customMetadata: {
            owner: userId
          }
        });
        const pictureDoc = this.firestore.collection('pictures').doc(pictureId);
        await pictureDoc.set({ title: this.titleForm.value, tags: this.tags, owner: userId, timestamp: +new Date() });
        const profile: Profile = await this.profileService.getProfile(userId);
        this.tags.forEach(tag => {
            if (!profile.recentTags.includes(tag)) {
              profile.recentTags.push(tag);
            }
          }
        );
        profile.pictures.push(pictureDoc.ref);
        await this.firestore.collection('profiles').doc(userId).set(profile);
      } catch (e) {
        console.error(e);

        let errorMessage: string;
        if (e.code === 'auth/network-request-failed') {
          errorMessage = 'Check your internet connection';
        } else {
          errorMessage = 'Unknown error happened, please try again later';
        }

        this.openDialog(errorMessage);
      } finally {
        this.progressBar.show = false;
      }

      this.browserService.refreshPictures().catch(console.error);
    }
  }

  openDialog(errorMessage?: string): void {
    this.dialog.open(PictureUploadComponent, {
      restoreFocus: false,
      autoFocus: false,
      height: '90%',
      width: '1000px',
      data: { file: this.file, errorMessage, title: this.titleForm.value, tags: this.tags }
    });
  }
}
