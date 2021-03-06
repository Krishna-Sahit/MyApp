import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ChatComponent } from './Chat/Chat.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FriendDetailedComponent } from './Friends/Friends-List/Friend-detailed/Friend-detailed.component';
import { FriendsListComponent } from './Friends/Friends-List/Friends-List.component';
import { MemberEditComponent } from './Friends/Friends-List/Member-edit/Member-edit.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsavedchanges.guard';
import { FavoritesResolver } from './_resolver/favorites-resolver';
import { FriendDetailedResolver } from './_resolver/friend-detail-resolver';
import { FriendListResolver } from './_resolver/friends-list-resolver';
import { MemberEditResolver } from './_resolver/member-edit-resolver';
import { MessagesResolver } from './_resolver/messages-resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'friends', component: FriendsListComponent, 
             resolve: { users: FriendListResolver } },
            { path: 'friends/:id', component: FriendDetailedComponent,
             resolve: { user: FriendDetailedResolver } },
            { path: 'home/edit', component: MemberEditComponent,
             resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            { path: 'favorites', component: FavoritesComponent,
             resolve: {users: FavoritesResolver} } ,
            { path: 'messages', component: ChatComponent,
             resolve: { messages: MessagesResolver } },

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },

];