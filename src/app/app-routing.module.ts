import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftOverviewComponent } from './components/draft/draft-overview/draft-overview.component';
import { AllStandingsComponent } from './components/home/all-standings/all-standings.component';
import { HomeComponent } from './components/home/home.component';
import { RosterComponent } from './components/roster/roster/roster.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'standings', component: AllStandingsComponent },
  { path: 'drafts', component: DraftOverviewComponent },
  { path: 'roster', component: RosterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
