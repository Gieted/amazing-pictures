import { Component, OnInit } from '@angular/core';
import { BrowserService } from './browser.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  constructor(public browserService: BrowserService) { }

  async ngOnInit(): Promise<void> {
    if (this.browserService.pictures === undefined) {
      await this.browserService.refreshPictures();
    }
  }
}
