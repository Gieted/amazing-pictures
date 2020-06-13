import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AccountService } from '../../account.service';
import { auth } from 'firebase/app';
import { ProgressBar } from '../../progress-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  @ViewChild('deleteButton', { read: ElementRef }) deleteButton: ElementRef<HTMLButtonElement>;

  id: string;

  password = new FormControl();

  errorMessage?: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialogRef: MatDialogRef<DeleteDialogComponent>,
              private profileService: ProfileService,
              private accountService: AccountService,
              private dialog: MatDialog,
              private progressBar: ProgressBar,
              private router: Router) {

    this.id = data.id;
    this.errorMessage = data.errorMessage;
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.deleteButton.nativeElement.click();
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async delete(): Promise<void> {
    this.password.markAsTouched();
    if (this.password.valid) {
      this.dialogRef.close();
      this.deleteButton.nativeElement.disabled = true;
      this.progressBar.show = true;
      const credential = auth.EmailAuthProvider.credential(this.accountService.user.email, this.password.value);
      try {
        await this.accountService.user.reauthenticateWithCredential(credential);
      } catch (e) {
        console.error(e);

        let errorMessage: string;
        if (e.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password';
        } else if (e.code === 'auth/network-request-failed') {
          errorMessage = 'Check your internet connection';
        } else {
          errorMessage = 'Unknown error happened, please try again later';
        }

        this.open(errorMessage);

        return;
      } finally {
        this.progressBar.show = false;
      }

      await this.profileService.deleteProfile(this.id);
      await this.router.navigate(['']);
    }
  }

  open(errorMessage?: string): void {
    this.dialog.open(DeleteDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: { id: this.id, errorMessage }
    });
  }
}
