import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class FriendDetailedResolver implements Resolve<User>{

    constructor(private userservice: UserService, private router: Router,
                private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userservice.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Error retrieving data.');
                this.router.navigate(['/friends']);
                return of(null);
            })
        );
    }

}