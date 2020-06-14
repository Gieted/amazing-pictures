import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserComponent } from './browser/browser.component';
import { ProfileComponent } from './profile/profile.component';
import { PictureViewComponent } from './picture-view/picture-view.component';

const routes: Routes = [
  { path: '', component: BrowserComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'picture/:id', component: PictureViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
