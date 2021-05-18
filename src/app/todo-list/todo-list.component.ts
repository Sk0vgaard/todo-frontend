import { Component, OnInit } from '@angular/core';
import { Todo } from '../_shared/todo';
import { TodoService } from '../_services/data/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[] | undefined;
  public errorMessage: string | undefined;
  public cancelClicked: boolean | undefined;

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  private getAllTodos(): void {
    this.todoService.getAllTodos('Skovgaard')
      .subscribe(
        todos => {
          this.todos = todos;
        },
        error => this.errorMessage = error.error.message
      );
  }

  public deleteTodo(username: string, id: string): void {
    this.todoService.deleteTodo('Skovgaard', id).subscribe(
      todo => {
        console.log(`Todo "${todo.description}" has been deleted...`);
        this.getAllTodos();
      }, error => this.errorMessage = error.error.message
    );
  }

  public updateTodo(username: string, id: string): void {
    this.router.navigate([`${username}/todo/${id}`]);
  }
}
