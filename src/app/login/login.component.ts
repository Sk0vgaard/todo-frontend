import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = 'Skovgaard';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public handleLogin(): void {
    if (this.username === 'Skovgaard' && this.password === '123') {
      this.router.navigate(['welcome', this.username]).then(() => {});
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }

    console.log(this.username);
  }
}
