import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserService } from '../browser/browser.service';
import Picture from '../pictures/Picture';

@Component({
  selector: 'app-picture-view',
  templateUrl: './picture-view.component.html',
  styleUrls: ['./picture-view.component.css']
})
export class PictureViewComponent implements OnInit {
  id: string;
  picture: Picture;

  constructor(route: ActivatedRoute, private browserService: BrowserService) {
    route.params.subscribe(async params => {
      this.id = params.id;
      if (!browserService.loading) {
        this.refresh();
      }
    });
  }

  refresh(): void {
    this.picture = this.browserService.pictures.find(picture => picture.id === this.id);
  }

  ngOnInit(): void {
    this.browserService.picturesLoaded.subscribe(this.refresh.bind(this));
  }

}
