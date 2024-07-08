import { City } from './city';
import { Commune } from './commune';
import { Country } from './country';
import { Region } from './region';

export interface Address {
  id: number;
  street: string;
  zip_code: string;
  commune: Commune;
}

export interface AddressStateModel {
  addresses: Address[];
}

export interface CountryStateModel {
  countries: Country[];
}

export interface CityStateModel {
  cities: City[];
}

export interface CommuneStateModel {
  communes: Commune[];
}

export interface RegionStateModel {
  regions: Region[];
}
