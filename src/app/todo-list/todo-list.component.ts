import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TodoModel } from '../_shared/_models/todoModel';
import { TodoService } from '../_services/data/todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements AfterViewInit, OnInit {

  public dataSource: MatTableDataSource<TodoModel>;
  public errorMessage: string | undefined;
  public displayedColumns: string[] = ['position', 'username', 'description', 'done', 'targetDate'];

  constructor(private todoService: TodoService) {
    this.dataSource = new MatTableDataSource<TodoModel>()
  }

  @ViewChild(MatSort) sort: MatSort;

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.getAllTodos();
    this.dataSource.sort = this.sort;
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
        },
        error => this.errorMessage = error.error.message
      );
  }
}
