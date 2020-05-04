import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { NoAuthGuard } from './helper/no-auth-guard';
import { DefaultModule } from './layouts/default/default.module';
import { NonAuthenticatedModule } from './layouts/non-authenticated/non-authenticated.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalendarComponent } from './modules/calendar/calendar.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CalendarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DefaultModule,
    NonAuthenticatedModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forRoot({
      defaultLanguage: 'tr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [authInterceptorProviders, NoAuthGuard, TranslateService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
