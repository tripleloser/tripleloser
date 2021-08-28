import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './models/config.model';
import { Roster } from './models/roster.model';
import { User } from './models/user.model';
import { LeagueService } from './services/league.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sleeper';



  rosters: Roster[];

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    ) {
  }

  ngOnInit(): void {
    this.leagueService.getRosters('719265619765166080')
      .subscribe((r: Roster[]) => {
        this.rosters = r;
        // this.rosters[5].settings.wins = 4;
        // this.rosters[8].settings.wins = 3;
        // this.rosters[9].settings.wins = 3;
        // this.rosters[8].settings.ties = 1;
        // this.rosters[9].settings.losses = 1;
      });
  }


}
