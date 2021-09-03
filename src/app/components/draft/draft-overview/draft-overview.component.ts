import { Component, OnInit } from '@angular/core';
import { Config, LeagueConfig } from 'src/app/models/config.model';
import { Draft } from 'src/app/models/draft.model';
import { DraftPick } from 'src/app/models/draftPick.model';
import { League } from 'src/app/models/league.model';
import { ConfigService } from 'src/app/services/config.service';
import { DraftService } from 'src/app/services/draft.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-draft-overview',
  templateUrl: './draft-overview.component.html',
  styleUrls: ['./draft-overview.component.scss']
})
export class DraftOverviewComponent implements OnInit {

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

    this.config.leagues.forEach((leagueConfig: LeagueConfig) => {
      this.draftService
      .getLatestDraft(leagueConfig.leagueId)
      .subscribe((draft: Draft) => {
        this.draftService.getDraftPicks(draft.draft_id)
          .subscribe((picks: DraftPick[]) => {
            this.picksOfDrafts.push(picks);
            if (this.picksOfDrafts.length === this.config.leagues.length) {
              this.dataLoaded = true;
            }
          });
          this.leagueService
            .getLeague(leagueConfig.leagueId)
            .subscribe((league: League) => {
              this.leagueNames.set(draft.draft_id, league.name);
            });
      });
    });
  }

}
