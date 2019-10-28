import { UiNotificationsService } from './ui-notifications.service';

export class AlertUINotificationsService extends UiNotificationsService {
  launchSuccessNotification(message: string): void {
    alert(message);
  }
  launchErrorNotification(message: string): void {
    alert(message);
  }


}
