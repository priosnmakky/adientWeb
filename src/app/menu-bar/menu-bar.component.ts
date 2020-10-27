import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }
  logout() {
    
    this.authenticationService.logout();

  }

}
