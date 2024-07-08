import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@config/environments';

@Injectable({
  providedIn: 'root',
})
export class SeederService {
  constructor(private http: HttpClient) {}

  seed() {
    return this.http.post(`${environment.API_URL}seed`, {});
  }
}
