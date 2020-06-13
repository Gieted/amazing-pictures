import { Component, Inject, OnInit } from '@angular/core';
import SingInMode from '../SingInMode';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  readonly SingInMode = SingInMode;

  mode: SingInMode;
  email?: string;
  errorMessage?: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.mode = data.mode;
    this.email = data.email;
    this.errorMessage = data.errorMessage;
  }

  ngOnInit(): void {
  }
}
