import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountDialogComponent } from '../account-dialog.component';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('continueButton', { read: ElementRef }) readonly continueButton: ElementRef<HTMLButtonElement>;

  readonly emailForm = new FormControl('', [Validators.required, Validators.email]);
  readonly resetPasswordForm = new FormGroup({
    email: this.emailForm
  });

  @Input() readonly email?: string;

  @Output() readonly back = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<AccountDialogComponent>, private accountService: AccountService) { }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.continueButton.nativeElement.click();
      }
    });

    if (this.email) {
      this.emailForm.setValue(this.email);
    }
  }

  async resetPassword(): Promise<void> {
    if (this.resetPasswordForm.valid) {
      this.dialogRef.close();
      this.continueButton.nativeElement.disabled = true;
      await this.accountService.resetPassword(this.emailForm.value);
    }
  }
}
