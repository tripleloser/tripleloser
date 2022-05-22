import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config.model';
import { NflState } from 'src/app/models/nflState.model';
import { ConfigService } from 'src/app/services/config.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-matchups-overview',
  templateUrl: './matchups-overview.component.html',
  styleUrls: ['./matchups-overview.component.scss']
})
export class MatchupsOverviewComponent implements OnInit {

  config: Config
  currentWeek = 1;

  constructor(
    private configService: ConfigService,
    private leagueService: LeagueService
    ) { }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
    this.leagueService.getNflState().subscribe((nflState: NflState) => {
      this.currentWeek = Math.max(1, nflState.display_week);
    })
  }

  addWeek(n: number) {
    const newWeek = this.currentWeek + n;
    if (newWeek < this.config.minWeek || newWeek > this.config.maxWeek) {
    } else {
      this.currentWeek = newWeek;
    }
  }

}
