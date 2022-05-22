import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DraftPick } from 'src/app/models/draftPick.model';
import { Roster } from 'src/app/models/roster.model';
import { TradedPick } from 'src/app/models/tradedPick.model';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-current-draft-slot',
  templateUrl: './current-draft-slot.component.html',
  styleUrls: ['./current-draft-slot.component.scss']
})
export class CurrentDraftSlotComponent implements OnInit, OnChanges {

  @Input() leagueId: string;
  @Input() pick: DraftPick;
  @Input() tradedPicks: TradedPick[];
  @Input() round: number;
  @Input() slot: number;

  tradedPick: TradedPick;

  constructor(
    private leagueService: LeagueService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.tradedPicks !== undefined) {
      this.tradedPick = this.tradedPicks.find(p => p.round === this.round && this.slot === p.slot);
    }
  }

  getTradedPickUserName(): Observable<string> {
    if (this.tradedPick !== undefined) {
      return this.leagueService.getLeagueUserName(this.leagueId, this.tradedPick.owner_id);
    }
    return of('');
  }

  getBackgroundColor(): string {
    if (this.pick?.metadata?.position === undefined) {
      return '#454545';
    }

    if (this.pick.metadata.position.indexOf("QB") > -1) {
      return "#c05d84";
    }

    if (this.pick.metadata.position.indexOf("WR") > -1) {
      return "#45a1ca";
    }

    if (this.pick.metadata.position.indexOf("RB") > -1) {
      return "#73c2a5";
    }

    if (this.pick.metadata.position.indexOf("TE") > -1) {
      return "#cc8c4a";
    }

    if (this.pick.metadata.position.indexOf("DL") > -1) {
      return "#ff795a";
    }

    if (this.pick.metadata.position.indexOf("#6d7df5") > -1) {
      return "#c05d84";
    }

    if (this.pick.metadata.position.indexOf("DB") > -1) {
      return "#ff7cb6";
    }

    if (this.pick.metadata.position.indexOf("CB") > -1) {
      return "#ff7cb6";
    }

    if (this.pick.metadata.position.indexOf("K") > -1) {
      return "#bd66ff";
    }

    return "#454545";
  }

}
