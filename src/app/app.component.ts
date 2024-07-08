import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, SidebarComponent } from './layout';
import { LoginComponent } from './modules';
import { AuthService } from '@core/services';
import { SeederService } from '../@core/services/seeders/seeder.service'
import { take } from 'rxjs'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LaVeguitaClickAPP';

  constructor(private authService: AuthService, private seederService: SeederService) {}

  ngOnInit() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      this.authService.setToken(token);
    }

    this.seederService.seed().pipe(take(1)).subscribe();
  }

  isAuthenticated(): boolean {
    return this.authService.getToken() !== null;
  }
}
