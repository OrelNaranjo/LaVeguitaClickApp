import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, SidebarComponent } from './shared';
import { LoginComponent } from './core';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './core/auths/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, LoginComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LaVeguitaClickAPP';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      this.authService.setToken(token);
    }
  }

  isAuthenticated(): boolean {
    return this.authService.getToken() !== null;
  }
}
