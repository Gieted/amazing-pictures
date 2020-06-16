import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service';
import Profile from './Profile';
import { AngularFireStorage } from '@angular/fire/storage';
import { AccountService } from '../account.service';
import { User } from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  readonly defaultProfilePictureUrl = 'assets/images/default-profile-picture-big.png';

  private id: string;
  profile: Profile;
  pictureUrl: string;
  me: boolean;
  imageView: boolean;

  constructor(private route: ActivatedRoute,
              public profileService: ProfileService,
              private storage: AngularFireStorage,
              private accountService: AccountService,
              private dialog: MatDialog) {

    accountService.onSignIn.subscribe(this.detectMe.bind(this));
    accountService.onSingOut.subscribe(this.detectMe.bind(this));
    profileService.profileEdit.subscribe(async () => {
      await profileService.getProfile(this.id, true);
      await this.refresh();
    });
    route.params.subscribe(async params => {
      this.id = params.profileId;
      this.imageView = params.pictureId;
      await this.refresh();
    });
  }

  async refresh(): Promise<void> {
    this.profile = await this.profileService.getProfile(this.id);
    this.detectMe(this.accountService.user);
    this.pictureUrl = this.profile.profilePictureUrl;
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
