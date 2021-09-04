import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftOverviewComponent } from './components/draft/draft-overview/draft-overview.component';
import { AllStandingsComponent } from './components/home/all-standings/all-standings.component';
import { HomeComponent } from './components/home/home.component';
import { MatchupsOverviewComponent } from './components/matchup/matchups-overview/matchups-overview.component';
import { RosterComponent } from './components/roster/roster/roster.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'standings', component: AllStandingsComponent },
  { path: 'matchups', component: MatchupsOverviewComponent },
  { path: 'drafts', component: DraftOverviewComponent },
  { path: 'roster', component: RosterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
