import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../account.service';
import { Validators } from '@angular/forms';
import { AccountDialogComponent } from '../account-dialog.component';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('singInButton', { read: ElementRef }) readonly singInButton: ElementRef<HTMLButtonElement>;

  readonly emailForm = new FormControl('', [Validators.required, Validators.email]);
  readonly singInForm = new FormGroup({
    email: this.emailForm,
    password: new FormControl(),
  });

  @Output() readonly register = new EventEmitter();
  @Output() readonly resetPassword = new EventEmitter();

  @Input() readonly email?: string;

  constructor(private dialogRef: MatDialogRef<AccountDialogComponent>, private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.singInButton.nativeElement.click();
      }
    });

    if (this.email) {
      this.emailForm.setValue(this.email);
    }
  }

  async signIn(): Promise<void> {
    if (this.singInForm.valid) {
      this.singInButton.nativeElement.disabled = true;
      this.dialogRef.close();
      await this.accountService.signIn(this.emailForm.value, this.singInForm.controls.password.value);
    }
  }
}
