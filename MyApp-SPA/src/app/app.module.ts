import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FriendsListComponent } from './Friends/Friends-List/Friends-List.component';
import { ChatComponent } from './Chat/Chat.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { appRoutes } from './routes';
import { FriendsCardComponent } from './Friends/Friends-List/Friends-card/Friends-card.component';
import { FriendDetailedComponent } from './Friends/Friends-List/Friend-detailed/Friend-detailed.component';
import { FriendDetailedResolver } from './_resolver/friend-detail-resolver';
import { FriendListResolver } from './_resolver/friends-list-resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './Friends/Friends-List/Member-edit/Member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit-resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsavedchanges.guard';
import { PhotoEditorComponent } from './Friends/Friends-List/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';


// tslint:disable-next-line: typedef
export function tokenGetter() {
  return localStorage.getItem('token');
}



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    FriendsListComponent,
    ChatComponent,
    FavoritesComponent,
    FriendsCardComponent,
    FriendDetailedComponent,
    MemberEditComponent,
    PhotoEditorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule,
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TimeagoModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['http://localhost:5000/api/auth/']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    FriendDetailedResolver,
    FriendListResolver,
    MemberEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
