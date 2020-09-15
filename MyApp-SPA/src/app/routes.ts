import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ChatComponent } from './Chat/Chat.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FriendsListComponent } from './Friends-List/Friends-List.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path : '', component : HomeComponent},
    {
        path : '',
        runGuardsAndResolvers: 'always',
        canActivate : [AuthGuard],
        children :[
            {path : 'friends', component : FriendsListComponent, canActivate: [AuthGuard]},
            {path : 'favorites', component : FavoritesComponent},
            {path : 'chat', component : ChatComponent},
        ]
    },
    {path : '**', redirectTo: '', pathMatch: 'full'},

];