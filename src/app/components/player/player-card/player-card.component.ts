import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  @Input() playerId: string;
  @Input() directionClass: string = 'left';
  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService
      .getPlayer(this.playerId)
      .subscribe((p: Player) => {
        if (p !== null && p !== undefined) {
          this.player = p;
        }
      })
  }

  getAvatarUrl(): string {
    return `${this.playerService.PLAYER_AVATAR_BASE_URL}/${this.player.player_id}.jpg`;
  }

}
