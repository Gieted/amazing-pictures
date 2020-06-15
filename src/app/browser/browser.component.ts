import { Component, Inject, OnInit } from '@angular/core';
import { BrowserService } from './browser.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  pictureId: string;

  touchScreen = ('ontouchstart' in window);

  constructor(public browserService: BrowserService, route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {
    route.params.subscribe(params => {
      this.pictureId = params.pictureId;
      if (this.pictureId) {
        document.documentElement.classList.add('hide-scroll');
      } else {
        document.documentElement.classList.remove('hide-scroll');
      }
    });
  }

  ngOnInit(): void { }
}
