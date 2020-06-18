import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrowserService } from '../../browser.service';
import { PictureDeleteService } from './picture-delete.service';

@Component({
  selector: 'app-picture-delete',
  templateUrl: './picture-delete.component.html',
  styleUrls: ['./picture-delete.component.css']
})
export class PictureDeleteComponent implements OnInit {
  @ViewChild('deleteButton', { read: ElementRef }) readonly deleteButton: ElementRef<HTMLButtonElement>;

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
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.deleteButton.nativeElement.click();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  async delete() {
    this.dialogRef.close();
    this.deleteButton.nativeElement.disabled = true;

    await this.pictureDeleteService.deletePicture(this.id);

    await this.router.navigateByUrl('');
    await this.browserService.refreshPictures();
  }
}
