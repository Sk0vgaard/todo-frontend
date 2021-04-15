import { Component, OnInit } from '@angular/core';
import { TodoMock } from '../todo-mock';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos = [
    new TodoMock(1, 'Remember to shop', false, new Date()),
    new TodoMock(2, 'Remember to walk the dog', false, new Date()),
    new TodoMock(3, 'Remember to make dinner', false, new Date()),
    new TodoMock(4, 'Remember to feed the kid', false, new Date()),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
