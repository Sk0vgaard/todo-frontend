import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeService } from '../_services/data/welcome.service';

@Component({
  selector: 'todo-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  username = '';
  welcomeMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeService
  ) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.name;
  }

  public getWelcomeMessage(): void {
    this.welcomeService.getHelloWorldBean().subscribe(
      response => this.welcomeMessage = response.message,
      error => this.errorMessage = error.error.message
    );
  }

  public getWelcomeMessageWithPathVariable(): void {
    this.welcomeService.getHelloWorldBeanWithPathVariable(this.username).subscribe(
      response => this.welcomeMessage = response.message,
      error => this.errorMessage = error.error.message);
  }
}
