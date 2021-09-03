import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-all-standings',
  templateUrl: './all-standings.component.html',
  styleUrls: ['./all-standings.component.scss']
})
export class AllStandingsComponent implements OnInit {

  config: Config

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
  }

}
