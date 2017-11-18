import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';

import { ArticlesService } from './services/articles.service';
import { LikesService } from './services/likes.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    ArticlesService,
    LikesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
