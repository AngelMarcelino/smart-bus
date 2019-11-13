import { IDriver } from './driver';
import { IBus } from './bus';
import { IUser } from './user';

export interface IRoute {
  id: number;
  name: string;
  intervalInMinutes: number;
  firstLeavingHour: Date | string;
  lastLeavingHour: Date | string;
  drivers?: IDriverFromDb[];
  buses?: IBus[];
}

export interface IDriverFromDb {
  id: number;
  registerDate: Date | string;
  phone: string;
  userId: number;
  user: IUser;
  routeId?: number;
}

