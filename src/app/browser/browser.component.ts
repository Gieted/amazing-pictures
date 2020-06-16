import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { BrowserService } from './browser.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import Picture from '../pictures/Picture';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  pictureId: string;

  touchScreen = ('ontouchstart' in window);

  profileId?: string;

  colsCount: number;

  profileFilter: (picture: Picture) => boolean = (picture: Picture) => {
    if (this.profileId) {
      return picture.authorId === this.profileId;
    } else {
      return true;
    }
  }

  constructor(public browserService: BrowserService, route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {
    route.params.subscribe(params => {
      this.pictureId = params.pictureId;
      if (this.pictureId) {
        document.documentElement.classList.add('hide-scroll');
      } else {
        document.documentElement.classList.remove('hide-scroll');
      }

      this.profileId = params.profileId;
    });
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 740) {
      this.colsCount = window.innerWidth / 100;
    } else {
      this.colsCount = window.innerWidth / 200;
    }
  }
}
