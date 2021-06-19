import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'todo-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalConfirmData
  ) {
  }

}

export class ModalConfirmData {
  modalTitle: string;
  modalContent: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;

  constructor(data?: {
    modalTitle: string;
    modalContent: string;
    confirmButtonLabel: string;
    cancelButtonLabel: string;
  }) {
    if (data) {
      this.modalTitle = data.modalTitle;
      this.modalContent = data.modalContent;
      this.confirmButtonLabel = data.confirmButtonLabel;
      this.cancelButtonLabel = data.cancelButtonLabel;
    }
  }
}

