import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountDialogComponent } from '../account-dialog.component';
import { AccountService } from '../../account.service';
import AppValidators from '../../AppValidators';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  @ViewChild('singUpButton', { read: ElementRef }) readonly singUpButton: ElementRef<HTMLButtonElement>;

  readonly emailForm = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl();
  readonly confirmPassword = new FormControl('', [Validators.required, AppValidators.sameTo(this.password)]);
  readonly singUpForm = new FormGroup({
    email: this.emailForm,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  @Output() readonly signIn = new EventEmitter();

  @Input() readonly email?: string;

  constructor(private dialogRef: MatDialogRef<AccountDialogComponent>, private accountService: AccountService) { }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Enter') {
        this.singUpButton.nativeElement.click();
      }
    });

    if (this.email) {
      this.emailForm.setValue(this.email);
    }
  }

  async singUp(): Promise<void> {
    if (this.singUpForm.valid) {
      this.singUpButton.nativeElement.disabled = true;
      this.dialogRef.close();
      await this.accountService.register(this.emailForm.value, this.password.value);
    }
  }
}
