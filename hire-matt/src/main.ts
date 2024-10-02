// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
//
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
//
// @NgModule({
//   declarations: [AppComponent],
//   imports: [BrowserModule],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
//
// platformBrowserDynamic().bootstrapModule(AppModule);

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {appConfig} from "./app/app.config";

bootstrapApplication(AppComponent,{providers: [...appConfig.providers],})
  .catch(err => console.error(err));

