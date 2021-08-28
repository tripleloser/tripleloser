import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  PLAYER_AVATAR_BASE_URL = this.api.PLAYER_AVATAR_BASE_URL;

  constructor(private api: ApiService) { }

  getPlayer(id: string): Observable<Player> {
    return this.api.getPlayer(id);
  }
}
