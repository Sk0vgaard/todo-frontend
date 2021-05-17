import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../services/hardcoded-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public isUserLoggedIn: boolean | undefined;

  constructor(
    public hardcodedAuthenticationService: HardcodedAuthenticationService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.hardcodedAuthenticationService.isUserLoggedIn()
      .subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn);
  }

  logout(): void {
    this.hardcodedAuthenticationService.logout();
    this.router.navigate(['login']);
  }
}
