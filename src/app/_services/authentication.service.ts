import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        

            return this.userSubject.value;
        
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://127.0.0.1:8080/auth/jwt/create/', { username, password })
            .pipe(map(user => {
                console.log(user)
                localStorage.setItem('refresh',user.refresh );
                // this.getUsername(user.access)
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    getUsername()
    {   

        let headers = { headers: new HttpHeaders().set('Authorization', `Bearer ${this.userValue.access}`) };
        return this.http.get<any>('http://127.0.0.1:8080/auth/users/me/', headers)
            .pipe(map(user => {

                localStorage.setItem('user_detail',JSON.stringify(user) );
                return user;
            }));
    }

    logout() {
        // this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
        localStorage.removeItem('refresh');
        localStorage.removeItem('user_detail');
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken() {

            let headers = new HttpHeaders();
            let refresh = localStorage.getItem('refresh')
            // headers = headers.set('Authorization', 'Bearer ' + '');
            return this.http.post<any>('http://127.0.0.1:8080/auth/jwt/refresh', {refresh: refresh}, )
                .pipe(map((user) => {
                    console.log(user)
                    // let refresh = localStorage.getItem('refresh')
                    this.userSubject.next(user);
                    this.startRefreshTokenTimer();
                    return user;
                }));
        

        
    }

    // helper methods

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token

        const jwtToken = this.userValue.access;

        

        // set a timeout to refresh the token a minute before it expires
        // const expires = new Date(7000 * 1000);
        // const timeout = expires.getTime() - Date.now() - (60 * 1000);
        // console.log(timeout)
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), 60000);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}