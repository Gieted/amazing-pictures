import { EventEmitter, Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import SingInMode from './SingInMode';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBar } from './progress-bar.service';
import { User } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user?: User;
  readonly onSignIn: EventEmitter<User> = new EventEmitter();
  readonly onSingOut = new EventEmitter();

  constructor(private auth: AngularFireAuth,
              private dialog: MatDialog,
              private progressBar: ProgressBar,
              private snackBar: MatSnackBar) {

    this.auth.authState.subscribe(user => {
      this.user = user;
      if (user) {
        this.onSignIn.emit(user);
      } else {
        this.onSingOut.emit();
      }
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    this.progressBar.show = true;
    this.user = undefined;
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);

      let errorMessage: string;
      if (e.code === 'auth/user-not-found') {
        errorMessage = 'User with this email address does not exist';
      } else if (e.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Check your internet connection';
      } else {
        errorMessage = 'Unknown error happened, please try again later';
      }

      this.progressBar.show = false;
      this.user = null;
      this.openSingInDialog(SingInMode.Existing, email, errorMessage);
      return;
    }

    this.progressBar.show = false;
  }

  async register(email: string, password: string): Promise<void> {
    this.progressBar.show = true;
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);

      let errorMessage: string;
      if (e.code === 'auth/email-already-in-use') {
        errorMessage = 'Email address you provided is already in use';
      } else if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Check your internet connection';
      } else {
        errorMessage = 'Unknown error happened, please try again later';
      }

      this.progressBar.show = false;
      this.openSingInDialog(SingInMode.Create, email, errorMessage);
      return;
    }

    this.progressBar.show = false;
  }

  openSingInDialog(mode: SingInMode = SingInMode.Existing, email?: string, errorMessage?: string) {
    this.dialog.open(AccountDialogComponent, {
      restoreFocus: false,
      autoFocus: false,
      data: { mode, email, errorMessage },
      width: '350px',
    });
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  async resetPassword(email: string): Promise<void> {
    this.progressBar.show = true;
    try {
      await this.auth.sendPasswordResetEmail(email);
    } catch (e) {
      console.error(e);

      let errorMessage;
      if (e.code === 'auth/user-not-found') {
        errorMessage = 'User with this email address does not exist';
      } else if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Check your internet connection';
      } else {
        errorMessage = 'Unknown error happened, please try again later';
      }

      this.progressBar.show = false;
      this.openSingInDialog(SingInMode.Reset, email, errorMessage);
      return;
    }

    this.progressBar.show = false;
    this.snackBar.open('Please check your email inbox', null, {
      duration: 5000,
    });
  }
}
