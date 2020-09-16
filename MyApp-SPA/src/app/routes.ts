import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ChatComponent } from './Chat/Chat.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FriendDetailedComponent } from './Friends/Friends-List/Friend-detailed/Friend-detailed.component';
import { FriendsListComponent } from './Friends/Friends-List/Friends-List.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { FriendDetailedResolver } from './_resolver/friend-detail-resolver';
import { FriendListResolver } from './_resolver/friends-list-resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'friends', component: FriendsListComponent, canActivate: [AuthGuard], 
             resolve: {users: FriendListResolver} },
            { path: 'friends/:id', component: FriendDetailedComponent, canActivate: [AuthGuard],
             resolve: { user: FriendDetailedResolver } },
            { path: 'favorites', component: FavoritesComponent },
            { path: 'chat', component: ChatComponent },

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },

];