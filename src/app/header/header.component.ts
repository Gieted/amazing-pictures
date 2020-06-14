import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from '../browser/browser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobile: boolean;

  constructor(private router: Router, private browserService: BrowserService) { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.innerWidth < window.innerHeight;
  }

  async homePressed(): Promise<void> {
    if (this.router.url === '/') {
      await this.browserService.refreshPictures();
    }
  }
}
