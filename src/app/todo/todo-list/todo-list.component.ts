import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos = [
    {id: 1, description: 'Remember to shop'},
    {id: 2, description: 'Remember to walk the dog'},
    {id: 3, description: 'Remember to make dinner'},
    {id: 4, description: 'Remember to feed the kid'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
