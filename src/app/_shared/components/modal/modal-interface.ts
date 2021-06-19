import { Component } from '@angular/core';

export interface ModalInterface {
  modalTitle: string;
  modalContent?: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  callbackMethod?: () => void;
  model?: Object;
  component?: Component
}
