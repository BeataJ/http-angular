import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [
    { 
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService,
    multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
