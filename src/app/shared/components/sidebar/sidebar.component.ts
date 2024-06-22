import { Component } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auths/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userData: UserData | null = null;
  openedSubmenu: string = '';
  openedAside: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
  }

  logout() {
    this.authService.logout();
  }

  toggleSubmenu(menuName: string) {
    this.openedSubmenu = this.openedSubmenu === menuName ? '' : menuName;
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
