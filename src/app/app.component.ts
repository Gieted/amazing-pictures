import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly title = 'amazing-pictures';

  constructor(private profileService: ProfileService, private updateService: UpdateService) {
  }

  ngOnInit(): void {
    this.profileService.init();
    this.updateService.listenForUpdate().catch(console.error);
  }
}
