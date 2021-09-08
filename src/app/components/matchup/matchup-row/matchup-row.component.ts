import { Component, Input, OnInit } from '@angular/core';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { MatchupPair } from '../matchup/matchup-pair.model';

@Component({
  selector: 'app-matchup-row',
  templateUrl: './matchup-row.component.html',
  styleUrls: ['./matchup-row.component.scss']
})
export class MatchupRowComponent implements OnInit {

  @Input() matchupPair: MatchupPair;
  @Input() leagueId: string;
  @Input() leagueUsers: LeagueUser[];

  leagueUser1: LeagueUser;
  leagueUser2: LeagueUser;

  panelOpenState = false;
  
  constructor() { }

  ngOnInit(): void {
    this.leagueUser1 = this.leagueUsers.find((l: LeagueUser) => l.user_id === this.matchupPair.ownerId1);
    this.leagueUser2 = this.leagueUsers.find((l: LeagueUser) => l.user_id === this.matchupPair.ownerId2);
  }

}
