import { Commune } from './commune';

export interface Address {
  id: number;
  street: string;
  zip_code: string;
  commune: Commune;
}
