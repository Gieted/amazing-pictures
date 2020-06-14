import { Injectable } from '@angular/core';
import { PictureUploadComponent } from './picture-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PictureUploadService {

  constructor(private dialog: MatDialog) { }

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
