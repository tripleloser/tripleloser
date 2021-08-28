import { Component, Input, OnInit } from '@angular/core';
import { Roster } from 'src/app/models/roster.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roster-card',
  templateUrl: './roster-card.component.html',
  styleUrls: ['./roster-card.component.scss']
})
export class RosterCardComponent implements OnInit {

  @Input() roster: Roster;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getStarters(): string[] {
    if (this.roster.players === null || this.roster.players === undefined) {
      return [];
    }
    return this.roster.starters;
  }

  getNoneStarters(): string[] {
    if (this.roster.players === null || this.roster.players === undefined) {
      return [];
    }
    return this.roster.players.filter((p: string) => {
      return this.roster.starters.indexOf(p) < 0;
    });
  }

}
