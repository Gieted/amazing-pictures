import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobile: boolean;

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.innerWidth < window.innerHeight;
  }
}
