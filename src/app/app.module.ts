import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomHttpInterceptor } from "./Services/Shared/CustomHttpInterceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponent } from './Components/testing/testing.component';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ThreadComponent } from './Components/thread/thread.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    FrontPageComponent,
    NavbarComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '929177559568-aiaum2hs46ede902tsurc8i0valrso6s.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* 
Skal skrives senere
    
*/