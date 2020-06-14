import { Component, OnInit } from '@angular/core';
import { BrowserService } from './browser.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  touchScreen = ('ontouchstart' in window);

  constructor(public browserService: BrowserService) { }

  ngOnInit(): void { }
}
