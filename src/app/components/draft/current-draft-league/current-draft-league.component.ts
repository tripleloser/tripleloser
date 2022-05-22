import { Component, Input, OnInit } from '@angular/core';
import { Draft } from 'src/app/models/draft.model';
import { DraftPick } from 'src/app/models/draftPick.model';
import { League } from 'src/app/models/league.model';
import { ConfigService } from 'src/app/services/config.service';
import { DraftService } from 'src/app/services/draft.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-current-draft-league',
  templateUrl: './current-draft-league.component.html',
  styleUrls: ['./current-draft-league.component.scss']
})
export class CurrentDraftLeagueComponent implements OnInit {

  @Input() leagueId: string;

  loaded = false;

  league: League;
  draft: Draft;
  picks: DraftPick[];
  slots: number[];
  rounds: number[];

  constructor(
    private draftService: DraftService,
    private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.leagueService
    .getLeague(this.leagueId)
    .subscribe((l: League) => {
      this.league = l;
    });

    this.draftService
    .getLatestDraft(this.leagueId)
    .subscribe((draft: Draft) => {
      this.draft = draft;
      this.draftService.getDraftPicks(draft.draft_id)
        .subscribe((picks: DraftPick[]) => {
          this.picks = picks;
          console.log(this.picks);
          console.log(this.draft);
          this.slots = [...Array(this.draft.settings.teams).keys()].map(n => n+1);
          this.rounds = [...Array(this.draft.settings.rounds).keys()].map(n => n+1);
          this.loaded = true;
        });
      });
  }

  getPick(round: number, slot: number): DraftPick {
    return this.picks.find(p => p.round === round && p.draft_slot === slot);
  }

}

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}