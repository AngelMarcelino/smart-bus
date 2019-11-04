export interface IRoute {
  id: number;
  name: string;
  intervalInMinutes: number;
  firstLeavingHour: Date | string;
  lastLeavingHour: Date | string;
}
