import { Component, OnInit } from '@angular/core';
import { BrowserService } from './browser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  pictureId: string;

  touchScreen = ('ontouchstart' in window);

  constructor(public browserService: BrowserService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.pictureId = params.pictureId;
    });
  }

  ngOnInit(): void { }
}
