import { Country } from './../../@shared/interfaces/country';
import { SelectFieldComponent } from './../select-field/select-field.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Commune, Region, City, Address } from '@shared/interfaces';
import { LoadCountries, LoadRegions, LoadCities, LoadCommunes, CountryState, RegionState, CityState, CommuneState } from '../../@core';
import { Observable, of } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, SelectFieldComponent, AsyncPipe],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  countries$: Observable<Country[]>;
  regions$: Observable<Region[]>;
  cities$: Observable<City[]>;
  communes$: Observable<Commune[]>;

  disabledRegion = true;
  disabledCity = true;
  disabledCommune = true;

  placeholderRegion = 'No hay regiones disponibles';
  placeholderCity = 'No hay ciudades disponibles';
  placeholderCommune = 'No hay comunas disponibles';

  addressForm: FormGroup;

  filteredRegions$: Observable<Region[]> = of([]);
  filteredCities$: Observable<City[]> = of([]);
  filteredCommunes$: Observable<Commune[]> = of([]);

  @Input() display = true;
  @Output() addressSubmit = new EventEmitter<Address>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      zip_code: ['', Validators.required],
      country: [''],
      region: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      commune: [{ value: '', disabled: true }, Validators.required],
    });

    this.store.dispatch(new LoadCountries());
    this.store.dispatch(new LoadRegions());
    this.store.dispatch(new LoadCities());
    this.store.dispatch(new LoadCommunes());

    this.countries$ = this.store.select(CountryState.getCountries);
    this.regions$ = this.store.select(RegionState.getRegions);
    this.cities$ = this.store.select(CityState.getCities);
    this.communes$ = this.store.select(CommuneState.getCommunes);

    this.filteredRegions$ = this.addressForm.get('country')!.valueChanges.pipe(
      startWith(null),
      switchMap((country) => {
        if (country) {
          return this.regions$.pipe(map((regions) => regions.filter((region) => region.country_id === country.id)));
        } else {
          return of([]);
        }
      }),
    );

    this.filteredRegions$.subscribe((regions) => {
      this.disabledRegion = regions.length === 0;
      this.addressForm.get('region')!.reset({ value: '', disabled: this.disabledRegion });
      this.placeholderRegion = this.disabledRegion ? 'No hay regiones disponibles' : 'Seleccione una región';
    });

    this.filteredCities$ = this.addressForm.get('region')!.valueChanges.pipe(
      startWith(null),
      switchMap((region) => {
        if (region) {
          return this.cities$.pipe(map((cities) => cities.filter((city) => city.region_id === region.id)));
        } else {
          return of([]);
        }
      }),
    );

    this.filteredCities$.subscribe((cities) => {
      this.disabledCity = cities.length === 0;
      this.addressForm.get('city')!.reset({ value: '', disabled: this.disabledCity });
      this.placeholderCity = this.disabledCity ? 'No hay ciudades disponibles' : 'Seleccione una ciudad';
    });

    this.filteredCommunes$ = this.addressForm.get('city')!.valueChanges.pipe(
      startWith(null),
      switchMap((city) => {
        if (city) {
          return this.communes$.pipe(map((communes) => communes.filter((commune) => commune.city_id === city.id)));
        } else {
          return of([]);
        }
      }),
    );

    this.filteredCommunes$.subscribe((communes) => {
      this.disabledCommune = communes.length === 0;
      this.addressForm.get('commune')!.reset({ value: '', disabled: this.disabledCommune });
      this.placeholderCommune = this.disabledCommune ? 'No hay comunas disponibles' : 'Seleccione una comuna';
    });
  }

  onCountryChange(selectedCountry: Country): void {
    this.addressForm.get('country')!.setValue(selectedCountry);
  }

  onRegionChange(selectedRegion: Region): void {
    this.addressForm.get('region')!.setValue(selectedRegion);
  }

  onCityChange(selectedCity: City): void {
    this.addressForm.get('city')!.setValue(selectedCity);
  }

  onCommuneChange(selectedCommune: Commune): void {
    this.addressForm.get('commune')!.setValue(selectedCommune);
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.addressSubmit.emit(this.addressForm.value);
      this.addressForm.reset();
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }
}
