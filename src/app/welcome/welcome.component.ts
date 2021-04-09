import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'todo-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  username = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.name;
  }

}
