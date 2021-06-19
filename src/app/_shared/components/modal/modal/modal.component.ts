import { Component, Inject, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalInterface } from '../modal-interface';

@Component({
  selector: 'todo-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: ModalInterface,
    public stateService: StateService
  ) {
  }

  ngOnInit(): void {
  }

  handleModalSubmit() {
    this.stateService.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
      // @ts-ignore
      this.dialogData.callbackMethod();
      this.stateService.isAsyncOperationRunning$.next(false);
    }, 500);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
