import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../services/hardcoded-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isUserLoggedIn: boolean | undefined;

  username = 'Skovgaard';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.hardcodedAuthenticationService.isUserLoggedIn()
      .subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn);
  }

  public login(): void {
    this.hardcodedAuthenticationService.login(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.isUserLoggedIn = isLoggedIn;
          this.router.navigate(['welcome', this.username]);
        } else {
          this.invalidLogin = true;
        }
      });
  }
}
