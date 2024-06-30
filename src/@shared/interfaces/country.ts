import { Region } from './region';

export interface Country {
  id: number;
  name: string;
  iso2: string;
  regions: Region[];
}
