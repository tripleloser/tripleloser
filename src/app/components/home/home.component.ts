import { Component, OnInit } from '@angular/core';
import { Config, LeagueConfig, RelegationSettings } from 'src/app/models/config.model';
import { Roster } from 'src/app/models/roster.model';
import { LeagueService } from 'src/app/services/league.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: Config = {
    leagues: [
      {
        leagueId: '702568878819069952',
        relegationSettings: {
          promoted: 3,
          relegated: 8
        }
      },
      {
        leagueId: '707140285854986240',
        relegationSettings: {
          promoted: 5,
          relegated: 11
        }
      },
      {
        leagueId: '719265619765166080',
        relegationSettings: {
          promoted: 4,
          relegated: 28
        }
      }
    ]
  }

  constructor(
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
  }

}
