import { Component, Input, AfterContentInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RosterAndLeague } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-owner-information',
  templateUrl: './owner-information.component.html',
  styleUrls: ['./owner-information.component.scss']
})
export class OwnerInformationComponent implements AfterContentInit   {

  @Input() rosterAndLeagues: RosterAndLeague[];
  data: Map<string,{league: string, user: string}>;
  done: number = -1;


  constructor(
    private readonly leagueService: LeagueService,
  ) { }

  ngAfterContentInit  (): void {
    if (this.rosterAndLeagues !== undefined && this.rosterAndLeagues !== null) {
      this.done = 0;
      this.data = new Map<string,{league: string, user: string}>();
      this.rosterAndLeagues.forEach(r => {
        this.data.set(`${r.leagueId}_${r.rosterId}`, {league: '', user: ''})
        this.getUserDisplayName(r.leagueId, r.rosterId)
          .subscribe(_ => {
            this.data.get(`${r.leagueId}_${r.rosterId}`).user = _;
            this.done++;
          });
        this.getLeagueName(r.leagueId)
          .subscribe(_ => {
            this.data.get(`${r.leagueId}_${r.rosterId}`).league = _;
            this.done++;
          });
      });
    }
  }

  getUserDisplayName(leagueId: string, rosterId: number): Observable<string> {
    return this.leagueService
      .getLeagueUsers(leagueId)
      .pipe(
        map(leagueUsers => leagueUsers === undefined ? '' : leagueUsers[rosterId].display_name)
      );
  }

  getLeagueName(leagueId: string): Observable<string> {
    return this.leagueService
      .getLeague(leagueId)
      .pipe(
        map(league => league === undefined ? '' : league.name.replace('Chefkochs Super League ', ''))
      );
  }

}
