export abstract class UiNotificationsService {
  abstract launchSuccessNotification(message: string): void;
  abstract launchErrorNotification(message: string): void;
}
