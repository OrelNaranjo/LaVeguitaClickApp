import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../shared/interfaces/login-response';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false),
    });
  }

  login() {
    let newErrors: string[] = [];
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: LoginResponse) => {
          if (this.loginForm.value.remember) {
            localStorage.setItem('token', response.token);
            sessionStorage.removeItem('token');
          } else {
            sessionStorage.setItem('token', response.token);
            localStorage.removeItem('token');
          }
          this.authService.setToken(response.token);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          if (error.status === 0) {
            newErrors.push('Fallo de comunicación con la API.');
          } else if (error.status === 401) {
            newErrors.push('Fallo de credenciales.');
          } else {
            newErrors.push('Error desconocido.');
          }
        },
      });
    } else {
      if (this.loginForm.get('username')?.errors?.['required']) {
        newErrors.push('El nombre de usuario es obligatorio.');
      }
      if (this.loginForm.get('password')?.errors?.['required']) {
        newErrors.push('La contraseña es obligatoria.');
      }
    }
    this.errors = newErrors;
  }
}
