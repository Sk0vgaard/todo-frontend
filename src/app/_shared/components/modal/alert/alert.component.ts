import { Component, Inject, OnInit } from '@angular/core';
import { AlertType } from '../alert-type.service';
import { ModalAlertData } from '../modal-alert-data';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'todo-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalAlertData
  ) { }

  getAlertIcon() {
    switch (this.data.alertType) {
      case AlertType.INFO: return 'info';
      case AlertType.WARNING: return 'warning';
      case AlertType.ERROR: return 'error';
    }
  }

}
