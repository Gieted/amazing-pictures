import { EventEmitter, Injectable } from '@angular/core';
import { AccountService } from '../account.service';
import { ProgressBar } from '../progress-bar.service';
import { EditProfileDialogComponent } from './edit-profile/edit-profile-dialog/edit-profile-dialog.component';
import { User } from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import Profile from './Profile';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly profileCache: Map<string, Profile> = new Map();

  profileEdit = new EventEmitter();

  constructor(private accountService: AccountService,
              private progressBar: ProgressBar,
              private dialog: MatDialog,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage) { }

  init(): void {
    this.accountService.onSignIn.subscribe((user: User) => {
      if (!user.displayName) {
        this.openDialog();
      }
    });
  }

  async updateDisplayName(newName: string) {
    this.progressBar.show = true;

    try {
      const profile: Profile = { displayName: newName, pictures: [], recentTags: [] };
      await this.firestore.collection('profiles').doc(this.accountService.user.uid).set(profile);

      await this.accountService.user.updateProfile({
        displayName: newName
      });
    } catch (e) {
      console.error(e);

      let errorMessage: string;
      if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Check your internet connection';
      } else {
        errorMessage = 'Unknown error happened, please try again later';
      }

      this.progressBar.show = false;
      this.openDialog(errorMessage);
      return;
    }

    this.progressBar.show = false;
  }

  openDialog(errorMessage?: string, mode: 'edit' | 'complete' = 'complete', displayName?: string): void {
    this.dialog.open(EditProfileDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      disableClose: mode === 'complete',
      width: mode === 'edit' ? '300px' : '350px',
      data: { errorMessage, mode, displayName }
    });
  }

  async getProfile(id: string): Promise<Profile | null> {
    if (this.profileCache.get(id)) {
      return this.profileCache.get(id);
    }

    const profileDoc = await this.firestore.collection('profiles').doc(id).ref.get();
    const profileData = profileDoc.data();
    if (!profileData) {
      return null;
    }

    this.profileCache.set(id, profileData as Profile);
    return profileData as Profile;
  }

  async deleteProfile(id: string): Promise<void> {
    this.storage.ref(`/users/${id}/profile-picture`).delete();
    await this.firestore.collection(`profiles`).doc(id).delete();
    await this.accountService.user.delete();
  }
}
