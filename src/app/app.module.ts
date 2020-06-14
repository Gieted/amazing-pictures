import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserComponent } from './browser/browser.component';
import { HeaderDesktopComponent } from './header/header-desktop/header-desktop.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { SignInComponent } from './account-dialog/sign-in/sign-in.component';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { SingUpComponent } from './account-dialog/sing-up/sing-up.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ResetPasswordComponent } from './account-dialog/reset-password/reset-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditProfileDialogComponent } from './profile/edit-profile/edit-profile-dialog/edit-profile-dialog.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DeleteDialogComponent } from './profile/delete-dialog/delete-dialog.component';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SquareDirective } from './square.directive';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    HeaderDesktopComponent,
    SearchBoxComponent,
    SignInComponent,
    AccountDialogComponent,
    SingUpComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EditProfileComponent,
    EditProfileDialogComponent,
    HeaderComponent,
    HeaderMobileComponent,
    DeleteDialogComponent,
    PictureUploadComponent,
    SquareDirective,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatChipsModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
