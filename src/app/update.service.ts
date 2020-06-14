import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) { }

  async listenForUpdate(): Promise<void> {
    const updateAvailable = this.swUpdate.available.subscribe(() => {
      updateAvailable.unsubscribe();
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
