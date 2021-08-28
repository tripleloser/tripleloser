import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { Roster } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  roster: Roster;
  user: LeagueUser;

  constructor(private route: ActivatedRoute,
    private leagueService: LeagueService) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const leagueId = params['leagueId'];
        const ownerId = params['ownerId'];
        if (leagueId !== undefined && leagueId !== null && ownerId !== undefined && ownerId !== null) {
          this.leagueService.getRosters(leagueId).subscribe((rosters: Roster[]) => {
            const r = rosters.find((_: Roster) => {
              return _.owner_id === ownerId;
            })
            if (r !== undefined && r !== null) {
              this.roster = r;
            }
          });
          this.leagueService.getLeagueUsers(leagueId).subscribe((l: LeagueUser[]) => {
            if (l !== undefined && l !== null) {
              this.user = l.find((user: LeagueUser) => {
                return user.user_id === ownerId;
              });
            }
          })
        }
      });
  }

}
