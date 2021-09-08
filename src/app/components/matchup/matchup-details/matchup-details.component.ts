import { Component, Input, OnInit } from '@angular/core';
import { MatchupPair } from '../matchup/matchup-pair.model';

@Component({
  selector: 'app-matchup-details',
  templateUrl: './matchup-details.component.html',
  styleUrls: ['./matchup-details.component.scss']
})
export class MatchupDetailsComponent implements OnInit {

  @Input() matchupPair: MatchupPair;

  constructor() { }

  ngOnInit(): void {
  }

}
