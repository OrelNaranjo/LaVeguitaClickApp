import { Commune } from './commune';

export interface Address {
  id: number;
  street: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  commune: Commune;
}
