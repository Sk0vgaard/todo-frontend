import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorMessage = 'An error occurred...';

  constructor() { }

  ngOnInit(): void {
  }

}
