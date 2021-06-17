import { Component, OnInit } from '@angular/core';
import { Todo } from '../_shared/_models/todo';
import { TodoService } from '../_services/data/todo.service';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../_shared/components/table/table-column';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[] = [];
  public errorMessage: string;
  public todoTableColumns: TableColumn[];

  constructor(private todoService: TodoService) {
  }

  public ngOnInit(): void {
    this.getAllTodos();
    this.initializeColumns();
  }

  private getAllTodos(): void {
    this.todoService.getAllTodos('Skovgaard')
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
          console.log(this.todos);
        },
        error => this.errorMessage = error.error.message
      );
  }

  public updateTodo(todo: Todo): void {
    console.log(`updated todo: ${todo.targetDate}`);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe(
      (todo: Todo) => {
        this.todos = this.todos.filter(item => item.id !== todo.id);
        console.log(`Todo "${JSON.stringify(todo)}" has been deleted...`);
        // this.getAllTodos();
      }, error => this.errorMessage = error.error.message
    );
  }

  initializeColumns(): void {
    this.todoTableColumns = [
      {
        columnName: 'Username',
        modelItem: 'username',
        position: 'right',
        sort: true
      },
      {
        columnName: 'Description',
        modelItem: 'description',
        position: 'right',
        sort: true
      },
      {
        columnName: 'Done',
        modelItem: 'done',
        position: 'right',
        sort: false
      },
      {
        columnName: 'Target date',
        modelItem: 'targetDate',
        position: 'right',
        sort: true
      }
    ];
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      // @ts-ignore
      this.todos = this.todos.sort((a: Todo, b: Todo) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      // @ts-ignore
      this.todos = this.todos.sort((a: Todo, b: Todo) => b[keyName].localeCompare(a[keyName]));
    }
  }
}
