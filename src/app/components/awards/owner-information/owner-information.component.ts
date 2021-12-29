import { Component, Input, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { RosterAndLeague } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-owner-information',
  templateUrl: './owner-information.component.html',
  styleUrls: ['./owner-information.component.scss'],
})
export class OwnerInformationComponent implements OnInit {

  @Input() rosterAndLeagues: RosterAndLeague[];

  constructor(
    private readonly leagueService: LeagueService,
  ) { }

  ngOnInit(): void { }

  getLeagueUserName(leagueId: string, rosterId: number): Observable<string> {
    return this.leagueService.getLeagueUserName(leagueId, rosterId);
  }

  getLeagueName(leagueId: string): Observable<string> {
    return this.leagueService.getLeagueShortName(leagueId);
  }

}
