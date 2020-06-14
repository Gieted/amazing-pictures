import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrowserService } from '../../browser/browser.service';
import { PictureDeleteService } from './picture-delete.service';

@Component({
  selector: 'app-picture-delete',
  templateUrl: './picture-delete.component.html',
  styleUrls: ['./picture-delete.component.css']
})
export class PictureDeleteComponent implements OnInit {
  id: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialogRef: MatDialogRef<PictureDeleteComponent>,
              private dialog: MatDialog,
              private router: Router,
              private browserService: BrowserService,
              private pictureDeleteService: PictureDeleteService) {

    this.id = data.id;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  async delete() {
    this.dialogRef.close();

    await this.pictureDeleteService.deletePicture(this.id);

    await this.router.navigateByUrl('');
    await this.browserService.refreshPictures();
  }
}
