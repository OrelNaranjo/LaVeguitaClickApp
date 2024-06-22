import { Injectable, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginResponse } from '../../shared/interfaces/login-response';
import { LoginCredentials } from '../../shared/interfaces/login-credentials';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../../shared/interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private token = signal<string | null>(null);
  private userData = signal<UserData | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, credentials).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Las credenciales proporcionadas son incorrectas:', error.error.message);
        } else {
          console.error('Error de inicio de sesión', error);
        }
        return throwError(() => error);
      }),
    );
  }

  getToken(): string | null {
    return this.token();
  }

  getUserData(): UserData | null {
    return this.userData();
  }

  setToken(token: string | null) {
    this.token.set(token);
    if (token) {
      const decoded: UserData = jwtDecode(token);
      this.userData.set(decoded || null);
      if (localStorage.getItem('token') === token) {
        sessionStorage.removeItem('token');
      } else if (sessionStorage.getItem('token') === token) {
        localStorage.removeItem('token');
      }
    } else {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }

  logout() {
    this.setToken(null);
  }
}
