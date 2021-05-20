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
  public editRowIndex: number = -1;
  public editMode: boolean = false;

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllTodos();
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

  onEdit(index: number): void {
    console.log(index);
    this.editRowIndex = index;
    this.editMode = true;
  }

  onCancelEdit(): void {
    this.editRowIndex = -1;
    this.editMode = false;
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
}
