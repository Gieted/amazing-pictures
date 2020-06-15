import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service';
import Profile from './Profile';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { User } from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { BrowserService } from '../browser/browser.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture-big.png';

  private id: string;
  profile: Profile;
  pictureUrl: Observable<string>;
  me: boolean;

  constructor(private route: ActivatedRoute,
              public profileService: ProfileService,
              private storage: AngularFireStorage,
              private accountService: AccountService,
              private dialog: MatDialog,
              private browserService: BrowserService) {

    accountService.onSignIn.subscribe(this.detectMe.bind(this));
    accountService.onSingOut.subscribe(this.detectMe.bind(this));
    profileService.profileEdit.subscribe(this.refresh.bind(this));
    route.params.subscribe(async params => {
      this.id = params.id;
      await this.refresh();
    });
  }

  async refresh(): Promise<void> {
    this.profile = await this.profileService.getProfile(this.id);
    this.detectMe(this.accountService.user);
    this.pictureUrl = this.storage.ref(`/users/${this.id}/profile-picture`).getDownloadURL();
    if (!this.me) {
      await this.browserService.refreshPictures();
    }
  }

  detectMe(user?: User): void {
    if (!user) {
      this.me = false;
    } else {
      this.me = this.id === user.uid;
    }
  }

  ngOnInit(): void { }

  edit(): void {
    this.profileService.openDialog(null, 'edit', this.profile.displayName);
  }

  delete(): void {
    this.dialog.open(DeleteDialogComponent, {
      restoreFocus: false,
      autoFocus: false,
      data: { id: this.id }
    });
  }
}
