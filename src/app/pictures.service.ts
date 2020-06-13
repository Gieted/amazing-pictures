import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private storage: AngularFireStorage, private dialog: MatDialog) { }

  async uploadPicture(file): Promise<void> {
    this.dialog.open(PictureUploadComponent, {
      restoreFocus: false,
      autoFocus: false,
      height: '90%',
      width: '1000px',
      data: { file }
    });
  }
}
