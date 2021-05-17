import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  constructor(private router: Router) {
  }

  public login(username: string, password: string): Observable<boolean> {
    if (username === 'Skovgaard' && password === '123') {
      this.isLoggedIn.next(true);
      sessionStorage.setItem('authenticatedUser', username);
      this.router.navigate(['welcome', username]);
    }
    return this.isLoggedIn$;
  }

  public logout(): Observable<boolean> {
    sessionStorage.clear();
    this.isLoggedIn.next(false);
    return this.isLoggedIn$;
  }

  public isUserLoggedIn(): Observable<boolean> {
    const userLoggedIn = sessionStorage.getItem('authenticatedUser');
    if (userLoggedIn) {
      this.isLoggedIn.next(true);
    }
    return this.isLoggedIn$;
  }

}
