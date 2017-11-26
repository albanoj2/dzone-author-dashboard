import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { CountCardComponent } from './components/count-card.component';
import { NavigationBarComponent } from './components/navigation-bar.component';
import { SideCarComponent } from './components/side-car.component';
import { DashboardChartComponent } from './components/dashboard-chart.component';

import { ArticlesService } from './services/articles.service';
import { LikesService } from './services/likes.service';
import { AuthorService } from './services/author.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CountCardComponent,
    NavigationBarComponent,
    SideCarComponent,
    DashboardChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule
  ],
  providers: [
    ArticlesService,
    LikesService,
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
