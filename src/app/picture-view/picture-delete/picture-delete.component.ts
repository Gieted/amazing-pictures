import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AccountService } from '../../account.service';
import { ProfileService } from '../../profile/profile.service';
import Profile from '../../profile/Profile';

@Component({
  selector: 'app-picture-delete',
  templateUrl: './picture-delete.component.html',
  styleUrls: ['./picture-delete.component.css']
})
export class PictureDeleteComponent implements OnInit {
  id: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialogRef: MatDialogRef<PictureDeleteComponent>,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private dialog: MatDialog,
              private profileService: ProfileService,
              private accountService: AccountService) {

    this.id = data.id;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  async delete() {
    this.dialogRef.close();
    try {
      await this.firestore.collection('pictures').doc(this.id).delete();
      await this.storage.ref('pictures').child(this.id).delete();
      const profile: Profile = await this.profileService.getProfile(this.accountService.user.uid);
      profile.pictures = profile.pictures.filter(picture => picture.id !== this.id);
      await this.firestore.collection('profiles').doc(this.accountService.user.uid).set(profile);
    } catch (e) {
      console.error(e);
    }
  }
}
