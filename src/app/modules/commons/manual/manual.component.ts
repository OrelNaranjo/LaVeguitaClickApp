import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../../@core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ManualLogisticsComponent,
  ManualProductionsComponent,
  ManualPurchasesComponent,
  ManualSalesComponent,
  ManualStaffsComponent,
  ManualToolsComponent,
} from './index';

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [
    RouterLink,
    ManualSalesComponent,
    ManualPurchasesComponent,
    ManualProductionsComponent,
    ManualLogisticsComponent,
    ManualStaffsComponent,
    ManualToolsComponent,
  ],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss',
})
export class ManualComponent implements OnInit {
  @ViewChild('scrollContainer')
  private myScrollContainer!: ElementRef;

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Manual de uso');
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.querySelector(`#${fragment}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  upperPage() {
    this.myScrollContainer.nativeElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
