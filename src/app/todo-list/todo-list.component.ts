import { Component, OnInit } from '@angular/core';
import { Todo } from '../_shared/_models/todo';
import { TodoService } from '../_services/data/todo.service';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../_shared/components/table/table-column';
import { MatDialog } from '@angular/material/dialog';
import { TestModalComponent } from '../test-modal/test-modal.component';
import { AlertType, ModalConfiguration, ModalDemoService, ModalSizeEnum } from 'modal-demo';
import { TestAlertComponent } from '../test-alert/test-alert.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: Todo[] = [];
  public errorMessage: string;
  public todoTableColumns: TableColumn[] = [];

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private modalService: ModalDemoService
  ) {
  }

  public ngOnInit(): void {
    this.initializeColumns();
    this.getAllTodos();
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
    const modelConfig: ModalConfiguration = {
      modalTitle: `Hello ${AlertType.INFO}`,
      modalContent: `This is the content of ${AlertType.INFO}, which is kinda awesome...!`,
      confirmButtonLabel: `Close`,
    };
    this.modalService.openAlertDialog(TestAlertComponent, modelConfig, AlertType.INFO);
  }

  openWarningModal() {
    const modelConfig: ModalConfiguration = {
      modalTitle: `Hello ${AlertType.WARNING}`,
      modalContent: `This is the content of ${AlertType.WARNING}, which is kinda awesome...!`,
      confirmButtonLabel: `Close`,
    };
    this.modalService.openAlertDialog(TestAlertComponent, modelConfig, AlertType.WARNING);
  }

  openErrorModal() {
    const modelConfig: ModalConfiguration = {
      modalTitle: `Hello ${AlertType.ERROR}`,
      modalContent: `This is the content of ${AlertType.ERROR}, which is kinda awesome...!`,
      confirmButtonLabel: `Close`,
    };
    this.modalService.openAlertDialog(TestAlertComponent, modelConfig, AlertType.ERROR);
  }

  openModal(todo: Todo) {
    const modelConfig: ModalConfiguration = {
      modalTitle: `You are about to delete: ${todo.username}`,
      confirmButtonLabel: `Delete`,
      modelItem: todo
    };
    this.modalService.openModal(TestModalComponent, modelConfig, ModalSizeEnum.sm)
      .subscribe((answer: boolean) => {
        if (answer) {
          this.deleteTodo(todo);
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
