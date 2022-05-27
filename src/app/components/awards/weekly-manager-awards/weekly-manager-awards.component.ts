import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Config } from 'src/app/models/config.model';
import { League } from 'src/app/models/league.model';
import { Matchup } from 'src/app/models/matchup.model';
import { NflState } from 'src/app/models/nflState.model';
import { ConfigService } from 'src/app/services/config.service';
import { LeagueService } from 'src/app/services/league.service';
import { WeeklyManagerAwardsModel } from './weekly-manager-awards.model';

@Component({
  selector: 'app-weekly-manager-awards',
  templateUrl: './weekly-manager-awards.component.html',
  styleUrls: ['./weekly-manager-awards.component.scss']
})
export class WeeklyManagerAwardsComponent implements OnInit, AfterViewInit {

  config: Config;
  currentWeek: number;
  error: boolean = false;

  leagues: League[] = [];
  selectedLeagueId: string;

  displayedColumns: string[] = [
    'rank',
    'name',
    'league',
    'starterPoints',
    'benchPoints',
  ];
  dataSource: MatTableDataSource<WeeklyManagerAwardsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
      private leagueService: LeagueService,
      private configService: ConfigService
    ) {
      this.dataSource = new MatTableDataSource<WeeklyManagerAwardsModel>([]);
    }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item: WeeklyManagerAwardsModel, property: string) => {
      switch(property) {
        case 'rank': return item.rank;
        case 'starterPoints': return item.starterPoints;
        case 'benchPoints': return item.benchPoints;
        default: return undefined;
      }
    };
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
    this.leagues.push({league_id: 'all', name: 'Overall'});
    
    this.config.leagues.forEach(league => {
      this.leagueService
        .getLeague(league.leagueId)
        .subscribe(_ => {
          this.leagues.push(_);
        });
    });

    this.leagueService
      .getNflState()
      .subscribe((nflState: NflState) => {
        this.currentWeek = Math.max(1, nflState.display_week - 1);
        this.loadData(this.currentWeek);
      });
  }

  getLeagueIds(): string[] {
    return this.selectedLeagueId === 'all' || this.selectedLeagueId === undefined ?
      this.config.leagues.map(l => l.leagueId) :
      [this.selectedLeagueId];
  }

  loadData(week: number): void {
    this.dataSource.data = [];

    this.leagueService
      .getMatchupsMultipleLeagues(this.getLeagueIds(), this.currentWeek)
      .pipe(take(1))
      .subscribe((matchups: Matchup[]) => {
        if (this.currentWeek == week) {
          let data: WeeklyManagerAwardsModel[] = [];

          if (matchups.length === 0) {
            this.error = true;
            return;
          }

          // Create data
          matchups.forEach((matchup: Matchup) => {
            const dataObject = new WeeklyManagerAwardsModel();
            dataObject.leagueId = matchup.leagueId;
            dataObject.rosterId = matchup.roster_id;
            dataObject.leagueUser$ = this.leagueService.getLeagueUserByLeagueIdAndRosterId(matchup.leagueId, matchup.roster_id);
            dataObject.leagueUserName$ = dataObject.leagueUser$.pipe(map(_ => _?.display_name ?? 'Unknown'));

            dataObject.starterPoints = matchup.starters_points.reduce((sum, current) => sum + current, 0);
            matchup.players.forEach((playerId: string) => {
              dataObject.benchPoints += matchup.players_points[playerId];
            });
            dataObject.benchPoints -= dataObject.starterPoints;
            
            data.push(dataObject)
          });

          data = data.sort((a, b) => b.starterPoints - a.starterPoints);
          data = data.map( (dataObject, index) => {
            dataObject.rank = index + 1;
            return dataObject;
          });

          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.error = false;
        }
      },
      (error) => {
        this.dataSource.data = [];
        this.error = true;
        console.log(error);
      });
  }

  getSortedLeagues(): League[] {
    return this.leagues.sort((a, b) => a.league_id === 'all' ? -1 : a.name.localeCompare(b.name));
  }

  addWeek(n: number) {
    const newWeek = this.currentWeek + n;
    if (newWeek < this.config.minWeek || newWeek > this.config.maxWeek) {
    } else {
      this.currentWeek = newWeek;
      this.loadData(this.currentWeek);
    }
  }

  selectLeague(): void {
    this.loadData(this.currentWeek);
  }

  getLeagueName(leagueId: string): Observable<string> {
    if (leagueId === 'all') {
      return of('Overall');
    }
    return this.leagueService.getLeagueShortName(leagueId);
  }

}
