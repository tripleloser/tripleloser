import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { League } from 'src/app/models/league.model';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { Matchup } from 'src/app/models/matchup.model';
import { Roster } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';
import { MatchupPair } from './matchup-pair.model';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html',
  styleUrls: ['./matchup.component.scss']
})
export class MatchupComponent implements OnChanges {

  @Input() leagueId: string;
  @Input() week: number;

  matchups: Matchup[];
  rosters: Roster[];
  league: League;
  leagueUsers: LeagueUser[];

  matchupPairs: MatchupPair[];

  constructor(private route: ActivatedRoute,
    private leagueService: LeagueService) { }

  ngOnChanges(): void {
    this.route.queryParams.subscribe(params => {
      // const leagueId = params['leagueId'];
      // const week = params['week'];
      this.matchups = undefined;
      this.matchupPairs = undefined;
      this.rosters = undefined;
      const leagueId = this.leagueId;
      const week = this.week;
      if (leagueId !== undefined && leagueId !== null && week !== undefined && week !== null) {
        this.leagueService
          .getRosters(leagueId)
          .subscribe((r: Roster[]) => {
            this.rosters = r;
            this.leagueService
              .getMatchups(leagueId, week)
              .subscribe((m: Matchup[]) => {
                this.matchups = m;
                this.leagueService
                  .getLeague(leagueId)
                  .subscribe((l: League) => {
                    this.league = l;
                    this.leagueService
                      .getLeagueUsers(leagueId)
                      .subscribe((leagueUsers: LeagueUser[]) => {
                        this.leagueUsers = leagueUsers;
                        this.matchupPairs = this.getMatchupPairs();
                      })
                  });
              });
          });
        

      }
    });
  }

  getMatchupPairs(): MatchupPair[] {
    const result: MatchupPair[] = [];

    if (this.matchups === undefined || this.league === undefined || this.rosters === undefined) {
      return result;
    }
    
    const matchupIds = this.matchups
      .map((m: Matchup) => m.matchup_id)
      .filter((thing, i, arr) => arr.findIndex(t => t === thing) === i);
    
    matchupIds.forEach((id: number) => {
      const foundMatchups = this.matchups.filter((m: Matchup) => m.matchup_id === id);
      result.push({
        matchupId: id,
        ownerId1: this.getUserIdByRosterId(foundMatchups[0].roster_id),
        ownerId2: this.getUserIdByRosterId(foundMatchups[1].roster_id),
        points1: foundMatchups[0].points,
        points2: foundMatchups[1].points,
        matchup1: foundMatchups[0],
        matchup2: foundMatchups[1],
      });
    });

    return result.sort((a: MatchupPair, b: MatchupPair) => a.matchupId - b.matchupId);
  }

  getUserIdByRosterId(rosterId: number): string {
    if (this.rosters[rosterId-1] !== undefined) {
      return this.rosters[rosterId-1].owner_id;
    }
    return '';
  }

}
