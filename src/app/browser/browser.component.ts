import { Component, OnInit } from '@angular/core';
import { PicturesService } from '../pictures/pictures.service';
import Picture from '../pictures/Picture';
import { BrowserService } from './browser.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  pictures: Picture[];

  constructor(private picturesService: PicturesService, private browserService: BrowserService) { }

  async ngOnInit(): Promise<void> {
    await this.refreshPictures();
    this.browserService.refresh.subscribe(this.refreshPictures.bind(this));
  }

  async refreshPictures() {
    this.pictures = await this.picturesService.fetchPictures();
  }
}
