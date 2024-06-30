import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '@config/environments';
import { LoginResponse } from '@definitions/responses';
import { User, LoginCredentials } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private token = signal<string | null>(null);
  private user = signal<User | null>(null);

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

  getUser(): User | null {
    return this.user();
  }

  setToken(token: string | null) {
    this.token.set(token);
    if (token) {
      const decoded: User = jwtDecode(token);
      this.user.set(decoded || null);
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
