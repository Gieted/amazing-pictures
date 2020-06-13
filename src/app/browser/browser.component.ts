import { Component, OnInit } from '@angular/core';
import { PicturesService } from '../pictures/pictures.service';
import Picture from '../pictures/Picture';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  pictures: Picture[];

  constructor(private picturesService: PicturesService) { }

  async ngOnInit(): Promise<void> {
    this.pictures = await this.picturesService.fetchPictures();
  }
}
