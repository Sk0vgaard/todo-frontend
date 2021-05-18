import { Component, OnInit } from '@angular/core';
import { Todo } from '../_shared/todo';
import { TodoService } from '../_services/data/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // todos = [
  //   new Todo('1', 'Remember to shop', false, new Date()),
  //   new Todo('2', 'Remember to walk the dog', false, new Date()),
  //   new Todo('3', 'Remember to make dinner', false, new Date()),
  //   new Todo('4', 'Remember to feed the kid', false, new Date()),
  // ];

  public todos: Todo[] | undefined;
  public errorMessage: string | undefined;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getAllTodos('Skovgaard')
      .subscribe(
        todos => {
          console.log(todos);
          this.todos = todos;
        },
        error => this.errorMessage = error.error.message
    );
  }

}
