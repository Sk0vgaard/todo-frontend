import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from 'modal-demo';

@Component({
  selector: 'todo-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) {
  }
}
