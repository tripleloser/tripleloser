import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config.model';
import { ConfigService } from 'src/app/services/config.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: Config

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
  }

}
