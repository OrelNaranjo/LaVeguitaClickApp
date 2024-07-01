import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from './icons-provider';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngxs/store';
import { states } from '@core/stores';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNzIcons(),
    provideNzI18n(es_ES),
    importProvidersFrom(FormsModule),
    provideStore(states),
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
};
