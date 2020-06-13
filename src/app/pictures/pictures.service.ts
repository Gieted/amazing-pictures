import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';
import Picture from './Picture';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private storage: AngularFireStorage, private dialog: MatDialog, private firestore: AngularFirestore) { }

  async uploadPicture(file): Promise<void> {
    this.dialog.open(PictureUploadComponent, {
      restoreFocus: false,
      autoFocus: false,
      height: '90%',
      width: '1000px',
      data: { file }
    });
  }

  async fetchPictures(): Promise<Picture[]> {
    const pictureDocs = await this.firestore.collection('pictures').get().toPromise();
    const pictures = pictureDocs.docs.map(async doc => {
      const data = await doc.data();
      const url = await this.storage.ref('pictures').child(doc.id).getDownloadURL().toPromise();
      return { url, title: data.title, tags: data.tags, authorId: data.owner } as Picture;
    });

    return Promise.all(pictures);
  }
}
