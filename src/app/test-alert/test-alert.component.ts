import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertType, ModalData } from 'modal-demo';

@Component({
  selector: 'todo-test-alert',
  templateUrl: './test-alert.component.html',
  styleUrls: ['./test-alert.component.scss']
})
export class TestAlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData,
  ) {
  }

  // @ts-ignore
  public getAlertIcon(): string {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return 'info';
      case AlertType.WARNING:
        return 'warning';
      case AlertType.ERROR:
        return 'error';
    }
  }

  // @ts-ignore
  public getAlertColor(): string {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return 'mediumblue';
      case AlertType.WARNING:
        return 'darkgoldenrod';
      case AlertType.ERROR:
        return 'darkred';
    }
  }
}
