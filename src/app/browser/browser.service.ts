import { Injectable } from '@angular/core';
import Picture from '../pictures/Picture';
import { PicturesService } from '../pictures/pictures.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  loading = false;
  pictures: Picture[];

  constructor(private picturesService: PicturesService) { }

  async refreshPictures() {
    this.loading = true;
    const pic = await this.picturesService.fetchPictures();
    this.pictures = pic.sort(picture => picture.timestamp);
    this.loading = false;
  }
}
