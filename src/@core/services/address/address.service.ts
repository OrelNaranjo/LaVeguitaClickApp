import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@config/environments';
import { Address, City, Commune, Country, Region } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address> {
    return this.http.get<Address>(`${environment.API_URL}addresses`);
  }

  getCountries(): Observable<Country> {
    return this.http.get<Country>(`${environment.API_URL}countries`);
  }

  getRegions(): Observable<Region> {
    return this.http.get<Region>(`${environment.API_URL}regions`);
  }

  getCities(): Observable<City> {
    return this.http.get<City>(`${environment.API_URL}cities`);
  }

  getCommunes(): Observable<Commune> {
    return this.http.get<Commune>(`${environment.API_URL}communes`);
  }
}
