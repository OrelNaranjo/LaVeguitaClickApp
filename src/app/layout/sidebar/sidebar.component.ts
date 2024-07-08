import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@shared/interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services';
import { NzIconDirective } from 'ng-zorro-antd/icon'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NzIconDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  openedAside = true;
  mediaQueryList: MediaQueryList;

  constructor(private authService: AuthService) {
    this.mediaQueryList = window.matchMedia('(max-width: 568px)');
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.handleMediaChange(this.mediaQueryList);
    this.mediaQueryList.addEventListener('change', this.handleMediaChange);
  }

  logout() {
    this.authService.logout();
  }

  preventNavigation(event: MouseEvent): void {
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.handleMediaChange);
  }

  toggleAside() {
    this.openedAside = !this.openedAside;
    this.updateLayout();
  }

  handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
    this.openedAside = !event.matches;
    this.updateLayout();
  }

  updateLayout() {
    const aside = document.querySelector('.grid-aside') as HTMLElement;
    const headerTitle = document.querySelector('.title') as HTMLElement;
    const container = document.querySelector('.grid-container') as HTMLElement;

    if (this.openedAside) {
      aside?.classList.remove('grid-aside-hidden');
      headerTitle?.classList.remove('title-aside-hidden');
      container.style.gridTemplateColumns = '220px 1fr';
    } else {
      aside?.classList.add('grid-aside-hidden');
      headerTitle?.classList.add('title-aside-hidden');
      container.style.gridTemplateColumns = '0px 1fr';
    }
  }
}
