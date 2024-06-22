import { AuthService } from './../../../core/auths/auth.service';
import { Component } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { TitleService } from '../../services/title/title.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public titleService: TitleService,
    private authService: AuthService,
  ) {}

  get title(): string {
    return this.titleService.getTitle();
  }
}
