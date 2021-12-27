import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { ApiService } from './api.service';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  PLAYER_AVATAR_BASE_URL = this.api.PLAYER_AVATAR_BASE_URL;

  private playerStore: BaseStore<string,Player>;

  constructor(private readonly api: ApiService) {
    this.playerStore = new BaseStore<string,Player>((id: string) => {return this.api.getPlayer(id)});
  }

  getPlayer(id: string): Observable<Player> {
    return this.playerStore.get(id);
  }
}
