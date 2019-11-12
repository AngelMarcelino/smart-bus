import { IDriver } from './driver';
import { IBus } from './bus';

export interface IRoute {
  id: number;
  name: string;
  intervalInMinutes: number;
  firstLeavingHour: Date | string;
  lastLeavingHour: Date | string;
  drivers?: IDriver[];
  busses?: IBus[];
}
