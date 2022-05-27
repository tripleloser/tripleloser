import { Component, Input, OnInit } from '@angular/core';
import { Draft } from 'src/app/models/draft.model';
import { DraftPick } from 'src/app/models/draftPick.model';
import { League } from 'src/app/models/league.model';
import { NflState } from 'src/app/models/nflState.model';
import { Roster } from 'src/app/models/roster.model';
import { TradedPick } from 'src/app/models/tradedPick.model';
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
  tradedPicks: TradedPick[];
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
      this.draftService
        .getLatestDraft(this.leagueId)
        .subscribe((draft: Draft) => {
          this.draft = draft;
          this.draftService.getDraftPicks(draft.draft_id)
            .subscribe((picks: DraftPick[]) => {
              this.picks = picks;
              this.slots = [...Array(this.draft.settings.teams).keys()].map(n => n+1);
              this.rounds = [...Array(this.draft.settings.rounds).keys()].map(n => n+1);
              this.initTradedPicks();
              this.loaded = true;
            });
          });
    });
  }

  initTradedPicks() {
    const tradedPicks: TradedPick[] = [];
    this.leagueService.getNflState().subscribe((nflState: NflState) => {
      this.leagueService.getTradedPicksByYear(this.draft.league_id, nflState.league_season).subscribe((p: TradedPick[]) => {
        this.tradedPicks = p;
        this.leagueService.getRosters(this.leagueId).subscribe((rosters: Roster[]) => {
          if (rosters !== undefined) {
            this.tradedPicks.forEach((tradedPick: TradedPick) => {
              const roster = rosters.find(r => r.roster_id === tradedPick.roster_id);
              tradedPick.slot = this.draft.draft_order[roster.owner_id];
              tradedPick.newOwnerUserId = roster.owner_id;
              tradedPicks.push(tradedPick);
            });
          }
          this.tradedPicks = tradedPicks;
        });
      });
    });
  }

  getPick(round: number, slot: number): DraftPick {
    return this.picks.find(p => p.round === round && p.draft_slot === slot);
  }

}
