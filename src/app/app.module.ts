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
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DraftOverviewComponent } from './components/draft/draft-overview/draft-overview.component';
import { DraftOverviewTableComponent } from './components/draft/draft-overview-table/draft-overview-table.component';
import { AllStandingsComponent } from './components/home/all-standings/all-standings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RosterCardComponent,
    PlayerCardComponent,
    StandingsComponent,
    RosterComponent,
    HomeComponent,
    OverviewComponent,
    DraftOverviewComponent,
    DraftOverviewTableComponent,
    AllStandingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
