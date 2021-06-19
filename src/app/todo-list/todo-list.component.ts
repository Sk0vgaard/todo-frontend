import { Component, OnInit } from '@angular/core';
import { Todo } from '../_shared/_models/todo';
import { TodoService } from '../_services/data/todo.service';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../_shared/components/table/table-column';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfiguration, ModalService, ModalSize } from '../_shared/components/modal/_services/modal.service';
import { TestModalComponent } from '../_shared/components/modal/test-modal/test-modal.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[] = [];
  public errorMessage: string;
  public todoTableColumns: TableColumn[];

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private modalService: ModalService
  ) {
  }

  public ngOnInit(): void {
    this.getAllTodos();
    this.initializeColumns();
  }

  public updateTodo(todo: Todo): void {
    console.log(`updated todo: ${todo.targetDate}`);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe(
      (todo: Todo) => {
        this.todos = this.todos.filter(item => item.id !== todo.id);
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

  openInfoModal() {
    this.modalService.openInfoModal('Hello Info');
  }

  openWarningModal() {
    this.modalService.openWarningModal('Hello Warning');
  }

  openErrorModal() {
    this.modalService.openErrorModal('Hello Error');
  }

  openModal(todo: Todo) {
    const modelConfig: ModalConfiguration = {
      modalTitle: `You are about to delete: ${todo.username}`,
      confirmButtonLabel: `Delete`,
      modelItem: todo
    };
    this.modalService.openModal(TestModalComponent, modelConfig, ModalSize.sm)
      .subscribe((answer: boolean) => {
        if (answer) {
          this.deleteTodo(todo)
          console.log(`${todo.username} has been deleted...`);
          return;
        }
        console.log(`You have cancelled the deletion of ${todo.username}`);
      });
  }

  openConfirmationDialog() {
    const modelConfig: ModalConfiguration = {
      modalTitle: 'Do you love meh..?',
      modalContent: 'This is a test for the content of the confirmation dialog',
      confirmButtonLabel: 'Gem',
      cancelButtonLabel: 'Annuler'
    };
    this.modalService.openConfirmationDialog(TestModalComponent, modelConfig)
      .subscribe((answer: boolean) => {
        if (answer) {
          console.log('Yes, I love you.');
          return;
        }
        console.log('No, I\'m sorry.');
      });
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

}
