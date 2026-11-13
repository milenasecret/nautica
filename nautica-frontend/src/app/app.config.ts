import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt-interceptor';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideTranslateService} from '@ngx-translate/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorIntl} from './services/custom-paginator-intl.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor]) // It registers JWT interceptor here
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      lang: 'sr',
      fallbackLang: 'sr'
    }),
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    }
  ]
};
