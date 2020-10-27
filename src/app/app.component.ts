import { Component } from '@angular/core';
import { Router, Event, NavigationStart, RoutesRecognized,
    RouteConfigLoadStart, RouteConfigLoadEnd,
   NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    is_show_menu_bool = true

    constructor(private authenticationService: AuthenticationService,private router: Router) {
        router.events.subscribe( (event: Event) =>{
            if (event instanceof NavigationStart) {
                // Navigation started.s.match(/hello.*/)
                if(event.url.match(/login*/))
                {
                    this.is_show_menu_bool = false
                }
                else
                {
                    this.is_show_menu_bool = true
                }
            }
        });
    }
    ngOnInit(): void {
        console.log(this.router.url);
    }

    logout() {
        this.authenticationService.logout();
    }

}