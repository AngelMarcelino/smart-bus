import { ITrip } from './trip';

export interface IDriver {
  id: number;
  lastName: string;
  name: string;
  email: string;
  registerDate: Date | string;
  phone: string;
  routeId?: number;
}
