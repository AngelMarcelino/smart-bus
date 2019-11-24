import { Driver } from './driver';
import { Trip } from './trip';

export interface Route {
  name: string;
  id: number;
  drivers: Driver[];
  trips: Trip[];
}
