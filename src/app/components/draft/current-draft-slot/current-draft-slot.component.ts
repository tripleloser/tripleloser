import { Component, Input, OnInit } from '@angular/core';
import { DraftPick } from 'src/app/models/draftPick.model';

@Component({
  selector: 'app-current-draft-slot',
  templateUrl: './current-draft-slot.component.html',
  styleUrls: ['./current-draft-slot.component.scss']
})
export class CurrentDraftSlotComponent implements OnInit {

  @Input() pick: DraftPick;
  @Input() round: number;
  @Input() slot: number;

  constructor() { }

  ngOnInit(): void {
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
