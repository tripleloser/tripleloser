import { Component, Input, OnInit } from '@angular/core';
import { Config, LeagueConfig } from 'src/app/models/config.model';
import { Division } from 'src/app/models/division.model';
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

  divisions: Division[];

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
        if (this.league.settings?.divisions !== undefined) {
          this.divisions = [...Array(this.league.settings.divisions).keys()].map(n => {
            return {name: "Division " + (n + 1), num: n + 1};
          });
        } else {
          this.divisions = [{name: "", num: 1}];
        }
      }
    });
    this.leagueService.getLeagueUsers(this.leagueConfig.leagueId).subscribe((l: LeagueUser[]) => {
      if (l !== undefined && l !== null) {
        this.users = l;
      }
    })
  }

  getRostersByDivision(num: number): Roster[] {
    return this.rosters.filter(r => r.settings?.division === undefined || r.settings.division === num);
  }

}
