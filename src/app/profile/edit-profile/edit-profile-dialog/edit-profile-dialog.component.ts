import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  errorMessage?: string;
  mode: 'edit' | 'complete';
  displayName?: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.errorMessage = data.errorMessage;
    this.mode = data.mode;
    this.displayName = data.displayName;
  }

  ngOnInit(): void {
  }

}
