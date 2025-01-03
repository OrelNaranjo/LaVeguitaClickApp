import { Component } from '@angular/core';
import { UpperCasePipe, DatePipe, TitleCasePipe, AsyncPipe } from '@angular/common';
import { TitleService } from '@core/services';
import { MatIconModule } from '@angular/material/icon';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, AsyncPipe, UpperCasePipe, MatIconModule],
  providers: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentDate$: Observable<string>;

  constructor(
    private datePipe: DatePipe,
    public titleService: TitleService,
  ) {
    this.currentDate$ = interval(1000).pipe(
      map(() => {
        return this.datePipe.transform(new Date(), 'EEEE, MMMM d, y, h:mm:ss a') || '';
      }),
    );
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
