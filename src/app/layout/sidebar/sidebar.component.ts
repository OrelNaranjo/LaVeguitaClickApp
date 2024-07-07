import { Component, OnInit } from '@angular/core';
import { User } from '@shared/interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  user: User | null = null;
  openedAside = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

  preventNavigation(event: MouseEvent): void {
    event.preventDefault();
  }

  toggleAside() {
    this.openedAside = !this.openedAside;
    const aside = document.querySelector('.grid-aside') as HTMLElement;
    const headerTitle = document.querySelector('.title') as HTMLElement;
    const container = document.querySelector('.grid-container') as HTMLElement;

    if (aside && headerTitle) {
      aside.classList.toggle('grid-aside-hidden');
      headerTitle.classList.toggle('title-aside-hidden');

      if (aside.classList.contains('grid-aside-hidden')) {
        container.style.gridTemplateColumns = '0px 1fr';
      } else {
        container.style.gridTemplateColumns = '220px 1fr';
      }
    }
  }
}
