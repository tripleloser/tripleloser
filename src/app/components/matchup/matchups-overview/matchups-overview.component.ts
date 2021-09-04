import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-matchups-overview',
  templateUrl: './matchups-overview.component.html',
  styleUrls: ['./matchups-overview.component.scss']
})
export class MatchupsOverviewComponent implements OnInit {

  config: Config
  currentWeek = 1;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
    this.currentWeek = this.config.currentWeek;
  }

  addWeek(n: number) {
    const newWeek = this.currentWeek + n;
    if (newWeek < this.config.minWeek || newWeek > this.config.maxWeek) {
    } else {
      this.currentWeek = newWeek;
    }
  }

}
