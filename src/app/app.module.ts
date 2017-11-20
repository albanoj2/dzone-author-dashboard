import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { CountCardComponent } from './components/count-card.component';
import { DashboardChartComponent } from './components/dashboard-chart.component';

import { ArticlesService } from './services/articles.service';
import { LikesService } from './services/likes.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CountCardComponent,
    DashboardChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule
  ],
  providers: [
    ArticlesService,
    LikesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
