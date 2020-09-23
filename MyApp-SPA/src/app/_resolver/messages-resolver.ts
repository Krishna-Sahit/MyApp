import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/Message';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userservice: UserService, private router: Router,
                private alertify: AlertifyService, private authservice: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userservice.getMessages(this.authservice.decodedtoken.nameid, 
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Error retrieving messages.');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}