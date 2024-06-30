import { Commune } from './commune';
import { Region } from './region';

export interface City {
  id: number;
  name: string;
  region: Region;
  communes: Commune[];
}
