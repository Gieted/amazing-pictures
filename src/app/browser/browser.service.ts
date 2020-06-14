import { EventEmitter, Injectable } from '@angular/core';
import Picture from '../pictures/Picture';
import { PicturesService } from '../pictures/pictures.service';
import { SearchService } from '../search.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  loading = false;
  pictures: Picture[] = [];
  filteredPictures: Picture[] = [];
  picturesLoaded: EventEmitter<void> = new EventEmitter();

  constructor(private picturesService: PicturesService, private searchService: SearchService) {
    this.refreshPictures().catch(console.error);
    searchService.searchPhrase
      .subscribe(phrase => this.filteredPictures = this.pictures.filter(picture => phrase ?
        picture.title.toUpperCase().includes(phrase.toUpperCase())
        || picture.tags.some(tag => tag.toUpperCase().includes(phrase.toUpperCase())) : true));
  }

  async refreshPictures() {
    this.loading = true;
    const pic = await this.picturesService.fetchPictures();
    this.pictures = pic.sort((picture1, picture2) => picture2.timestamp - picture1.timestamp);
    this.filteredPictures = this.pictures;
    this.picturesLoaded.emit();
    this.loading = false;
  }
}
