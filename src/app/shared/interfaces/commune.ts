import { City } from './city';

export interface Commune {
  id: number;
  name: string;
  city: City;
}
