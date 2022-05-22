import { Component, OnInit } from '@angular/core';
import { Config, LeagueConfig } from 'src/app/models/config.model';
import { Draft } from 'src/app/models/draft.model';
import { DraftPick } from 'src/app/models/draftPick.model';
import { League } from 'src/app/models/league.model';
import { ConfigService } from 'src/app/services/config.service';
import { DraftService } from 'src/app/services/draft.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-current-draft',
  templateUrl: './current-draft.component.html',
  styleUrls: ['./current-draft.component.scss']
})
export class CurrentDraftComponent implements OnInit {
  
  config: Config

  picksOfDrafts: DraftPick[][] = [];
  leagueNames: Map<string,string> = new Map<string,string>();
  dataLoaded = false;

  constructor(
    private draftService: DraftService,
    private leagueService: LeagueService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.config = this.configService.getLeaguesConfig();
  }

}
