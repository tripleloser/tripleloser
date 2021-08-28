import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RosterComponent } from './components/roster/roster/roster.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'roster', component: RosterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
