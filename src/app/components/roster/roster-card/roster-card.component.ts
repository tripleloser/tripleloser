import { Component, Input, OnInit } from '@angular/core';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { Roster } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roster-card',
  templateUrl: './roster-card.component.html',
  styleUrls: ['./roster-card.component.scss']
})
export class RosterCardComponent implements OnInit {

  @Input() roster: Roster;
  @Input() user: LeagueUser;

  constructor(
      private userService: UserService,
      private leagueService: LeagueService,
    ) { }

  ngOnInit(): void {
  }

  getStarters(): string[] {
    return this.leagueService.getStarters(this.roster);
  }

  getBench(): string[] {
    return this.leagueService.getBench(this.roster);
  }

  getReserve(): string[] {
    return this.leagueService.getReserve(this.roster);
  }

}
