import { Injectable } from '@angular/core';
import Profile from '../../profile/Profile';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AccountService } from '../../account.service';
import { ProfileService } from '../../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class PictureDeleteService {

  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private accountService: AccountService,
              private profileService: ProfileService) { }

  async deletePicture(id: string) {
    try {
      await this.firestore.collection('pictures').doc(id).delete();
      await this.storage.ref('pictures').child(id).delete();
      const profile: Profile = await this.profileService.getProfile(this.accountService.user.uid);
      profile.pictures = profile.pictures.filter(picture => picture.id !== id);
      await this.firestore.collection('profiles').doc(this.accountService.user.uid).set(profile);
    } catch (e) {
      console.error(e);
    }
  }
}
