import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  private readonly AUTHENTICATED_USER = 'authenticatedUser';
  private readonly PASSWORD = '123';
  private readonly USERNAME = 'Skovgaard';

  constructor() {
  }

  public login(username: string, password: string): Observable<boolean> {
    if (username === this.USERNAME && password === this.PASSWORD) {
      this.isLoggedIn.next(true);
      sessionStorage.setItem(this.AUTHENTICATED_USER, username);
    }
    return this.isLoggedIn$;
  }

  public logout(): Observable<boolean> {
    sessionStorage.clear();
    this.isLoggedIn.next(false);
    return this.isLoggedIn$;
  }

  public isUserLoggedIn(): Observable<boolean> {
    const userLoggedIn = !!sessionStorage.getItem(this.AUTHENTICATED_USER);
    if (userLoggedIn !== this.isLoggedIn.getValue()) {
      this.isLoggedIn.next(userLoggedIn);
    }
    return this.isLoggedIn$;
  }
}
