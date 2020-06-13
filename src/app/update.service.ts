import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) { }

  private async checkForUpdate() {
    console.log('Checking for update');
    await this.swUpdate.checkForUpdate();
  }

  async listenForUpdate(): Promise<void> {
    let updateCheck: Subscription;
    if (this.swUpdate.isEnabled) {
      this.checkForUpdate().catch(console.error);
      updateCheck = interval(1000 * 60 * 10).subscribe(this.checkForUpdate.bind(this));
    }
    const updateAvailable = this.swUpdate.available.subscribe(() => {
      updateAvailable.unsubscribe();
      updateCheck.unsubscribe();
      console.log('New update available');
      const snack = this.snackBar.open('Update available', 'UPDATE NOW');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });
  }
}
