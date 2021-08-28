import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'; 
import { RosterCardComponent } from './components/roster/roster-card/roster-card.component';
import { PlayerCardComponent } from './components/player/player-card/player-card.component';
import { StandingsComponent } from './components/league/standings/standings.component';
import { RosterComponent } from './components/roster/roster/roster.component';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/league/overview/overview.component'; 

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RosterCardComponent,
    PlayerCardComponent,
    StandingsComponent,
    RosterComponent,
    HomeComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
