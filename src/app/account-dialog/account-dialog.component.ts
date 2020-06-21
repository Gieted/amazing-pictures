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

  // tslint:disable-next-line:variable-name
  private _mode: SingInMode;
  email?: string;
  errorMessage?: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this._mode = data.mode;
    this.email = data.email;
    this.errorMessage = data.errorMessage;
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    this._mode = value;
    this.errorMessage = null;
  }

  ngOnInit(): void {
  }
}
