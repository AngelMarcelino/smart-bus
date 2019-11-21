import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRoute } from 'src/app/models/route';

@Component({
  selector: 'app-route-schedule',
  templateUrl:  './route-schedule.component.html'
})
export class RouteScheduleComponent {
  routeSchedule: string[];

  @Input()
  set route(value: IRoute) {
    if (value) {
      this.routeSchedule = this.generateRouteSchedule(value);
    }
  }

  @Output()
  currentHour: EventEmitter<string>;
  constructor() {
    this.currentHour = new EventEmitter<string>();
  }

  private generateRouteSchedule(route: IRoute) {
    const schedule: string[] = [];
    const startTime = this.getDayMinutes(new Date(<string> route.firstLeavingHour));
    const endTime = this.getDayMinutes(new Date(<string> route.lastLeavingHour));
    let currentHourWasSent = false;
    for (let i = startTime; i <= endTime; i += route.intervalInMinutes) {
      const legibleTime = this.transformDateToHour(new Date((i + new Date().getTimezoneOffset()) * 60 * 1000));
      if (this.itIsNextTrip(i) && !currentHourWasSent) {
        this.currentHour.emit(legibleTime);
        currentHourWasSent = true;
      }
      schedule.push(legibleTime);
    }
    return schedule;
  }
  private transformDateToHour(dateTime: Date): string {
    return ('' + dateTime.getHours()).padStart(2, '0') + ':' + ('' + dateTime.getMinutes()).padStart(2, '0');
  }
  private getDayMinutes(date: Date): number {
    const result = date.getHours() * 60 + date.getMinutes();
    return result;
  }
  private itIsNextTrip(minuteOfTheDay: number) {
    const currentMinuteOfTheDay = this.getDayMinutes(new Date());
    if (currentMinuteOfTheDay < minuteOfTheDay) {
      return true;
    } else {
      return false;
    }
  }
}
