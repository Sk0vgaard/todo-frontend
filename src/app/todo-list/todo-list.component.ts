import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TodoModel } from '../_shared/_models/todoModel';
import { TodoService } from '../_services/data/todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements AfterViewInit {

  public dataSource: MatTableDataSource<TodoModel>;
  public errorMessage: string | undefined;
  public displayedColumns: string[] = ['position', 'username', 'description', 'done', 'targetDate'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private todoService: TodoService) {
    this.dataSource = new MatTableDataSource<TodoModel>();
  }

  public ngAfterViewInit(): void {
    this.getAllTodos();
  }

  public deleteTodo(username: string, id: string): void {
    this.todoService.deleteTodo('Skovgaard', id).subscribe(
      todo => {
        console.log(`Todo "${todo}" has been deleted...`);
        this.getAllTodos();
      }, error => this.errorMessage = error.error.message
    );
  }

  public updateTodo(todo: TodoModel): void {
    console.log(`updated todo: ${todo.targetDate}`);
  }

  private getAllTodos(): void {
    this.todoService.getAllTodos('Skovgaard')
      .subscribe((response: TodoModel[]) => {
          this.dataSource = new MatTableDataSource<TodoModel>(response);
          this.dataSource.sort = this.sort;
        },
        error => this.errorMessage = error.error.message
      );
  }
}
