import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NewsService } from './services/news.service';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutes } from './app.routes'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    AppRoutes,
    HttpClientModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
