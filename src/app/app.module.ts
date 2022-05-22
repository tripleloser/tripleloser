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
import { MatchupComponent } from './components/matchup/matchup/matchup.component';
import { MatchupRowComponent } from './components/matchup/matchup-row/matchup-row.component';
import { MatchupsOverviewComponent } from './components/matchup/matchups-overview/matchups-overview.component';
import { MatchupDetailsComponent } from './components/matchup/matchup-details/matchup-details.component'; 
import { MatExpansionModule } from '@angular/material/expansion'; 
import { ApiService } from './services/api.service';
import { WeeklyAwardsComponent } from './components/awards/weekly-awards/weekly-awards.component';
import { OwnerInformationComponent } from './components/awards/owner-information/owner-information.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { AwardsOverviewComponent } from './components/awards/awards-overview/awards-overview.component';
import { CurrentDraftComponent } from './components/draft/current-draft/current-draft.component';
import { CurrentDraftLeagueComponent } from './components/draft/current-draft-league/current-draft-league.component';
import { CurrentDraftSlotComponent } from './components/draft/current-draft-slot/current-draft-slot.component';
import { CurrentDraftSlotTeamComponent } from './components/draft/current-draft-slot-team/current-draft-slot-team.component';

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
    MatchupComponent,
    MatchupRowComponent,
    MatchupsOverviewComponent,
    MatchupDetailsComponent,
    WeeklyAwardsComponent,
    OwnerInformationComponent,
    AwardsOverviewComponent,
    CurrentDraftComponent,
    CurrentDraftLeagueComponent,
    CurrentDraftSlotComponent,
    CurrentDraftSlotTeamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
