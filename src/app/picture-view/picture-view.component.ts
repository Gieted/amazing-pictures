import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserService } from '../browser/browser.service';
import Picture from '../pictures/Picture';
import { AccountService } from '../account.service';
import { MatDialog } from '@angular/material/dialog';
import { PictureDeleteComponent } from './picture-delete/picture-delete.component';

@Component({
  selector: 'app-picture-view',
  templateUrl: './picture-view.component.html',
  styleUrls: ['./picture-view.component.css']
})
export class PictureViewComponent implements OnInit {
  id: string;
  picture: Picture;
  my: boolean;

  constructor(route: ActivatedRoute,
              private browserService: BrowserService,
              private accountService: AccountService,
              private dialog: MatDialog) {

    route.params.subscribe(async params => {
      this.id = params.id;
      if (!browserService.loading) {
        this.refresh();
      }
    });
  }

  refresh(): void {
    this.picture = this.browserService.pictures.find(picture => picture.id === this.id);
    if (this.picture) {
      this.my = this.picture.authorId === this.accountService.user?.uid;
    }
  }

  ngOnInit(): void {
    this.browserService.picturesLoaded.subscribe(this.refresh.bind(this));
  }



  delete(): void {
    this.dialog.open(PictureDeleteComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: { id: this.id }
    });
  }
}
