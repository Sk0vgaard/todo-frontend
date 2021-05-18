import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HelloWorldBean {
  constructor(public message: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private httpClient: HttpClient) {
  }

  getHelloWorldBean(): Observable<HelloWorldBean> {
    return this.httpClient.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  getHelloWorldBeanWithPathVariable(name: string): Observable<HelloWorldBean> {
    return this.httpClient.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/path-variable/${name}`);
  }
}
