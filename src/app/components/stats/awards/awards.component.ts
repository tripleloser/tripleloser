import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Config } from 'src/app/models/config.model';
import { Matchup } from 'src/app/models/matchup.model';
import { RosterAndLeague } from 'src/app/models/roster.model';
import { Awards } from 'src/app/models/stats.model';
import { ConfigService } from 'src/app/services/config.service';
import { LeagueService } from 'src/app/services/league.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  awards: Awards
  config: Config;
  currentWeek: number;
  error: boolean = false;

  constructor(
      private leagueService: LeagueService,
      private statsService: StatsService,
      private configService: ConfigService
    ) { }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
    this.currentWeek = this.config.currentWeek;
    this.loadData(this.currentWeek);
  }

  loadData(week: number): void {
    this.awards = undefined;
    this.statsService
      .getAwards(this.config.leagues.map(l => l.leagueId), this.currentWeek)
      .pipe(take(1))
      .subscribe((awards: Awards) => {
        if (this.currentWeek == week) {
          this.awards = awards;
          this.error = false;
        }
      },
      (error) => {
        this.awards = undefined;
        this.error = true;
        console.log(error);
      });
  }

  addWeek(n: number) {
    const newWeek = this.currentWeek + n;
    if (newWeek < this.config.minWeek || newWeek > this.config.maxWeek) {
    } else {
      this.currentWeek = newWeek;
      this.loadData(this.currentWeek);
    }
  }

  getOwner(playerId: string, week: number, starter: boolean): Observable<RosterAndLeague[]> {
    const leagueIds = this.config.leagues.map(_ => _.leagueId);
    const matchups$ = leagueIds.map(leagueId => this.leagueService.getMatchups(leagueId, week));
    return combineLatest(matchups$)
      .pipe(
        map(_ => {
          const result: RosterAndLeague[] = [];
          const matchups = _.reduce((accumulator, value) => accumulator.concat(value), []);
          matchups.forEach((matchup: Matchup) => {
            if (starter && matchup.starters.indexOf(playerId) > -1
              || !starter && matchup.starters.indexOf(playerId) === -1 && matchup.players.indexOf(playerId) > -1) {
              result.push({
                leagueId: matchup.leagueId,
                rosterId: matchup.roster_id
              });
            }
          });
          return result;
        })
      );
  }

}
