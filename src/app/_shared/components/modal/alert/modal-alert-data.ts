import { AlertType } from './alert.component';

export class ModalAlertData {
  title: string;
  content: string;
  alertType: AlertType;
  cancelButtonLabel: string;

  constructor(data?: {
    title: string;
    content: string;
    alertType: AlertType;
    cancelButtonLabel: string;
  }) {
    if (data) {
      this.title = data.title;
      this.content = data.content;
      this.alertType = data.alertType;
      this.cancelButtonLabel = data.cancelButtonLabel;
    }
  }
}
