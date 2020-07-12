import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  async goBack(): Promise<void> {
    const url = this.router.url;
    await this.router.navigateByUrl(/(.*)\/picture/.exec(url)[1]);
  }
}
