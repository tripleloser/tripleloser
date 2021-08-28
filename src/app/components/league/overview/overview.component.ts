import { Component, Input, OnInit } from '@angular/core';
import { Config, LeagueConfig } from 'src/app/models/config.model';
import { League } from 'src/app/models/league.model';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { Roster } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() leagueConfig: LeagueConfig;

  rosters: Roster[];
  users: LeagueUser[];
  league: League;

  constructor(private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.leagueService.getRosters(this.leagueConfig.leagueId).subscribe((r: Roster[]) => {
      if (r !== undefined && r !== null) {
        this.rosters = r;
      }
    })
    this.leagueService.getLeague(this.leagueConfig.leagueId).subscribe((l: League) => {
      if (l !== undefined && l !== null) {
        this.league = l;
      }
    });
    this.leagueService.getLeagueUsers(this.leagueConfig.leagueId).subscribe((l: LeagueUser[]) => {
      if (l !== undefined && l !== null) {
        this.users = l;
      }
    })
  }

}
