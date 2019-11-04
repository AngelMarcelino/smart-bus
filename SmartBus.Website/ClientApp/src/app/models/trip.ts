import { IDriver } from './driver';
import { IBus } from './bus';

export interface ITrip {
  id: number;
  startDate: Date;
  endDate: Date;
  driverId: number;
  driver?: IDriver;
  bus?: IBus;
  busId: number;
}
