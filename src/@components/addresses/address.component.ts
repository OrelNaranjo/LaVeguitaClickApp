import { Country } from './../../@shared/interfaces/country';
import { SelectFieldComponent } from './../select-field/select-field.component';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Commune, Region, City, Address } from '@shared/interfaces';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, SelectFieldComponent],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  // datos de ejemplo
  countries = [
    { id: 1, name: 'Chile', iso2: 'cl' },
    { id: 2, name: 'United States', iso2: 'us' },
  ];
  regions = [
    { id: 1, name: 'Región Metropolitana', country_id: 1 },
    { id: 2, name: 'Región de Valparaíso', country_id: 1 },
  ];
  cities = [
    { id: 1, name: 'Santiago', region_id: 1 },
    { id: 2, name: 'Viña del Mar', region_id: 2 },
  ];
  communes = [
    { id: 1, name: 'Providencia', city_id: 1 },
    { id: 2, name: 'Las Condes', city_id: 1 },
    { id: 3, name: 'Valparaíso', city_id: 2 },
    { id: 4, name: 'Viña del Mar', city_id: 2 },
  ];

  disabledRegion = true;
  disabledCity = true;
  disabledCommune = true;
  placeholderRegion = 'No hay regiones disponibles';
  placeholderCity = 'No hay ciudades disponibles';
  placeholderCommune = 'No hay comunas disponibles';
  addressForm: FormGroup;
  filteredRegions: Region[] = [];
  filteredCities: City[] = [];
  filteredCommunes: Commune[] = [];
  @Output() addressSubmit = new EventEmitter<Address>();

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      zip_code: ['', Validators.required],
      country: [''],
      region: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      commune: [{ value: '', disabled: true }, Validators.required],
    });
  }

  onCountryChange(selectedCountry: Country): void {
    this.addressForm.get('country')!.setValue(selectedCountry);
    this.filteredRegions = this.regions.filter((region) => region.country_id === selectedCountry.id);
    this.disabledRegion = this.filteredRegions.length === 0;
    if (this.addressForm.get('region')) {
      this.addressForm.get('region')!.enable();
      if (this.filteredRegions.length === 0) {
        this.placeholderRegion = 'No hay regiones disponibles';
        this.addressForm.get('region')!.disable();
      } else {
        this.placeholderRegion = 'Seleccione una región';
      }
    }
    if (this.addressForm.get('city')) {
      this.addressForm.get('city')!.reset();
      this.addressForm.get('city')!.disable();
    }
    if (this.addressForm.get('commune')) {
      this.addressForm.get('commune')!.reset();
      this.addressForm.get('commune')!.disable();
    }
    this.disabledCity = true;
    this.disabledCommune = true;
  }

  onRegionChange(selectedRegion: Region): void {
    if (this.addressForm) {
      this.addressForm.get('region')!.setValue(selectedRegion);
      this.filteredCities = this.cities.filter((city) => city.region_id === selectedRegion.id);
      this.disabledCity = this.filteredCities.length === 0;
      this.addressForm.get('city')!.enable();
      if (this.filteredCities.length === 0) {
        this.placeholderCity = 'No hay ciudades disponibles';
        this.addressForm.get('city')!.disable();
      } else {
        this.placeholderCity = 'Seleccione una ciudad';
      }
      const communeField = this.addressForm.get('commune');
      if (communeField) {
        communeField.reset();
        communeField.disable();
        this.disabledCommune = true;
      }
    }
  }

  onCityChange(selectedCity: City): void {
    this.addressForm.get('city')!.setValue(selectedCity);
    this.filteredCommunes = this.communes.filter((commune) => commune.city_id === selectedCity.id);
    this.disabledCommune = this.filteredCommunes.length === 0;

    const communeControl = this.addressForm.get('commune');
    if (communeControl) {
      communeControl.enable();
      if (this.filteredCommunes.length === 0) {
        this.placeholderCommune = 'No hay comunas disponibles';
        communeControl.disable();
      } else {
        this.placeholderCommune = 'Seleccione una comuna';
      }
    }
  }

  onCommuneChange(selectedCommune: Commune): void {
    const communeControl = this.addressForm.get('commune');
    if (communeControl) {
      communeControl.setValue(selectedCommune);
    }
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.addressSubmit.emit(this.addressForm.value);
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
