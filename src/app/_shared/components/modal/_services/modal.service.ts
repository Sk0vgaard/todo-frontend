import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertData } from '../alert/modal-alert-data';
import { AlertComponent, AlertType } from '../alert/alert.component';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

export interface ModalConfiguration {
  modalTitle: string,
  modalContent?: string,
  cancelButtonLabel?: string,
  confirmButtonLabel?: string,
  modelItem?: Object
}

export interface ModalInterface {
  modalTitle: string;
  modalContent?: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  modelItem?: Object;
  component?: Component
}

export enum ModalSize {
  tn = '300px',
  sm = '500px',
  md = '750px',
  hg = '1000px'
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public confirmButtonLabel: string = 'Save';
  public cancelButtonLabel: string = 'Cancel';

  constructor(
    public dialog: MatDialog
  ) {
  }


  openInfoModal(message: string) {
    this.openAlertDialog(message, AlertType.INFO);
  }

  openWarningModal(message: string) {
    this.openAlertDialog(message, AlertType.WARNING);
  }

  openErrorModal(message: string) {
    this.openAlertDialog(message, AlertType.ERROR);
  }

  openConfirmationDialog<T>(
    component: ComponentType<T>,
    modalConfiguration: ModalConfiguration,
    modalSize: ModalSize = ModalSize.tn
  ) {
    const modalInterface: ModalInterface = {
      modalTitle: modalConfiguration.modalTitle,
      modalContent: modalConfiguration.modalContent,
      confirmButtonLabel: modalConfiguration.confirmButtonLabel ? modalConfiguration.confirmButtonLabel : this.confirmButtonLabel,
      cancelButtonLabel: modalConfiguration.cancelButtonLabel ? modalConfiguration.cancelButtonLabel : this.cancelButtonLabel,
    };
    const dialogRef = this.dialog.open(component, {
      width: modalSize,
      data: modalInterface,
      autoFocus: true
    });

    return dialogRef.afterClosed();
  }

  openModal<T>(
    component: ComponentType<T>,
    modalConfiguration: ModalConfiguration,
    modalSize: ModalSize = ModalSize.hg
  ): Observable<any> {
    const modalInterface: ModalInterface = {
      modalTitle: modalConfiguration.modalTitle,
      confirmButtonLabel: modalConfiguration.confirmButtonLabel ? modalConfiguration.confirmButtonLabel : this.confirmButtonLabel,
      cancelButtonLabel: modalConfiguration.cancelButtonLabel ? modalConfiguration.cancelButtonLabel : this.cancelButtonLabel,
      modelItem: modalConfiguration.modelItem
    };
    const dialogRef = this.dialog.open(component, {
      width: modalSize,
      data: modalInterface,
      disableClose: true,
      autoFocus: true
    });

    return dialogRef.afterClosed();
  }

  openAlertDialog(message: string, alertType: AlertType) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '300px',
      data: new ModalAlertData({
        title: this.getAlertTitle(alertType),
        content: message,
        cancelButtonLabel: 'Close',
        alertType: alertType
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('After Close Modal', result);
    });
  }

  getAlertTitle(alertType: AlertType) {
    switch (alertType) {
      case AlertType.INFO:
        return 'INFO';
      case AlertType.WARNING:
        return 'WARNING';
      case AlertType.ERROR:
        return 'ERROR';
    }
  }
}
