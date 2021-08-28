import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config.model';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: Config = {
    leagues: [
      {
        leagueId: '736316343309168640',
        relegationSettings: {
          playoffs: 4,
          relegated: 1000
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
