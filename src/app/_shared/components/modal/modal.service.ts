import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertType } from './alert-type.service';
import { ModalAlertData } from './modal-alert-data';
import { AlertComponent } from './alert/alert.component';
import { TestModalComponent } from './test-modal/test-modal.component';
import { ModalInterface } from './modal-interface';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

export enum ModalSize {
  tn = '300px',
  sm = '500px',
  md = '750px',
  hg = '1000px'
}

export interface ModalConfiguration {
  modalTitle: string,
  cancelButtonLabel?: string,
  confirmButtonLabel?: string,
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
    this.openAlertModal(message, AlertType.INFO);
  }

  openWarningModal(message: string) {
    this.openAlertModal(message, AlertType.WARNING);
  }

  openErrorModal(message: string) {
    this.openAlertModal(message, AlertType.ERROR);
  }

  openConfirmationDialog(message: string, callBackFunction: Function, component?: Component) {
    const modalInterface: ModalInterface = {
      modalTitle: 'I am created by Reusable dialog',
      modalContent: 'I am second dialog',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Delete',
    };
    const dialogRef = this.dialog.open(TestModalComponent, {
      width: '200px',
      data: modalInterface
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
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
    };
    const dialogRef = this.dialog.open(component, {
      width: modalSize,
      data: modalInterface,
      disableClose: true,
      autoFocus: true
    });

    return dialogRef.afterClosed();
  }

  openAlertModal(message: string, alertType: AlertType) {
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
