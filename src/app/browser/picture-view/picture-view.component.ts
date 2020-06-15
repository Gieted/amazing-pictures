import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserService } from '../browser.service';
import Picture from '../../pictures/Picture';
import { AccountService } from '../../account.service';
import { MatDialog } from '@angular/material/dialog';
import { PictureDeleteComponent } from './picture-delete/picture-delete.component';
import Profile from '../../profile/Profile';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-picture-view',
  templateUrl: './picture-view.component.html',
  styleUrls: ['./picture-view.component.css']
})
export class PictureViewComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture.png';

  id: string;
  picture: Picture;
  my: boolean;
  profile: Profile;
  profilePicUrl: string;

  constructor(route: ActivatedRoute,
              private browserService: BrowserService,
              private accountService: AccountService,
              private dialog: MatDialog,
              private router: Router,
              private profileService: ProfileService) {

    route.params.subscribe(async params => {
      this.id = params.pictureId;
      if (!browserService.loading) {
        await this.refresh();
      }
    });
  }

  async refresh(): Promise<void> {
    this.picture = this.browserService.pictures.find(picture => picture.id === this.id);
    if (this.picture) {
      this.my = this.picture.authorId === this.accountService.user?.uid;
      this.profile = await this.profileService.getProfile(this.picture.authorId);
      this.profilePicUrl = this.profile.profilePictureUrl;
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

  @HostListener('window:keydown', ['$event'])
  async onKeyDown(event): Promise<void> {
    if (event.key === 'Escape') {
      await this.goBack();
    }
  }

  async goBack(): Promise<void> {
    const url = this.router.url;
    await this.router.navigateByUrl(/(.*)\/picture/.exec(url)[1]);
  }
}
