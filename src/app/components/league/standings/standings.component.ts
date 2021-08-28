import { Component, Input, OnInit } from '@angular/core';
import { LeagueConfig } from 'src/app/models/config.model';
import { Roster } from 'src/app/models/roster.model';
import { Standings } from 'src/app/models/standings.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  @Input() leagueId: string;
  @Input() rosters: Roster[];
  @Input() leagueConfig: LeagueConfig
  
  standings: Standings[] = [];

  displayedColumns: string[] = ['position', 'user', 'wins', 'ties', 'losses', 'record'];

  constructor() {
  }

  ngOnInit(): void {
    this.rosters = this.rosters.sort((a: Roster, b: Roster) => {
      return this.getRecord(b) - this.getRecord(a) || b.settings.wins - a.settings.wins;
    });
    this.rosters.forEach((r: Roster, index: number) => {
      this.standings.push({
        roster: r,
        position: index + 1
      })
    })
  }

  getRecord(roster: Roster): number {
    const totalGames = this.getTotalGames(roster);
    
    if (totalGames <= 0) {
      return 0;
    }

    return (roster.settings.wins + (roster.settings.ties / 2)) / totalGames;
  }

  getTotalGames(roster: Roster): number {
    return roster.settings.wins +
      roster.settings.ties +
      roster.settings.losses
  }

  getTableRowClass(row: Standings): string {
    if (this.leagueConfig.relegationSettings !== undefined) {
      if (this.leagueConfig.relegationSettings.promoted >= row.position) {
        return 'promoted';
      } else if (this.leagueConfig.relegationSettings.relegated <= row.position) {
        return 'relegated';
      };
    }
    return '';
  }

}
