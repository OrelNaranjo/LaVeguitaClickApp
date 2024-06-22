import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private pageTitle = signal<string>('');

  constructor() {
    effect(() => {
      document.title = this.pageTitle();
    });
  }

  getTitle() {
    return this.pageTitle();
  }

  setTitle(title: string) {
    this.pageTitle.set(title);
  }
}
