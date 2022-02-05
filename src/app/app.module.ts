import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/authguard.service';

import { AppComponent } from './app.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { RegisterComponent } from './views/register/register.component';

import { ClientComponent } from './components/client/client.component';
import { UserInfoDisplayComponent } from './components/user-info-display/user-info-display.component';
import { SendSessionRequestComponent } from './components/dialogs/send-session-request/send-session-request.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AcceptSessionComponent } from './components/dialogs/accept-session/accept-session.component';
import { RejectSessionComponent } from './components/dialogs/reject-session/reject-session.component';

import { UserService } from './services/users.service';
import { SessionService } from './services/session.service';

import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { WelcomeScreenComponent } from './views/welcome-screen/welcome-screen.component';
import { MyHttpInterceptor } from './http.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackBarService } from './services/snackbar.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ClientComponent,
    UserEditComponent,
    UserInfoDisplayComponent,
    SendSessionRequestComponent,
    AcceptSessionComponent,
    RejectSessionComponent,
    SidebarComponent,
    WelcomeScreenComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  exports: [SidebarComponent],
  providers: [
    SessionService,
    SnackBarService,
    UserService,
    AuthGuardService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    translateService: TranslateService,
    @Optional() @SkipSelf() parentModule?: AppModule
  ) {
    translateService.addLangs(['en', 'de']);
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
}
