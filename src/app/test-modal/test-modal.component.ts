import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from 'modal-demo';
import { Todo } from '../_shared/_models/todo';

@Component({
  selector: 'todo-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent {

  public todo: Todo;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) {
    this.todo = this.data.modelItem as Todo;
  }

}

