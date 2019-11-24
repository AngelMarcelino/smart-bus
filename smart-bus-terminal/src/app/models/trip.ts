import { Driver } from './driver';
import { Route } from './route';
import { Bus } from './bus';

export enum TripStatus {
  started,
  finished,
  cancelled
}
export interface Trip {
  id: number;
  driver: Driver;
  route: Route;
  bus: Bus;
  routeId: number;
  driverId: number;
  busId: number;
  startDate: Date | string;
  nTripOfDay: number;
  tripStatus: number;
}
