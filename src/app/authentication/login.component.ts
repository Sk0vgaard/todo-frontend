import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../services/hardcoded-authentication.service';

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
    private hardcodedAuthenticationService: HardcodedAuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.hardcodedAuthenticationService.isUserLoggedIn()
      .subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn);
  }

  public handleLogin(): void {
    if (this.username === 'Skovgaard' && this.password === '123') {
      this.hardcodedAuthenticationService.login(this.username, this.password)
        .subscribe((isLoggedIn) => {
          this.isUserLoggedIn = isLoggedIn;
        });
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
