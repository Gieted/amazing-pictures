import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import Picture from './Picture';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private storage: AngularFireStorage, private dialog: MatDialog, private firestore: AngularFirestore) { }

  async fetchPictures(): Promise<Picture[]> {
    const pictureDocs = await this.firestore.collection('pictures').get().toPromise();
    const pictures = pictureDocs.docs.map(async doc => {
      const data = await doc.data();
      const file: AngularFireStorageReference = this.storage.ref(`pictures/${doc.id}`);
      const url = await file.getDownloadURL().toPromise();
      return { url, title: data.title, tags: data.tags, authorId: data.owner, timestamp: data.timestamp, id: doc.id } as Picture;
    });

    return Promise.all(pictures);
  }
}
