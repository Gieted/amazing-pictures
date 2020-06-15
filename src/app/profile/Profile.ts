import { DocumentReference } from '@angular/fire/firestore';

export default interface Profile {
  displayName: string;
  recentTags: string[];
  pictures: DocumentReference[];
  profilePictureUrl?: string;
}
